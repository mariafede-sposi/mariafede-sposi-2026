import React, { useRef, useState } from 'react';
import { Button, Offcanvas, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import slide1 from '../../imgs/slider1.jpg'
import slide2 from '../../imgs/slider2.jpg'
import slide3 from '../../imgs/slider3.jpg'
import slide4 from '../../imgs/slider4.jpg'
import slide5 from '../../imgs/slider5.jpg'
import slide6 from '../../imgs/slider6.jpg'
import slide7 from '../../imgs/slider7.jpg'
import slide8 from '../../imgs/slider8.jpg'
import slide9 from '../../imgs/slider9.jpg'
import slide10 from '../../imgs/slider10.jpg'
import slide11 from '../../imgs/slider11.jpg'

export default function ChiSiamo() {
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: "ease"
    };

    return (
        <div className="row">
            {/* Colonna testo */}
            <div className="col-md-6 d-flex align-items-center" style={{ padding: '0 40px' }}>
                <div style={{ marginBottom: 20 }}>
                    <div className="ramo_img"></div>
                    <p>
                        Tu con chi fai l'amore? e perché?<br />
                        Questa è la domanda la cui risposta ha spinto Federico e Maria Teresa alla decisione di sposarsi!<br />
                        Il loro incontro risale al lontano 2015 A.C. (Avanti Covid) dove, durante gli anni dell'università, hanno piantato il seme del loro amore che sboccerà
                        solo dopo 6 anni ed una pandemia! <br />
                        Strano ma vero, nel 2021 D.C. (Dopo Covid) decidono di mettersi insieme e da allora non si sono mai più allontanati l'uno dall'altra.<br />
                        Potremmo scrivere un libro sulla loro storia d'amore e su cosa hanno passato insieme, ma ci auguriamo che nei prossimi capitoli voi possiate farne parte

                        <p style={{ fontStyle: 'italic', fontSize: 14, marginTop: 5 }}>
                            (Nessuna Maria Teresa è stata maltrattata per scrivere questo testo.)
                        </p>
                    </p>
                    <a
                        href="https://www.instagram.com/casciolss"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'underline', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', color: '#5a4a42' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-instagram me-1"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                        </svg>
                        casciolss
                    </a>
                    <br />
                    <a
                        href="https://www.instagram.com/chicco_crem"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'underline', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', color: '#5a4a42' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-instagram me-1"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                        </svg>
                        chicco_crem
                    </a>

                </div>
            </div>

            {/* Colonna slider */}
            <div className="col-md-6" style={{ textAlign: '-webkit-center' }}>
                <Slider ref={sliderRef} {...settings}>
                    <div><img src={slide2} alt="slide2" className="slide_imgs" /></div>
                    <div><img src={slide6} alt="slide6" className="slide_imgs" /></div>
                    <div><img src={slide7} alt="slide7" className="slide_imgs" style={{ objectFit: "cover" }} /></div>
                    <div><img src={slide8} alt="slide8" className="slide_imgs" style={{ objectFit: "cover" }} /></div>
                    <div><img src={slide9} alt="slide9" className="slide_imgs" style={{ objectFit: "cover" }} /></div>
                    <div><img src={slide10} alt="slide10" className="slide_imgs" style={{ objectFit: "cover" }} /></div>
                    <div><img src={slide11} alt="slide11" className="slide_imgs" style={{ objectFit: "cover" }} /></div>
                    <div><img src={slide1} alt="slide1" className="slide_imgs" /></div>
                    <div><img src={slide3} alt="slide3" className="slide_imgs" /></div>
                    <div><img src={slide5} alt="slide5" className="slide_imgs" /></div>
                    <div><img src={slide4} alt="slide4" className="slide_imgs" /></div>
                </Slider>
            </div>
        </div>

    );
}
