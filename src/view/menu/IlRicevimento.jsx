export default function IlRicevimento({ show, handleShow, handleClose }) {
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                {/* Mappa */}
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                    <iframe
                        title="Location Ricevimento"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.835611354233!2d12.669133115421553!3d41.76237657923216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132585d94763fe45%3A0x8f38feaa293a25b1!2sVilla%20Pocci!5e0!3m2!1sit!2sit!4v1691500000000!5m2!1sit!2sit"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                {/* Descrizione */}
                <div className="col-12 col-md-6">
                    <h3>Villa Pocci, Marino (RM)</h3>
                    <p>
                        📍{" "}
                        <a
                            href="https://www.google.com/maps/place/Villa+Pocci/@41.7623766,12.6691331,17z/data=!4m6!3m5!1s0x132585d94763fe45:0x8f38feaa293a25b1!8m2!3d41.7623726!4d12.671708!16s%2Fg%2F1vgn4zg_"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Apri in Google Maps
                        </a>
                    </p>
                    <p>Occhio che ci sono <strong>tre</strong> cancelli di entrata, quello giusto è <strong>quello centrale</strong>! Se avete problemi di deambulazione fatecelo sapere e ci mettiamo d'accordo con il ristorante per farvi entrare da un punto dove non siete obbligati a fare scale.</p>
                    <p className="text-start">
                        Dal sito web della villa:  <i>  "La Villa è immersa nel verde di un enorme parco, impreziosito da piante secolari e da generose fioriture. Un incantevole giardino d’inverno dotato di vetrate panoramiche e un cielo stellato, si affaccia sulla terrazza con veduta sul lago, spazi luminosi, ampi e confortevoli il cui gusto e sobrietà negli arredi permettono una facile personalizzazione della scenografia di qualsiasi evento.
                            All’esterno, le due bellissime piscine a ridosso della struttura e la magnifica terrazza sono lo spazio ideale per cocktail e aperitivi. Con il bel tempo il banchetto o il buffet può essere allestito interamente sulla terrazza e godere della meravigliosa vista sul lago di Castel Gandolfo."
                        </i>

                    </p>
                </div>
            </div>
        </div>
    );
}
