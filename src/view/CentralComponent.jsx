import React from 'react';

import ChiSiamo from './menu/ChiSiamo';
import InformazioniGenerali from './menu/InformazioniGenerali';
import LaChiesa from './menu/LaChiesa';
import IlRicevimento from './menu/IlRicevimento';
import Partecipazione from './menu/Partecipazione';
import Regali from './menu/Regali';
import FadeInWrapper from './FadeInWrapper';
import Countdown from './Countdown';

export default function CentralComponent() {
  return (

    <div>
      <section id="informazioni" className='box-container' >
        <FadeInWrapper><InformazioniGenerali /></FadeInWrapper>
      </section>

      <section id="chi-siamo" className='box-container' >
        <FadeInWrapper><ChiSiamo /></FadeInWrapper>
      </section>

      <section id="chiesa" className='box-container' >
        <FadeInWrapper><LaChiesa /></FadeInWrapper>
      </section>
      <section className='box-container' id="ricevimento" >
        <FadeInWrapper><IlRicevimento /></FadeInWrapper>
      </section>

      <section className='box-container' id="partecipazione"  >
        <FadeInWrapper><Partecipazione /></FadeInWrapper>
      </section>

      <section className='box-container' id="regali" >
        <FadeInWrapper><Regali /></FadeInWrapper>
      </section>
    </div>
  );
}
