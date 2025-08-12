import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Partecipazione() {
  const [formData, setFormData] = useState({
    partecipanti: 1,
    bambini: 0,
    email: "",
    persone: [],
    note: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState(null);

  const menuOptions = [
    "Nessuna",
    "Vegetariano",
    "Vegano",
    "Senza glutine",
    "Allergie alimentari (specificare quali)",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "partecipanti") {
      const num = Math.max(1, Number(value));
      setFormData((prev) => ({ ...prev, partecipanti: num }));
    } else if (name === "bambini") {
      const num = Math.max(0, Number(value));
      setFormData((prev) => ({ ...prev, bambini: num }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPersone = [...formData.persone];
    updatedPersone[index] = {
      ...updatedPersone[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, persone: updatedPersone }));
  };

  useEffect(() => {
    const totale = Number(formData.partecipanti) + Number(formData.bambini);
    setFormData((prev) => {
      let newPersone = [...prev.persone];

      if (newPersone.length < totale) {
        for (let i = newPersone.length; i < totale; i++) {
          newPersone.push({ nome: "", preferenza: "Nessuna", allergie: "" });
        }
      } else if (newPersone.length > totale) {
        newPersone = newPersone.slice(0, totale);
      }

      return { ...prev, persone: newPersone };
    });
  }, [formData.partecipanti, formData.bambini]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValida = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailValida) {
      toast.error("Inserisci un indirizzo email valido.");
      return;
    }

    if (formData.partecipanti < 1) {
      toast.error("Deve esserci almeno un partecipante adulto.");
      return;
    }

    const nomiVuoti = formData.persone.some(p => p.nome.trim() === "");
    if (nomiVuoti) {
      toast.error("Inserisci il nome di tutti i partecipanti e bambini.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BE_URL}/salvataggioADBedInvioEmail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          corpo_mail: `
          Partecipanti: ${formData.partecipanti}
          Bambini: ${formData.bambini}
          Dettaglio partecipanti:
          ${formData.persone.map(p => `Nome: ${p.nome}, Preferenza: ${p.preferenza}, Allergie: ${p.allergie || "Nessuna"}`).join('\n')}
          Note aggiuntive: ${formData.note || ""}
        `,
          partecipanti: formData.partecipanti,
          bambini: formData.bambini,
          persone: formData.persone,
          note: formData.note
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      setSubmitted(true);
      toast.success("Hai compilato tutto il form! Che top!!")
    } catch (err) {
      console.error(err);
      toast.error('Errore durante l’invio, riprova più tardi.');
    }
  };


  if (submitted) {
    return (
      <div>
        <h2>Grazie per la conferma!</h2>
        <p>Abbiamo ricevuto la tua risposta.</p>
        <p>
          Se tutto è andato a buon fine, riceverai una mail riepilogativa entro qualche minuto!
        </p>
        <p>Non vediamo l'ora di stare insieme, ti voglio bene campione!</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="container my-5 text-center">
        <h2>Parteciperai al matrimonio?</h2>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <button className="btn btn-primary px-4" onClick={() => setResponse("yes")}>
            Parteciperò
          </button>
          <button className="btn btn-secondary px-4" onClick={() => setResponse("no")}>
            Non parteciperò
          </button>
        </div>
      </div>
    );
  }

  if (response === "no") {
    return (
      <div className="container my-5">
        <h3>Non potrai partecipare?</h3>
        <p>
          Ci dispiace non poterti avere con noi in questo giorno speciale, ma ti
          saremo vicini con il pensiero.
          <br />
          Facci un colpo di telefono per comunicarci la tua decisione!
          <br />
          <br />
          Ci trovi ai numeri:
          <br /> <br />
          <strong>Maria Teresa</strong> +39 339 775 67 35
          <br />
          <strong>Federico</strong> +39 373 743 11 23
        </p>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-secondary" onClick={() => setResponse(null)}>
            Ho cambiato idea
          </button>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>

      <div className="container my-5">
        <h2 className="mb-4">Partecipazione</h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4" noValidate>
          <div className="form-group">
            <label htmlFor="email" className="fw-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="esempio@tuaemail.it"
              className="form-control"
              required
            />
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="partecipanti" className="fw-semibold mb-2">
                Numero di partecipanti:
              </label>
              <input
                type="number"
                id="partecipanti"
                name="partecipanti"
                min="1"
                value={formData.partecipanti}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="bambini" className="fw-semibold mb-2">
                Numero di bambini (0-12 anni):
              </label>
              <input
                type="number"
                id="bambini"
                name="bambini"
                min="0"
                value={formData.bambini}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          {/* Persone */}
          {formData.persone.map((p, i) => (
            <div
              key={i}
              className="border rounded p-3 mb-3"
              style={{ backgroundColor: "#fdf8f3" }}
            >
              <h6 className="mb-3">
                {i < formData.partecipanti
                  ? `Partecipante ${i + 1}`
                  : `Bambino ${i + 1 - formData.partecipanti}`}
              </h6>

              <div className="mb-3">
                <label className="fw-semibold mb-1" htmlFor={`nome-${i}`}>
                  Nome:
                </label>
                <input
                  id={`nome-${i}`}
                  type="text"
                  value={p.nome}
                  onChange={(e) => handlePersonChange(i, "nome", e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="fw-semibold mb-1" htmlFor={`preferenza-${i}`}>
                  Preferenze alimentari:
                </label>
                <select
                  id={`preferenza-${i}`}
                  value={p.preferenza}
                  onChange={(e) =>
                    handlePersonChange(i, "preferenza", e.target.value)
                  }
                  className="form-select w-100"
                  required
                >
                  {menuOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {p.preferenza === "Allergie alimentari (specificare quali)" && (
                <div>
                  <label className="fw-semibold mb-1" htmlFor={`allergie-${i}`}>
                    Allergie o altre richieste particolari:
                  </label>
                  <textarea
                    id={`allergie-${i}`}
                    value={p.allergie}
                    onChange={(e) =>
                      handlePersonChange(i, "allergie", e.target.value)
                    }
                    className="form-control w-100"
                    rows={2}
                    placeholder="Es. glutine, lattosio, ecc."
                  />
                </div>
              )}
            </div>
          ))}

          {/* Note aggiuntive */}
          <div className="form-group">
            <label htmlFor="note" className="fw-semibold mb-2">
              Note aggiuntive:
            </label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="form-control w-100"
              rows={3}
              placeholder="Inserisci eventuali note..."
            />
          </div>

          {/* Bottone centrato */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary px-5">
              Invia
            </button>
          </div>

        </form>

        <section className="mt-5">
          <h3>Qualcosa non va?</h3>
          <p>
            Se hai problemi all'invio del form oppure non sei sicuro/a su come
            compilare i vari campi, contattaci tesò!✨
            <br />
            Possiamo rassicurarti sul fatto che non daremo i tuoi dati a nessuno{" "}
            <br />
            (a meno che non troviamo qualcuno che ce li paghi) (STO SKERZANDO!)
            <br />
            <br />
            Ci trovi ai numeri:
            <br />
            <strong>Maria Teresa</strong> +39 339 775 67 35
            <br />
            <strong>Federico</strong> +39 373 743 11 23
          </p>
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-secondary" onClick={() => setResponse(null)}>
              Ho cambiato idea
            </button>
          </div>
        </section>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </React.Fragment>
  );
}
