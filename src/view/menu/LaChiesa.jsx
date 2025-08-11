export default function LaChiesa({ show, handleShow, handleClose }) {

    return (
        <div className="container my-5">
            <div className="row align-items-center">


                {/* Descrizione */}
                <div className="col-12 col-md-6">
                    <h3>Collegiata di Santa Maria Assunta </h3>
                    <h3 style={{ marginTop: '-10px' }}> Ariccia (RM)</h3>
                    <p>
                        📍{" "}
                        <a
                            href="https://maps.app.goo.gl/MTxKZ2Cbjct4fv7D8"
                            target="_blank"
                            rel="noreferrer"
                            style={{ marginRight: 10 }}
                        >
                            La chiesa
                        </a>

                        📍{" "}
                        <a
                            href="https://maps.app.goo.gl/pZwd7HjurpzNLuxf8"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Parcheggio Bernini
                        </a>
                    </p>
                    <p>
                        Le nozze saranno benedette dal nostro <i>unico, inimitabile, superfantastico, purissimo e levissimo</i> (ma ha anche dei difetti) <strong>Don Fernando Cianfriglia</strong>.
                    </p>
                </div>
                {/* Mappa */}
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                    <iframe
                        title="Location Ricevimento"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.651763563004!2d12.669273315419728!3d41.72120167921565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132584fcb9a83ad1%3A0x66e855e7f7960b57!2sCollegiata%20di%20Santa%20Maria%20Assunta!5e0!3m2!1sit!2sit!4v1691506000000!5m2!1sit!2sit"
                        width="100%"
                        height="350"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                <h3>Attenzione!</h3>
                <p className="text-start">
                    Ci sposeremo di sabato e se il tempo sarà bello potrebbe essere complesso trovare parcheggio perché siamo a due passi dalle fraschette. <br />
                    Il parroco della chiesa ci ha suggerito il <strong>parcheggio Bernini</strong> (che è gratuito). <br />
                    C'è un ascensore per salire dal parcheggio alla chiesa e quello è a pagamento (costa circa 1€ e può trasportare più o meno 20 persone da quanto ci dicono). L'ascensore arriva direttamente in piazza, davanti palazzo Chigi che è a sua volta
                    davanti la chiesa.
                </p>
            </div>
        </div>
    )
}