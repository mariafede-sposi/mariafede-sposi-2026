import { useState } from "react";

export default function Regali({ show, handleShow, handleClose }) {

    const [copiato, setCopiato] = useState(false);

    const copiaIBAN = async (iban) => {
        try {
            await navigator.clipboard.writeText(iban);
            setCopiato(true);
            setTimeout(() => setCopiato(false), 2000); // reset messaggio dopo 2s
        } catch (err) {
            console.error("Errore nella copia:", err);
        }
    };

    return (
        <div>
            <svg style={{ transform: ' rotate(180deg)' }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 100"><g fill="#D7E0DD"><rect fill="#FFF" width="100%" height="100%" /><path d="M0 0v60c9 0 18-3 25-10 13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s37 13 50 0c14-14 37-14 50 0 7 7 16 10 25 10V0H0Z"></path></g></svg>

            <div style={{ backgroundColor: '#D7E0DD', padding: 20, paddingBottom: 100 }}>
                <h3>Siamo felici della vostra presenza, <br />che è il regalo più importante; </h3>
                <h3>se vorrete, un contributo economico ci sarà  <br />di grande aiutoper il nostro cammino insieme.</h3>

                <br />
                Federico Cremona
                <div style={{ fontSize: '1.2em' }}>IT07M0306973981100000008064</div>
                <div
                    onClick={() => copiaIBAN('IT07M0306973981100000008064')}
                    className="buttons copia-iban"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                    </svg>
                    <div
                        style={{ marginLeft: 5 }}>Copia IBAN di Federico</div>
                </div>

                <div style={{ marginTop: 40 }}>
                    <div>Maria Teresa Cascioli</div>

                </div>
                <div style={{ fontSize: '1.2em' }}> IT03P3608105138294612294618</div>
                <div
                    onClick={() => copiaIBAN('IT03P3608105138294612294618')}
                    className="buttons copia-iban"

                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                    </svg>
                    <div
                        style={{ marginLeft: 5 }}>Copia IBAN di Maria Teresa</div>
                </div>
            </div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 100"><g fill="#D7E0DD"><rect fill="#FFF" width="100%" height="100%" /><path d="M0 0v60c9 0 18-3 25-10 13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s37 13 50 0c14-14 37-14 50 0 7 7 16 10 25 10V0H0Z"></path></g></svg> */}
        </div>

    )
}