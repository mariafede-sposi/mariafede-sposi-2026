export default function IlRicevimento({ show, handleShow, handleClose }) {
    return (
        <div style={{ marginTop: 30 }}>

            <div className="align-items-center">
                <h2>Il Ricevimento</h2>
                <hr style={{ width: '300px', placeSelf: 'center' }} />
                <h3>Villa Pocci</h3>
                <h3>Marino (RM)</h3>
                <div style={{ display: 'flex', alignItems: 'center', placeContent: 'center', margin: '20px 0' }}>
                    <div
                        onClick={() => window.open("https://www.google.com/maps/place/Villa+Pocci/@41.7623766,12.6691331,17z/data=!4m6!3m5!1s0x132585d94763fe45:0x8f38feaa293a25b1!8m2!3d41.7623726!4d12.671708!16s%2Fg%2F1vgn4zg_", '_blank')}
                        className="buttons"

                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                            </svg>
                            <div style={{ marginLeft: 5 }}>Villa Pocci</div>

                        </div>
                    </div>
                </div>
                <div style={{ padding: '0 20px' }}>
                    <i>O mar! O sol! L'auliv!</i><br /> Non trovandole abbiamo puntato su una bellissima villa con vista lago. Sperando di poter sfruttare gli ampi giardini, vi aspettiamo affamati!
                </div>

                <div className="col-12 ">
                    <div style={{ width: '100%', textAlign: '-webkit-center', marginTop: 20 }}>

                        <div className="ricevimento-img">

                            <svg
                                style={{
                                    position: 'absolute',
                                    top: 0,
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
                                    fill="#fff"
                                />
                            </svg>


                            <svg
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "25px",
                                    transform: "scale(-1, -1)"
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1000 50"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M0 0v45.1C49.7 49.9 105 41 160 32.5c75.5-11.6 145.5-11.2 222-1.5 
       63 8 119 7 173-4 79.5-16.2 156.2-13.8 240-5 
       82.6 8.7 143-0.5 205-15.9V0H0Z"
                                    fill="#D7E0DD"
                                />
                            </svg>

                        </div>
                    </div>
                </div>

                {/* Descrizione */}
                <div className="col-12 " style={{ backgroundColor: '#D7E0DD', padding: 20 }}>
                    <h3>Nota bene!</h3>
                    <p className="text-start"> Ci sono <strong>tre</strong> cancelli di entrata, quello giusto è <strong>quello centrale</strong>! Se avete problemi di deambulazione fatecelo sapere e ci mettiamo d'accordo con il ristorante per farvi entrare da un punto dove non siete obbligati a fare scale.</p>


                </div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 100"><g fill="#D7E0DD"><rect fill="#FFF" width="100%" height="100%" /><path d="M0 0v60c9 0 18-3 25-10 13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s37 13 50 0c14-14 37-14 50 0 7 7 16 10 25 10V0H0Z"></path></g></svg> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"><g fill="#D7E0DD"><path d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z" opacity=".5"></path><path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path></g></svg>



            </div>
        </div>
    );
}
