import Countdown from "../Countdown";
import './../Countdown.css';

export default function InformazioniGenerali({ show, handleShow, handleClose }) {

    return (
        <div style={{ marginBottom: 10 }}>

            <Countdown />
        </div>
    )
}