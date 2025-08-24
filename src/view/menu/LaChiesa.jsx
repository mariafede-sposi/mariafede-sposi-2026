export default function LaChiesa({ show, handleShow, handleClose }) {

    return (
        <div style={{ marginTop: 30 }} >



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
                <div style={{ width: '100%', textAlign: '-webkit-center', marginTop: 20 }}>
                    <div className="chiesa-img">
                        <svg
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "25px",
                                transform: "scaleX(-1)"  // <-- specchiato orizzontalmente
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1000 50"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 0v45.1C49.7 49.9 105 41 160 32.5c75.5-11.6 145.5-11.2 222-1.5 
       63 8 119 7 173-4 79.5-16.2 156.2-13.8 240-5 
       82.6 8.7 143-0.5 205-15.9V0H0Z"
                                fill="#FFFFFF"
                            />
                        </svg>

                        <svg
                            style={{
                                transform: 'rotate(180deg)',
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "25px",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1000 100"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0 0v90.2C49.7 99.9 105 82 160 65c75.5-23.3 145.5-22.4 222-3 63 16 119 14 173-8 79.5-32.4 156.2-27.6 240-10 82.6 17.4 143-1 205-31.7V0H0Z"
                                fill="#D7E0DD"
                            />
                        </svg>



                    </div>
                </div>
            </div>

            <div className="col-12" style={{ backgroundColor: '#D7E0DD', padding: 20 }}>
                <h3>Nota bene!</h3>
                <p className="text-start">
                    Ci sposeremo di sabato e se il tempo sarà bello potrebbe essere complesso trovare parcheggio perché siamo a due passi dalle fraschette. <br />
                    Il parroco della chiesa ci ha suggerito il <strong>parcheggio Bernini</strong> (che è gratuito). <br />
                    C'è un ascensore per salire dal parcheggio alla chiesa e quello è a pagamento (costa circa 1€ e può trasportare più o meno 20 persone da quanto ci dicono). L'ascensore arriva direttamente in piazza, davanti palazzo Chigi che è a sua volta
                    davanti la chiesa.
                </p>
            </div>
            <svg style={{ transform: "scaleX(-1)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"><g fill="#D7E0DD"><path d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z" opacity=".5"></path><path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path></g></svg>
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