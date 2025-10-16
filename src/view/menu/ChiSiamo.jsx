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
                <p>
                    Maria Teresa e Federico si conoscono all'università anche se il loro amore
                    sboccerà qualche anno dopo. Superati i primi ostacoli di coppia come il
                    primo viaggio, la prima spesa, la prima dichiarazione dei
                    redditi e la prima carbonara insieme (la fa meglio Maria Teresa), vanno a
                    convivere e, rifiutando di capire il palese errore, insistono nell'andare
                    avanti e nel volersi sposare. Questo sito è una delle pietre miliari del
                    loro rapporto e in parte rappresenta ciò che insieme sono capaci di fare.
                </p>
            </div>

            {/* Colonna slider */}
            <div className="col-md-6" style={{ textAlign: '-webkit-center' }}>
                <Slider ref={sliderRef} {...settings}>
                    <div><img src={slide2} alt="slide2" className="slide_imgs" /></div>
                    <div><img src={slide6} alt="slide6" className="slide_imgs" /></div>
                    <div><img src={slide7} alt="slide7" className="slide_imgs" /></div>
                    <div><img src={slide1} alt="slide1" className="slide_imgs" /></div>
                    <div><img src={slide3} alt="slide3" className="slide_imgs" /></div>
                    <div><img src={slide5} alt="slide5" className="slide_imgs" /></div>
                    <div><img src={slide4} alt="slide4" className="slide_imgs" /></div>
                </Slider>
            </div>
        </div>

    );
}
