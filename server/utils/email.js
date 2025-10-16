import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadTemplate(fileName, replacements = {}) {
    const filePath = path.join(__dirname, 'emailTemplates', fileName);
    let content = fs.readFileSync(filePath, 'utf-8');

    for (const [key, value] of Object.entries(replacements)) {
        content = content.replace(new RegExp(`{${key}}`, 'g'), value);
    }

    return content;
}

export async function inviaEmail(payload, errori, TIMEOUT_MS, withTimeout) {
    return withTimeout(async () => {
        if (!payload.email) return;
        try {
            const dettagliPartecipanti = payload.persone
                .map(p => `<div class="partecipante">• <strong>${p.nome}</strong> (${p.tipo}) — ${p.preferenza} — ${p.allergie}</div>`)
                .join('\n');

            const replacements = {
                email: payload.email,
                partecipanti: payload.partecipanti,
                bambini: payload.bambini || 0,
                dettagli_partecipanti: dettagliPartecipanti,
                note: payload.note || 'Nessuna'
            };

            const htmlContent = loadTemplate('conferma_partecipazione.html', replacements);

            const body = {
                sender: { email: process.env.EMAIL_FROM },
                to: [{ email: payload.email }],
                bcc: [{ email: 'mariafedesposi@gmail.com' }],
                subject: 'Nuova conferma di partecipazione',
                htmlContent
            };

            const res = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'api-key': process.env.EMAIL_PASS
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error(`Brevo API error: ${res.status} ${res.statusText}`);
        } catch (err) {
            errori.push({ metodo: 'inviaEmail', log: err.toString() });
            console.error('Errore inviaEmail:', err);
        }
    }, TIMEOUT_MS, "inviaEmail");
}

export async function inviaMailErrore(payload, errori, TIMEOUT_MS, withTimeout) {
    return withTimeout(async () => {
        if (errori.length === 0) return;
        try {
            const replacements = {
                payload: JSON.stringify(payload, null, 2),
                errori: errori
                    .map(e => `<p><strong>${e.metodo}</strong>: ${e.log}</p>`)
                    .join('<br/>')
            };

            const htmlContent = loadTemplate('errore_invio.html', replacements);

            const body = {
                sender: { email: process.env.EMAIL_FROM },
                to: [{ email: process.env.EMAIL_FROM }],
                subject: 'Errore durante salvataggio/invio email',
                htmlContent
            };

            const res = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'api-key': process.env.EMAIL_PASS
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error(`Brevo API error: ${res.status} ${res.statusText}`);
        } catch (err) {
            console.error('Errore invio mail di alert:', err);
        }
    }, TIMEOUT_MS, "inviaMailErrore");
}
