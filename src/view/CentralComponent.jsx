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
      <section id="chi-siamo" style={{ paddingTop: 80, paddingBottom: 60 }}>
        <FadeInWrapper><ChiSiamo /></FadeInWrapper>
      </section>

      <section id="informazioni" style={{ paddingTop: 80, paddingBottom: 60 }}>
        <FadeInWrapper><InformazioniGenerali /></FadeInWrapper>
      </section>

      <section id="chiesa" style={{ paddingTop: 80, paddingBottom: 60 }}>
        <FadeInWrapper><LaChiesa /></FadeInWrapper>
      </section>

      <section id="ricevimento" style={{ paddingTop: 80, paddingBottom: 60 }}>
        <FadeInWrapper><IlRicevimento /></FadeInWrapper>
      </section>

      <section id="partecipazione" style={{ paddingTop: 80, paddingBottom: 60 }}>
        <FadeInWrapper><Partecipazione /></FadeInWrapper>
      </section>

      <section id="regali" style={{ paddingTop: 80, paddingBottom: 60 }}>
        <FadeInWrapper><Regali /></FadeInWrapper>
      </section>
    </div>
  );
}
