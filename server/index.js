import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();

app.use(cors({
  origin: 'https://mariafede-sposi.github.io',
  methods: ['GET', 'POST'],
  credentials: false
}));

app.use((req, res, next) => {
  const allowedOrigin = 'https://mariafede-sposi.github.io';
  const requestOrigin = req.get('origin');
  if (requestOrigin !== allowedOrigin) {
    return res.status(403).send('Accesso non autorizzato');
  }
  next();
});
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Funzione per salvare la partecipazione sul DB
async function salvaPartecipazioneDB({ email, partecipanti, bambini }) {
  await pool.query(
    `INSERT INTO partecipazioni (email, partecipanti, bambini)
     VALUES ($1, $2, $3)`,
    [email || '', partecipanti, bambini || 0]
  );
}

// Funzione per inviare l'email
async function inviaEmail({ email, partecipanti, bambini, persone, note }) {
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
${persone.map(p => `        -- ${p.nome} - ${(p.preferenza?.toLowerCase().includes('specificare quali') ? 'Allergie riportate di seguito' : p.preferenza)} - ${p.allergie || 'Nessuna allergia indicata'}`).join('\n')}
    - Note: ${note || 'Nessuna'}
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Nuova conferma di partecipazione',
    text: corpo_mail,
  });
}

// Funzione per inviare mail di alert in caso di errore
async function inviaMailErrore(logErrore) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM,
      subject: 'Errore durante salvataggio/invio email',
      text: logErrore.toString(),
    });
  } catch (err) {
    console.error('Errore durante l\'invio della mail di alert:', err);
  }
}

// Endpoint principale
app.post('/salvataggioADBedInvioEmail', (req, res) => {
  const { email, partecipanti, bambini, persone, note } = req.body;

  if (!email || !partecipanti) return res.status(400).send('Email e numero partecipanti sono obbligatori');
  if (!email.match(/^[\w.-]+@[\w.-]+\.\w{2,}$/)) return res.status(400).send('Email non valida');
  if (partecipanti < 1) return res.status(400).send('Il numero di partecipanti deve essere almeno 1');

  res.status(200).send('Richiesta ricevuta, elaborazione in corso');

  (async () => {
    try {
      await salvaPartecipazioneDB({ email, partecipanti, bambini });
      await inviaEmail({ email, partecipanti, bambini, persone, note });
    } catch (error) {
      console.error('Errore durante salvataggio/invio email:', error);
      await inviaMailErrore(error);
    }
  })();
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server attivo su porta ${port}`));
