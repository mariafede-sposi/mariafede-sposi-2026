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
async function salvaPartecipazioneDB({ email, partecipanti, bambini }, errori) {
  try {
    await pool.query(
      `INSERT INTO partecipazioni (email, partecipanti, bambini)
       VALUES ($1, $2, $3)`,
      [email || null, partecipanti, bambini || 0]
    );
  } catch (err) {
    errori.push({ metodo: 'salvaPartecipazioneDB', log: err.toString() });
  }
}

// Funzione per inviare l'email
async function inviaEmail({ email, partecipanti, bambini, persone, note }, errori) {
  if (!email) return; // non inviare email se campo vuoto
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
${persone.map(p => `        -- ${p.nome} - ${(p.preferenza?.toLowerCase().includes('specificare quali') ? 'Allergie riportate di seguito' : p.preferenza)} - ${p.allergie || 'Nessuna allergia indicata'}`).join('\n')}
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
  }
}

// Funzione per inviare mail di alert in caso di errori
async function inviaMailErrore(payload, errori) {
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
    console.error('Errore durante l\'invio della mail di alert:', err);
  }
}

// Endpoint principale
app.post('/salvataggioADBedInvioEmail', async (req, res) => {
  const { email, partecipanti, bambini, persone, note } = req.body;

  if (!partecipanti) return res.status(400).send('Numero partecipanti è obbligatorio');
  if (partecipanti < 1) return res.status(400).send('Il numero di partecipanti deve essere almeno 1');
  if (email && !email.match(/^[\w.-]+@[\w.-]+\.\w{2,}$/)) return res.status(400).send('Email non valida');

  res.status(200).send('Richiesta ricevuta, elaborazione in corso');

  const errori = [];
  const payload = { email, partecipanti, bambini, persone, note };

  await salvaPartecipazioneDB(payload, errori);
  await inviaEmail(payload, errori);

  if (errori.length > 0) {
    await inviaMailErrore(payload, errori);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server attivo su porta ${port}`));
