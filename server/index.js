import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();

// -------------------- Config variabili --------------------
const TIMEOUT_MS = parseInt(process.env.DATABASE_TIMEOUT_MS) || 0; // timeout in ms

// -------------------- CORS --------------------
const allowedOrigin = 'https://mariafede-sposi.github.io';

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

// -------------------- Funzioni --------------------

// Salvataggio partecipazione con transaction
async function salvaPartecipazioneDB({ email, partecipanti, bambini, persone, note }, errori) {
  return withTimeout(async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const res = await client.query(
        `SELECT id FROM Indirizzi_Email WHERE Email = $1`,
        [email || persone?.[0]?.nome.replace(/\s+/g, '').toUpperCase()]
      );

      let indirizzoEmailId;
      const nomePrimoPartecipante = persone?.[0]?.nome || null;

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
            p.nome,
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
${persone.map(p => `    -- ${p.nome} - ${(p.preferenza?.toLowerCase().includes('specificare quali') ? 'Allergie riportate di seguito' : p.preferenza)} - ${p.allergie || 'Nessuna allergia indicata'}`).join('\n')}
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
app.post('/salvataggioADBedInvioEmail', async (req, res) => {
  const { email, partecipanti, bambini, persone, note } = req.body;

  if (!partecipanti || partecipanti < 1) return res.status(400).send('Numero partecipanti non valido');
  if (email && !email.match(/^[\w.-]+@[\w.-]+\.\w{2,}$/)) return res.status(400).send('Email non valida');

  // Risposta immediata al FE
  res.status(200).send('Richiesta ricevuta, elaborazione in corso');

  // Elaborazione in background
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
