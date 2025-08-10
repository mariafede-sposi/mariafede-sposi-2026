import React, { useState } from 'react';

export default function Partecipazione() {
  const [formData, setFormData] = useState({
    partecipanti: 1,
    bambini: 0,
    email: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_BE_URL}/salvataggioADBedInvioEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          corpo_mail: `
			  Partecipanti: ${formData.partecipanti}
			  Bambini: ${formData.bambini}
			  Allergie: ${formData.allergie}
			  Preferenze: ${formData.preferenze}
			`,
          partecipanti: formData.partecipanti,
          bambini: formData.bambini,
          allergie: formData.allergie,
          preferenze: formData.preferenze
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Errore durante l’invio, riprova più tardi.');
    }
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
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="esempio@tuaemail.it"
            className="form-control"
          />
        </label>


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
          Numero di bambini (0-12 anni):
          <input
            type="number"
            name="bambini"
            min="0"
            value={formData.bambini}
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
