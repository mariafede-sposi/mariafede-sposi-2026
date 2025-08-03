import React, { useState } from 'react'
import { Siderbar } from './Siderbar';
import { Navbar } from './Navbar';
import { ChiSiamo } from './menu/ChiSiamo';
import { InformazioniGenerali } from './menu/InformazioniGenerali';
import { IlRicevimento } from './menu/IlRicevimento';
import { LaChiesa } from './menu/LaChiesa';
import { Partecipazione } from './menu/Partecipazione';
import { Regali } from './menu/Regali';

export const CentralComponent = ({ }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };

    const handleShow = () => {
        console.log("handleShow")
        setShow(true)
    };

    return (

        <div>
            <Navbar show={show} handleShow={handleShow} handleClose={handleClose} />
            <Siderbar show={show} handleShow={handleShow} handleClose={handleClose} />
            <div>
                <ChiSiamo />
                <InformazioniGenerali />
                <LaChiesa />
                <IlRicevimento />
                <Partecipazione />
                <Regali />
            </div>
        </div>
    )
}