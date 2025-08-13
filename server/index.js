import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
// Configura CORS per accettare SOLO il tuo sito GitHub Pages
app.use(cors({
  origin: 'https://mariafede-sposi.github.io', // senza slash finale
  methods: ['GET', 'POST'],
  credentials: false
}));

// Controllo extra: blocca richieste da origini non autorizzate
app.use((req, res, next) => {
  const allowedOrigin = 'https://mariafede-sposi.github.io';
  const requestOrigin = req.get('origin');
  if (requestOrigin !== allowedOrigin) {
    return res.status(403).send('Accesso non autorizzato');
  }
  next();
});
app.use(express.json());

// Connessione al database PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Endpoint per salvataggio a DB e invio email
app.post('/salvataggioADBedInvioEmail', async (req, res) => {
  const { email, partecipanti, bambini, allergie, preferenze } = req.body;

  // 1. Validazioni
  if (!email || !partecipanti) {
    return res.status(400).send('Email e numero partecipanti sono obbligatori');
  }
  if (!email.match(/^[\w.-]+@[\w.-]+\.\w{2,}$/)) {
    return res.status(400).send('Email non valida');
  }
  if (partecipanti < 1) {
    return res.status(400).send('Il numero di partecipanti deve essere almeno 1');
  }

  try {
    // 2. Salva nel DB
    await pool.query(
      `INSERT INTO partecipazioni (email, partecipanti, bambini, allergie, preferenze)
       VALUES ($1, $2, $3, $4, $5)`,
      [email, partecipanti, bambini || 0, allergie || '', preferenze || '']
    );

    // 3. Invia l'email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Puoi cambiare provider
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    const corpo_mail = `
      Nuova conferma di partecipazione:
      - Email: ${email}
      - Partecipanti: ${partecipanti}
      - Bambini: ${bambini || 0}
      - Allergie: ${allergie || 'Nessuna'}
      - Preferenze alimentari: ${preferenze || 'Nessuna'}
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email, // dove ricevi la conferma
      subject: 'Nuova conferma di partecipazione',
      text: corpo_mail,
    });

    res.status(200).send('Partecipazione registrata e email inviata');
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore durante il salvataggio o invio email');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server attivo su porta ${port}`));
