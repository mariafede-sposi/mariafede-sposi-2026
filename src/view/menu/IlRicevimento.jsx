export default function IlRicevimento({ show, handleShow, handleClose }) {
    return (
        <div>

            <div className="align-items-center">
                <h2>Il Ricevimento</h2>
                <hr style={{ width: '300px', placeSelf: 'center' }} />
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
                {/* Mappa
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
                */}
                <div className="col-12 ">
                    <div style={{ width: '100%', textAlign: '-webkit-center' }}>
                        <div className="bottom-svg top-svg"></div>
                        <div className="ricevimento-img"></div>
                        <div className="bottom-svg upside-down-bianco"></div>
                    </div>
                </div>
                {/* Descrizione */}
                <div className="col-12 " style={{ padding: '0 20px' }}>
                    <p>Occhio che ci sono <strong>tre</strong> cancelli di entrata, quello giusto è <strong>quello centrale</strong>! Se avete problemi di deambulazione fatecelo sapere e ci mettiamo d'accordo con il ristorante per farvi entrare da un punto dove non siete obbligati a fare scale.</p>


                </div>
                <hr style={{ width: '300px', placeSelf: 'center' }} />
            </div>
        </div>
    );
}
