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

// Funzione per salvare la partecipazione sul DB con transaction
async function salvaPartecipazioneDB({ email, partecipanti, bambini, persone, note }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Prendi l'ID dell'indirizzo email se esiste
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

    // Inserimento ottimizzato dei partecipanti
    if (persone && persone.length > 0) {
      const values = [];
      const placeholders = [];

      persone.forEach((p, index) => {
        const idx = index * 4; // 4 colonne: Nome, PreferenzeAlimentari, AllergieOAltro, IndirizzoEmailId
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
    errorLog.salvaPartecipazioneDB = err.toString();
  } finally {
    client.release();
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
