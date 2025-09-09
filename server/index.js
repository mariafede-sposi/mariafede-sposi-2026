import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import pkg from 'pg';
import validator from 'validator';

const { Pool } = pkg;
const app = express();

// -------------------- Config variabili --------------------
const TIMEOUT_MS = parseInt(process.env.DATABASE_TIMEOUT_MS) || 0;

// -------------------- CORS --------------------
const allowedOrigin = [
  'https://mariafede-sposi.github.io',
  'https://www.mariafedesposi2026.it',
  'http://localhost:5173',
  'https://uptimerobot.com'
];

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false,
}));

app.options('*', cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'OPTIONS'],
}));

app.use(express.json());

// -------------------- Connessione DB --------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on('connect', (client) => {
  client.query(`SET statement_timeout = ${TIMEOUT_MS}`);
});

// -------------------- Utility Timeout --------------------
async function withTimeout(fn, ms = TIMEOUT_MS, label = "Operazione") {
  return Promise.race([
    fn(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`${label} superato timeout di ${ms}ms`)), ms)
    )
  ]);
}

// -------------------- Middleware Token --------------------
function checkToken(req, res, next) {
  if (req.headers['x-api-token'] !== process.env.TOKEN_PASSKEY) {
    return res.status(403).send('Forbidden: token mancante o non valido');
  }
  next();
}

// -------------------- Endpoint KeepAlive --------------------
app.get('/keepalive', (req, res) => {
  res.status(200).send('OK - KeepAlive attivo');
});

// -------------------- Funzioni principali --------------------
async function salvaPartecipazioneDB({ email, partecipanti, bambini, persone, note }, errori) {
  return withTimeout(async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const res = await client.query(
        `SELECT id FROM Indirizzi_Email WHERE Email = $1`,
        [email || (persone?.[0]?.nome.replace(/\s+/g, '').toUpperCase() || 'ANONIMO')]
      );

      let indirizzoEmailId;
      const nomePrimoPartecipante = persone?.[0]?.nome || 'Anonimo';

      if (res.rows.length > 0) {
        indirizzoEmailId = res.rows[0].id;
      } else {
        const insertRes = await client.query(
          `INSERT INTO Indirizzi_Email (Email, NomePrimoPartecipante, Adulti, Bambini, Note)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
          [
            email || nomePrimoPartecipante.replace(/\s+/g, '').toUpperCase(),
            nomePrimoPartecipante,
            partecipanti,
            bambini || 0,
            note || 'Nessuna'
          ]
        );
        indirizzoEmailId = insertRes.rows[0].id;
      }

      if (persone && persone.length > 0) {
        const values = [];
        const placeholders = [];

        persone.forEach((p, index) => {
          const idx = index * 4;
          placeholders.push(`($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4})`);
          values.push(
            p.nome || 'Anonimo',
            p.preferenza || 'Nessuna',
            p.allergie || 'Nessuna allergia indicata',
            indirizzoEmailId
          );
        });

        await client.query(
          `INSERT INTO Partecipanti (Nome, PreferenzeAlimentari, AllergieOAltro, IndirizzoEmailId)
           VALUES ${placeholders.join(', ')}`,
          values
        );
      }

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      errori.push({ metodo: 'salvaPartecipazioneDB', log: err.toString() });
      console.error('Errore salvaPartecipazioneDB:', err);
    } finally {
      client.release();
    }
  }, TIMEOUT_MS, "salvaPartecipazioneDB");
}

async function inviaEmail({ email, partecipanti, bambini, persone, note }, errori) {
  return withTimeout(async () => {
    if (!email) return;

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASS,
        },
      });

      const emailSafe = validator.normalizeEmail(email);
      const noteSafe = note ? validator.escape(note) : 'Nessuna';
      const personeSafe = persone.map(p => ({
        nome: p.nome ? validator.escape(p.nome) : 'Anonimo',
        preferenza: p.preferenza ? validator.escape(p.preferenza) : 'Nessuna',
        allergie: p.allergie ? validator.escape(p.allergie) : 'Nessuna allergia indicata'
      }));

      const corpo_mail = `
Nuova conferma di partecipazione:
- Email: ${emailSafe}
- Adulti: ${partecipanti}
- Bambini: ${bambini || 0}
- Partecipanti:
${personeSafe.map(p => `    -- ${p.nome} - ${p.preferenza} - ${p.allergie}`).join('\n')}
- Note: ${noteSafe}
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: emailSafe,
        subject: 'Nuova conferma di partecipazione',
        text: corpo_mail,
      });
    } catch (err) {
      errori.push({ metodo: 'inviaEmail', log: err.toString() });
      console.error('Errore inviaEmail:', err);
    }
  }, TIMEOUT_MS, "inviaEmail");
}

async function inviaMailErrore(payload, errori) {
  return withTimeout(async () => {
    if (errori.length === 0) return;

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_FROM,
          pass: process.env.EMAIL_PASS,
        },
      });

      const payloadSafe = JSON.stringify(payload, (key, value) => {
        if (typeof value === 'string') return validator.escape(value);
        if (Array.isArray(value)) return value.map(v => (typeof v === 'string' ? validator.escape(v) : v));
        return value;
      }, 2);

      let logTesto = '';
      errori.forEach(e => {
        const metodoSafe = validator.escape(e.metodo || 'sconosciuto');
        const logSafe = validator.escape(e.log || 'nessun log');
        logTesto += `Metodo: ${metodoSafe}\nErrore: ${logSafe}\n\n`;
      });

      const testo = `
Payload che ha causato l'errore: ${payloadSafe}

Errori riscontrati:
${logTesto}
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM,
        subject: 'Errore durante salvataggio/invio email',
        text: testo,
      });
    } catch (err) {
      console.error('Errore invio mail di alert:', err);
    }
  }, TIMEOUT_MS, "inviaMailErrore");
}

// -------------------- Endpoint principale con TOKEN_PASSKEY --------------------
app.post('/salvataggioADBedInvioEmail', checkToken, async (req, res) => {
  const { email, partecipanti, bambini, persone, note } = req.body;
  const erroriValidazione = [];

  if (!Number.isInteger(partecipanti) || partecipanti < 1) erroriValidazione.push('Numero partecipanti non valido');
  if (bambini !== undefined && (!Number.isInteger(bambini) || bambini < 0)) erroriValidazione.push('Numero bambini non valido');

  let emailSanitized = null;
  if (email) {
    if (!validator.isEmail(email)) erroriValidazione.push('Email non valida');
    else emailSanitized = validator.normalizeEmail(email);
  }

  const noteSanitized = note ? validator.escape(note) : 'Nessuna';
  const personeSanitized = Array.isArray(persone) ? persone.map(p => ({
    nome: p.nome ? validator.escape(p.nome) : 'Anonimo',
    preferenza: p.preferenza ? validator.escape(p.preferenza) : 'Nessuna',
    allergie: p.allergie ? validator.escape(p.allergie) : 'Nessuna allergia indicata'
  })) : [];

  if (erroriValidazione.length > 0) return res.status(400).json({ error: erroriValidazione });

  res.status(200).send('Richiesta ricevuta, elaborazione in corso');

  const errori = [];
  const payload = {
    email: emailSanitized,
    partecipanti,
    bambini: bambini || 0,
    persone: personeSanitized,
    note: noteSanitized
  };

  try {
    await salvaPartecipazioneDB(payload, errori);
    await inviaEmail(payload, errori);
    await inviaMailErrore(payload, errori);
  } catch (err) {
    console.error("Errore interno con timeout:", err);
    errori.push({ metodo: 'timeout', log: err.toString() });
    await inviaMailErrore(payload, errori);
  }
});

// -------------------- Avvio Server --------------------
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server attivo su porta ${port}`));
