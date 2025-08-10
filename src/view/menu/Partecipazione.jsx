import React, { useState } from 'react';

export default function Partecipazione() {
  const [formData, setFormData] = useState({
    partecipanti: 1,
    allergie: '',
    preferenze: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'partecipanti') {
      const num = Math.max(1, Number(value));
      setFormData(prev => ({ ...prev, partecipanti: num }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dati inviati:', formData);
    setSubmitted(true);
    // Qui potresti integrare API o invio email
  };

  if (submitted) {
    return (
      <div>
        <h2>Grazie per la conferma!</h2>
        <p>Abbiamo ricevuto la tua risposta.</p>
      </div>
    );
  }

  return (
    <>
      <h2>Partecipazione</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column" style={{ maxWidth: 400, gap: '1rem' }}>
        <label>
          Numero di partecipanti:
          <input
            type="number"
            name="partecipanti"
            min="1"
            value={formData.partecipanti}
            onChange={handleChange}
            required
            className="form-control"
          />
        </label>

        <label>
          Allergie:
          <input
            type="text"
            name="allergie"
            value={formData.allergie}
            onChange={handleChange}
            placeholder="Es. glutine, lattosio..."
            className="form-control"
          />
        </label>

        <label>
          Preferenze alimentari:
          <input
            type="text"
            name="preferenze"
            value={formData.preferenze}
            onChange={handleChange}
            placeholder="Es. vegetariano, vegano..."
            className="form-control"
          />
        </label>

        <button type="submit" className="btn btn-custom mt-3">
          Invia
        </button>
      </form>
    </>
  );
}
