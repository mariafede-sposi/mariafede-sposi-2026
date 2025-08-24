import React, { useState, useEffect, useRef } from "react";
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

  const graziePerLaConferma = useRef(null);

  const menuOptions = [
    "Nessuna",
    "Vegetariano",
    "Vegano",
    "Senza glutine",
    "Allergie alimentari (specificare quali)",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "partecipanti") {
        return {
          ...prev,
          partecipanti: value === "" ? "" : Math.max(1, Number(value)),
        };
      }
      if (name === "bambini") {
        return {
          ...prev,
          bambini: value === "" ? "" : Math.max(0, Number(value)),
        };
      }
      return { ...prev, [name]: value };
    });
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
    const partecipantiNum = Number(formData.partecipanti) || 0;
    const bambiniNum = Number(formData.bambini) || 0;
    const totale = partecipantiNum + bambiniNum;

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
          partecipanti: formData.partecipanti,
          bambini: formData.bambini,
          persone: formData.persone,
          note: formData.note
        }),
      });

      setSubmitted(true);
      scrollToTarget()
      toast.success("Hai compilato tutto il form! Che top!!")
    } catch (err) {
      console.error(err);
      toast.error('Errore durante l’invio, riprova più tardi.');
    }
  };

  const scrollToTarget = () => {
    if (graziePerLaConferma.current) {
      graziePerLaConferma.current.scrollIntoView({
        behavior: "smooth", // animazione fluida
        block: "start"      // posizione verticale (start, center, end)
      });
    }
  };

  if (submitted) {
    return (
      <div ref={graziePerLaConferma}>
        <h2>Grazie per la conferma! 🥰​🎉​🎉​</h2>
        <p>Abbiamo ricevuto la tua risposta.</p>
        <p>
          Se tutto è andato a buon fine, riceverai una mail riepilogativa entro qualche minuto!
        </p>
        <p>Non vediamo l'ora di stare insieme, ti vogliamo bene campione!</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="container my-5 text-center">
        <h2>Verrai al matrimonio?</h2>
        <h3>Dicci se ci sarai!</h3>
        <div>Faccelo sapere cliccando su uno dei pulsanti qui sotto</div>
        <div className="d-flex justify-content-center gap-3 " style={{ padding: '40px 0' }}>
          <button className="btn btn-primary px-4" onClick={() => setResponse("yes")}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
              </svg>
              <div style={{ marginLeft: 5 }}>Parteciperò </div>
            </div>
          </button>
          <button className="btn btn-secondary px-4" onClick={() => setResponse("no")}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-2.715 5.933a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8" />
              </svg>
              <div style={{ marginLeft: 5 }}> Non Parteciperò </div>
            </div>
          </button>
        </div>
        <div>
          <div>Puoi anche comunicarcelo telefonicamente o su whatsapp ai numeri:</div>
          <br />
          <div style={{ fontSize: '1.2em' }}><strong>Maria Teresa</strong> +39 339 775 67 35</div>
          <div style={{ fontSize: '1.2em' }}> <strong>Federico</strong> +39 373 743 11 23</div>
        </div>
      </div>
    );
  }

  if (response === "no") {
    return (
      <div className="container my-5">
        <h3>Non potrai partecipare? 😢🥹​</h3>
        <p>
          Ci dispiace non poterti avere con noi in questo giorno speciale, ma ti
          saremo vicini con il pensiero.
          <br />
          Facci un colpo di telefono per comunicarci la tua decisione!
          <br />
          <br />
          Ci trovi ai numeri:
        </p>  <br />
        <p style={{ fontSize: '1.3em' }}><strong>Maria Teresa</strong> +39 339 775 67 35</p>
        <p style={{ fontSize: '1.3em' }}> <strong>Federico</strong> +39 373 743 11 23</p>

        <br />
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-secondary" onClick={() => setResponse(null)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
              </svg>
              <div style={{ marginLeft: 5 }}>Ho cambiato idea</div>
            </div>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                </svg>
                <div style={{ marginLeft: 5 }}>Invia</div>
              </div>

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
            <p style={{ fontSize: '1.3em' }}><strong>Maria Teresa</strong> +39 339 775 67 35</p>
            <p style={{ fontSize: '1.3em' }}> <strong>Federico</strong> +39 373 743 11 23</p>
          </p>
          <br />
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-secondary" onClick={() => setResponse(null)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-up" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708z" />
                </svg>
                <div style={{ marginLeft: 5 }}>Ho cambiato idea</div>
              </div>
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
