export default function LaChiesa({ show, handleShow, handleClose }) {

    return (
        <div >



            <div className="col-12 ">
                {/* Descrizione */}
                <h2>La Celebrazione</h2>
                <hr style={{ width: '300px', placeSelf: 'center' }} />
                <h3>Chiesa di Santa Maria Assunta </h3>
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
                <p style={{ padding: '0 5em' }}>
                    Le nozze saranno benedette dal nostro <i>unico, inimitabile, superfantastico, purissimo e levissimo</i> (ma ha anche dei difetti) <strong>Don Fernando Cianfriglia</strong>.
                </p>

            </div>
            <div className="col-12 ">
                <div style={{ width: '100%', textAlign: '-webkit-center' }}>
                    <div className="bottom-svg top-svg"></div>
                    <div className="chiesa-img"></div>
                    <div className="bottom-svg upside-down"></div>
                </div>
            </div>
            <div className="col-12" style={{ backgroundColor: '#F9F6F2', paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                <h3>Attenzione!</h3>
                <p className="text-start">
                    Ci sposeremo di sabato e se il tempo sarà bello potrebbe essere complesso trovare parcheggio perché siamo a due passi dalle fraschette. <br />
                    Il parroco della chiesa ci ha suggerito il <strong>parcheggio Bernini</strong> (che è gratuito). <br />
                    C'è un ascensore per salire dal parcheggio alla chiesa e quello è a pagamento (costa circa 1€ e può trasportare più o meno 20 persone da quanto ci dicono). L'ascensore arriva direttamente in piazza, davanti palazzo Chigi che è a sua volta
                    davanti la chiesa.
                </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 100"><g fill="#F9F6F2"><rect fill="#FFF" width="100%" height="100%" /><path d="M0 0v60c9 0 18-3 25-10 13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s37 13 50 0c14-14 37-14 50 0 7 7 16 10 25 10V0H0Z"></path></g></svg>
            {/* Mappa 
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
                */}
        </div>

    )
}