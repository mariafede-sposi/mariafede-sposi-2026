import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import pkg from 'pg';
import validator from 'validator';
import rateLimit from 'express-rate-limit';

const { Pool } = pkg;
const app = express();

// -------------------- Config variabili --------------------
const TIMEOUT_MS = parseInt(process.env.DATABASE_TIMEOUT_MS) || 0; // timeout in ms
const TOKEN_PASSKEY = process.env.TOKEN_PASSKEY;

// -------------------- CORS --------------------
const allowedOrigin = [
  'https://mariafede-sposi.github.io',
  'https://www.mariafedesposi2026.it',
  'http://localhost:5173'
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

// Imposto statement_timeout lato DB
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

// -------------------- Rate Limit --------------------
const submitLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3, // max 3 richieste per IP al minuto
  message: { error: 'Hai inviato troppe richieste. Riprova più tardi.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// -------------------- Middleware per TOKEN --------------------
function checkToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token || token !== TOKEN_PASSKEY) {
    return res.status(403).json({ error: 'Accesso negato: token mancante o invalido' });
  }
  next();
}

// -------------------- Funzioni --------------------

// Sanitizzazione input
function sanitizeInput(input) {
  if (typeof input === 'string') {
    return validator.escape(input.trim());
  }
  if (typeof input === 'number') {
    return input;
  }
  return input;
}

// Salvataggio partecipazione con transaction
async function salvaPartecipazioneDB({ email, partecipanti, bambini, persone, note }, errori) {
  return withTimeout(async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const cleanEmail = email ? validator.normalizeEmail(email) : null;
      const cleanNote = sanitizeInput(note || 'Nessuna');

      const res = await client.query(
        `SELECT id FROM Indirizzi_Email WHERE Email = $1`,
        [cleanEmail || persone?.[0]?.nome.replace(/\s+/g, '').toUpperCase()]
      );

      let indirizzoEmailId;
      const nomePrimoPartecipante = sanitizeInput(persone?.[0]?.nome || 'Sconosciuto');

      if (res.rows.length > 0) {
        indirizzoEmailId = res.rows[0].id;
      } else {
        const insertRes = await client.query(
          `INSERT INTO Indirizzi_Email (Email, NomePrimoPartecipante, Adulti, Bambini, Note)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
          [
            cleanEmail || nomePrimoPartecipante.replace(/\s+/g, '').toUpperCase(),
            nomePrimoPartecipante,
            partecipanti,
            bambini || 0,
            cleanNote
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
            sanitizeInput(p.nome),
            sanitizeInput(p.preferenza || 'Nessuna'),
            sanitizeInput(p.allergie || 'Nessuna allergia indicata'),
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

// Invio email di conferma
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

      const corpo_mail = `
Nuova conferma di partecipazione:
- Email: ${email}
- Adulti: ${partecipanti}
- Bambini: ${bambini || 0}
- Partecipanti:
${persone.map(p => `    -- ${p.nome} - ${p.preferenza} - ${p.allergie || 'Nessuna allergia indicata'}`).join('\n')}
- Note: ${note || 'Nessuna'}
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Nuova conferma di partecipazione',
        text: corpo_mail,
      });
    } catch (err) {
      errori.push({ metodo: 'inviaEmail', log: err.toString() });
      console.error('Errore inviaEmail:', err);
    }
  }, TIMEOUT_MS, "inviaEmail");
}

// Invio email di alert in caso di errori
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

      let logTesto = '';
      errori.forEach(e => {
        logTesto += `Metodo: ${e.metodo}\nErrore: ${e.log}\n\n`;
      });

      const testo = `
Payload che ha causato l'errore: ${JSON.stringify(payload, null, 2)}

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

// -------------------- Endpoint --------------------
app.get('/keepalive', (req, res) => {
  res.status(200).send('OK');
});

app.post('/salvataggioADBedInvioEmail', checkToken, submitLimiter, async (req, res) => {
  let { email, partecipanti, bambini, persone, note } = req.body;

  // Sanitizzo e valido
  email = email && validator.isEmail(email) ? validator.normalizeEmail(email) : null;
  partecipanti = parseInt(partecipanti) || 0;
  bambini = parseInt(bambini) || 0;
  note = sanitizeInput(note || 'Nessuna');
  persone = Array.isArray(persone) ? persone.map(p => ({
    nome: sanitizeInput(p.nome || ''),
    preferenza: sanitizeInput(p.preferenza || 'Nessuna'),
    allergie: sanitizeInput(p.allergie || '')
  })) : [];

  if (!partecipanti || partecipanti < 1) return res.status(400).send('Numero partecipanti non valido');
  if (email && !validator.isEmail(email)) return res.status(400).send('Email non valida');

  res.status(200).send('Richiesta ricevuta, elaborazione in corso');

  const errori = [];
  const payload = { email, partecipanti, bambini, persone, note };

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
