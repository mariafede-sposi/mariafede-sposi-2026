import React from 'react';

import ChiSiamo from './menu/ChiSiamo';
import InformazioniGenerali from './menu/InformazioniGenerali';
import LaChiesa from './menu/LaChiesa';
import IlRicevimento from './menu/IlRicevimento';
import Partecipazione from './menu/Partecipazione';
import Regali from './menu/Regali';
import FadeInWrapper from './FadeInWrapper';

export default function CentralComponent() {
  return (
    <div>
      <section id="chi-siamo" style={{ paddingTop: 0, paddingBottom: 20 }}>
        <FadeInWrapper><ChiSiamo /></FadeInWrapper>
      </section>

      <section id="informazioni" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <FadeInWrapper><InformazioniGenerali /></FadeInWrapper>
      </section>

      <section id="chiesa" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <FadeInWrapper><LaChiesa /></FadeInWrapper>
      </section>
      <div style={{ display: 'grid', justifyItems: 'center' }}>
        <div className='fogliolina-img'></div>
      </div>
      <section id="ricevimento" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <FadeInWrapper><IlRicevimento /></FadeInWrapper>
      </section>

      <section id="partecipazione" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <FadeInWrapper><Partecipazione /></FadeInWrapper>
      </section>

      <section id="regali" style={{ paddingTop: 10, paddingBottom: 10 }}>
        <FadeInWrapper><Regali /></FadeInWrapper>
      </section>
    </div>
  );
}
