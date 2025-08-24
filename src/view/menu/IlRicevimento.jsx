export default function IlRicevimento({ show, handleShow, handleClose }) {
    return (
        <div>

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
                    <div style={{ width: '100%', textAlign: '-webkit-center' }}>
                        <div className="bottom-svg top-svg"></div>
                        <div className="ricevimento-img"></div>
                        <div className="bottom-svg upside-down"></div>
                    </div>
                </div>

                {/* Descrizione */}
                <div className="col-12 " style={{ backgroundColor: '#F9F6F2', paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                    <h3>Attenzione!</h3>
                    <p className="text-start"> Ci sono <strong>tre</strong> cancelli di entrata, quello giusto è <strong>quello centrale</strong>! Se avete problemi di deambulazione fatecelo sapere e ci mettiamo d'accordo con il ristorante per farvi entrare da un punto dove non siete obbligati a fare scale.</p>


                </div>
                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 100"><g fill="#F9F6F2"><rect fill="#FFF" width="100%" height="100%" /><path d="M0 0v60c9 0 18-3 25-10 13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s36 14 50 0c13-14 36-14 50 0s37 13 50 0c14-14 37-14 50 0 7 7 16 10 25 10V0H0Z"></path></g></svg>

            </div>
        </div>
    );
}
