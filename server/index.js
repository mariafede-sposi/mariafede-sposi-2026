import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import pkg from 'pg';
import rateLimit from 'express-rate-limit';
import validator from 'validator';
const { Pool } = pkg;

const app = express();

// -------------------- Config variabili --------------------
const TIMEOUT_MS = parseInt(process.env.DATABASE_TIMEOUT_MS) || 0;

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

// -------------------- Rate Limit --------------------
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 3,
  message: { error: 'Hai inviato troppe richieste. Riprova più tardi.' },
});

app.use('/salvataggioADBedInvioEmail', limiter);

// -------------------- Middleware Token --------------------
app.use('/salvataggioADBedInvioEmail', (req, res, next) => {
  const token = req.headers['x-api-token'] || req.headers['X-API-TOKEN'];
  if (!token || token !== process.env.TOKEN_PASSKEY) {
    console.log("Token ricevuto:", token);
    console.log("Token atteso:", process.env.TOKEN_PASSKEY);
    return res.status(403).json({ error: 'Token mancante o non valido' });
  }
  next();
});

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

// -------------------- Sanitizzazione Input --------------------
function sanitizePartecipante(p) {
  return {
    nome: validator.escape(p.nome || ""),
    tipo: validator.escape(p.tipo || "adulto"),
    preferenza: validator.escape(p.preferenza || "Nessuna"),
    allergie: validator.escape(p.allergie || "Nessuna allergia indicata")
  };
}

function sanitizePayload(payload) {
  const persone = (payload.persone || []).map(sanitizePartecipante);

  // Conta i bambini in base al campo "tipo"
  const bambini = persone.filter(p => p.tipo.toLowerCase() === "bambino").length;

  return {
    email: payload.email ? validator.normalizeEmail(payload.email) : "",
    partecipanti: Number(payload.partecipanti) || 0,
    bambini,
    persone,
    note: validator.escape(payload.note || "")
  };
}

// -------------------- Funzioni principali --------------------
async function salvaPartecipazioneDB(payload, errori) {
  return withTimeout(async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Controllo se l'email esiste già
      const res = await client.query(
        `SELECT id FROM Indirizzi_Email WHERE Email = $1`,
        [payload.email || (payload.persone[0]?.nome || "").replace(/\s+/g, '').toUpperCase()]
      );

      let indirizzoEmailId;
      const nomePrimo = payload.persone?.[0]?.nome || null;

      if (res.rows.length > 0) {
        indirizzoEmailId = res.rows[0].id;

        // Somma Partecipanti e Bambini e concatena le note
        await client.query(
          `UPDATE Indirizzi_Email
          SET Note = CONCAT_WS(' | ', Note, $1::text),
            Partecipanti = Partecipanti + $2,
            Bambini = Bambini + $3
          WHERE Id = $4`,
          [
            payload.note || '', // se vuota rimane '', ma ora PostgreSQL sa che è TEXT
            payload.partecipanti,
            payload.bambini || 0,
            indirizzoEmailId
          ]
        );


      } else {
        // Inserimento nuovo record
        const insertRes = await client.query(
          `INSERT INTO Indirizzi_Email (Email, NomePrimoPartecipante, Partecipanti, Bambini, Note)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
          [
            payload.email || nomePrimo.replace(/\s+/g, '').toUpperCase(),
            nomePrimo,
            payload.partecipanti,
            payload.bambini || 0,
            payload.note
          ]
        );
        indirizzoEmailId = insertRes.rows[0].id;
      }

      // Inserimento partecipanti
      if (payload.persone && payload.persone.length > 0) {
        const values = [];
        const placeholders = [];

        payload.persone.forEach((p, index) => {
          const idx = index * 5;
          placeholders.push(`($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4}, $${idx + 5})`);
          values.push(
            p.nome,
            p.preferenza,
            p.allergie,
            indirizzoEmailId,
            p.tipo.toLowerCase() === "bambino" // true/false
          );
        });

        await client.query(
          `INSERT INTO Partecipanti (Nome, PreferenzeAlimentari, AllergieOAltro, IndirizzoEmailId, Bambino)
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


async function inviaEmail(payload, errori) {
  return withTimeout(async () => {
    if (!payload.email) return;
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
- Email: ${payload.email}
- Partecipanti: ${payload.partecipanti}
- Bambini: ${payload.bambini || 0}
- Partecipanti dettagliati:
${payload.persone.map(p => `    -- ${p.nome} (${p.tipo}) - ${p.preferenza} - ${p.allergie}`).join('\n')}
- Note: ${payload.note || 'Nessuna'}
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: payload.email,
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

      let logTesto = '';
      errori.forEach(e => logTesto += `Metodo: ${e.metodo}\nErrore: ${e.log}\n\n`);

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
app.post('/salvataggioADBedInvioEmail', async (req, res) => {
  const rawPayload = req.body;
  const payload = sanitizePayload(rawPayload);

  if (!payload.partecipanti || payload.partecipanti < 1) return res.status(400).send('Numero partecipanti non valido');
  if (payload.email && !validator.isEmail(payload.email)) return res.status(400).send('Email non valida');

  res.status(200).send('Richiesta ricevuta, elaborazione in corso');

  const errori = [];

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

// -------------------- Keepalive --------------------
app.get('/keepalive', (req, res) => res.send('OK'));

// -------------------- Endpoint debug token --------------------
app.get("/check-token", (req, res) => {
  res.json({
    envToken: process.env.TOKEN_PASSKEY ? "SET" : "NOT SET",
    value: process.env.TOKEN_PASSKEY || null
  });
});

// -------------------- Avvio Server --------------------
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server attivo su porta ${port}`));
