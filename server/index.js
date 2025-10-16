import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { handlePartecipazione } from './controllers/partecipazioniController.js';

const app = express();
app.set('trust proxy', 1);

// -------------------- CORS --------------------
const allowedOrigin = [
  'https://mariafede-sposi.github.io',
  'https://www.mariafedesposi2026.it',
  'http://localhost:5173'
];

app.use(cors({ origin: allowedOrigin, methods: ['GET', 'POST', 'OPTIONS'] }));
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
  if (!token || token !== process.env.TOKEN_PASSKEY)
    return res.status(403).json({ error: 'Token mancante o non valido' });
  next();
});

// -------------------- Endpoint principale --------------------
app.post('/salvataggioADBedInvioEmail', handlePartecipazione);

// -------------------- Keepalive --------------------
app.get('/keepalive', (_, res) => res.send('OK'));

// -------------------- Endpoint debug token --------------------
app.get('/check-token', (_, res) => res.json({
  envToken: process.env.TOKEN_PASSKEY ? "SET" : "NOT SET",
  value: process.env.TOKEN_PASSKEY || null
}));

// -------------------- Avvio Server --------------------
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`✅ Server attivo su porta ${port}`));
