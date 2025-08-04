import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import nodemailer from 'nodemailer';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Connessione al database PostgreSQL (Render ti darà questi dati)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // importante per Render
});

app.post('/send-email', async (req, res) => {
  const { message } = req.body;

  // 1. Invia mail
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // o altro provider
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'Messaggio dal sito matrimonio',
      text: message,
    });

    // 2. Salva nel DB
    await pool.query(
      'INSERT INTO messaggi (contenuto, data_invio) VALUES ($1, NOW())',
      [message]
    );

    res.status(200).send('Email inviata e messaggio salvato');
  } catch (error) {
    console.error(error);
    res.status(500).send('Errore durante invio/salvataggio');
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server attivo su porta ${port}`));
