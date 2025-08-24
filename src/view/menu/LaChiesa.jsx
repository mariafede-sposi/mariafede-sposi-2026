export default function LaChiesa({ show, handleShow, handleClose }) {

    return (
        <div >



            <div className="col-12 ">
                {/* Descrizione */}
                <h2>La Celebrazione</h2>
                <hr style={{ width: '300px', placeSelf: 'center' }} />
                <h3>Chiesa di Santa Maria Assunta </h3>
                <h3 style={{ marginTop: '-10px' }}> Ariccia (RM)</h3>
                <div style={{ display: 'flex', alignItems: 'center', placeContent: 'center', margin: '20px 0' }}>

                    <div
                        onClick={() => window.open("https://maps.app.goo.gl/MTxKZ2Cbjct4fv7D8", '_blank')}
                        style={{ marginRight: 10 }}
                        className="buttons"

                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                            </svg>
                            <div style={{ marginLeft: 5 }}>La chiesa</div>
                        </div>
                    </div>

                    <div
                        onClick={() => window.open("https://maps.app.goo.gl/pZwd7HjurpzNLuxf8", '_blank')}
                        className="buttons"

                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                            </svg>
                            <div style={{ marginLeft: 5 }}>Parcheggio Bernini</div>

                        </div>
                    </div>
                </div>
                <div style={{ padding: '0 20px' }}>
                    Le nozze saranno benedette dal nostro <i>unico, inimitabile, superfantastico, purissimo e levissimo</i> (ma ha anche dei difetti) <strong>Don Fernando Cianfriglia</strong>.
                </div>

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