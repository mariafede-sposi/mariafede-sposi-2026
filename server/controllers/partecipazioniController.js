import { pool } from '../db/pool.js';
import { withTimeout } from '../utils/timeout.js';
import { sanitizePayload } from '../utils/sanitize.js';
import { inviaEmail, inviaMailErrore } from '../utils/email.js';
import validator from 'validator';

const TIMEOUT_MS = parseInt(process.env.DATABASE_TIMEOUT_MS) || 0;

async function salvaPartecipazioneDB(payload, errori) {
    return withTimeout(async () => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const res = await client.query(
                `SELECT id FROM Indirizzi_Email WHERE Email = $1`,
                [payload.email || (payload.persone[0]?.nome || "").replace(/\s+/g, '').toUpperCase()]
            );

            let indirizzoEmailId;
            const nomePrimo = payload.persone?.[0]?.nome || null;

            if (res.rows.length > 0) {
                indirizzoEmailId = res.rows[0].id;
                await client.query(
                    `UPDATE Indirizzi_Email
           SET Note = CONCAT_WS(' | ', Note, $1::text),
               Partecipanti = Partecipanti + $2,
               Bambini = Bambini + $3
           WHERE Id = $4`,
                    [payload.note || '', payload.partecipanti, payload.bambini || 0, indirizzoEmailId]
                );
            } else {
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

            if (payload.persone?.length > 0) {
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
                        p.tipo.toLowerCase() === "bambino"
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

export async function handlePartecipazione(req, res) {
    const rawPayload = req.body;
    const payload = sanitizePayload(rawPayload);

    if (!payload.partecipanti || payload.partecipanti < 1)
        return res.status(400).send('Numero partecipanti non valido');

    if (payload.email && !validator.isEmail(payload.email))
        return res.status(400).send('Email non valida');

    res.status(200).send('Richiesta ricevuta, elaborazione in corso');

    const errori = [];
    try {
        await salvaPartecipazioneDB(payload, errori);
        await inviaEmail(payload, errori, TIMEOUT_MS, withTimeout);
        await inviaMailErrore(payload, errori, TIMEOUT_MS, withTimeout);
    } catch (err) {
        console.error("Errore interno:", err);
        errori.push({ metodo: 'timeout', log: err.toString() });
        await inviaMailErrore(payload, errori, TIMEOUT_MS, withTimeout);
    }
}
