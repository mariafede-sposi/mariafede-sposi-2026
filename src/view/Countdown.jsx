import React, { useState, useEffect } from "react";
import './Countdown.css';

export default function Countdown() {
    const calculateTimeLeft = () => {
        const difference = +new Date("2026-02-14T11:00:00") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = null;
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    if (!timeLeft) {
        return (
            <div className="finished-container">
                <h2 className="finished-text">È il grande giorno!</h2>
            </div>
        );
    }

    return (
        <div className="countdown-container">
            <h4 style={{ paddingTop: 20 }}>Ti aspettiamo per festeggiare<br /> il nostro matrimonio </h4>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', paddingTop: 20 }}>
                <div style={{ marginRight: 15 }} className="nome-con-border"><b>Sabato</b></div>
                <div style={{ fontSize: '2em' }}><b>14</b></div>
                <div className="nome-con-border" style={{ marginLeft: 15 }}><b>Febbraio</b></div>
            </div>
            <h4 style={{ paddingTop: 20 }}>Mancano: </h4>
            <div style={{ marginTop: 20 }} className="countdown-timer">
                <TimeBlock label="Giorni" value={timeLeft.days} />
                <TimeBlock label="Ore" value={timeLeft.hours} />
                <TimeBlock label="Minuti" value={timeLeft.minutes} />
                <TimeBlock label="Secondi" value={timeLeft.seconds} />
            </div>

        </div>
    );
}

function TimeBlock({ label, value }) {
    return (
        <div className="time-block">
            <div className="time-value">{value}</div>
            <div className="time-label">{label}</div>
        </div>
    );
}
