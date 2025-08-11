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
      <div className="row align-items-center">

        <form onSubmit={handleSubmit} className="d-flex flex-column col-12 col-md-6 " style={{ marginBottom: '20px', gap: '1rem' }}>
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
            <small style={{ display: "block", color: "#9b7f71" }}>
              Indica eventuali allergie o intolleranze.
            </small>
            <textarea
              name="allergie"
              value={formData.allergie}
              onChange={handleChange}
              placeholder="Es. glutine, lattosio, persone sceme..."
              className="form-control"
              rows={3} // Puoi regolare l'altezza iniziale
            />
          </label>
          <label>
            Preferenza sul menu:
            <small style={{ display: "block", color: "#9b7f71" }}>
              Indica le vostre preferenze, hai abbastanza spazio anche per specificare per chi vuoi esprimere la preferenza. (Ad esempio: siamo 5, 2 menu carne e 3 menu pesce)
            </small>
            <textarea
              type="text"
              name="preferenze"
              value={formData.preferenze}
              onChange={handleChange}
              placeholder="Es. menu di carne, di pesce, vegetariano, vegano"
              className="form-control"
            />
          </label>

          <button type="submit" className="btn btn-custom mt-3">
            Invia
          </button>
        </form>
        <div className="d-flex flex-column  col-12 col-md-6" style={{ gap: '1rem' }}>
          <h3>Qualcosa non va?</h3>
          <p>
            Se non potrai partecipare, hai problemi all'invio del form oppure <br /> non sei sicuro/a su come compilare i vari campi, contattaci tesò!✨
            <br />
            Possiamo rassicurarti sul fatto che non daremo i tuoi dati a nessuno <br />(a meno che non troviamo qualcuno che ce li paghi) (STO SKERZANDO!)
            <br /> <br />
            Ci trovi ai numeri:
            <br /> <br />
            <strong>Maria Teresa</strong> +39 339 775 67 35
            <br />
            <strong>Federico</strong> +39 373 743 11 23
          </p>
        </div>
      </div>
    </>
  );
}
