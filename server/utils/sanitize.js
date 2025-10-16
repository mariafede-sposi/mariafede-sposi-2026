import validator from 'validator';

export function sanitizePartecipante(p) {
    return {
        nome: validator.escape(p.nome || ""),
        tipo: validator.escape(p.tipo || "adulto"),
        preferenza: validator.escape(p.preferenza || "Nessuna"),
        allergie: validator.escape(p.allergie || "Nessuna allergia indicata")
    };
}

export function sanitizePayload(payload) {
    const persone = (payload.persone || []).map(sanitizePartecipante);
    const bambini = persone.filter(p => p.tipo.toLowerCase() === "bambino").length;

    return {
        email: payload.email ? validator.normalizeEmail(payload.email) : "",
        partecipanti: Number(payload.partecipanti) || 0,
        bambini,
        persone,
        note: validator.escape(payload.note || "")
    };
}
