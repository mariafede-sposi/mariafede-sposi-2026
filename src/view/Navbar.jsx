import React, { useState } from 'react'

// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Questa linea è cruciale
// ... il resto del tuo codice ...

export const Navbar = ({ show, handleShow, handleClose }) => {

    const handleSidebar = () => {
        if (show)
            handleClose()
        else
            handleShow()
    }

    return (
        <nav class="navbar navbar-expand-lg main-navbar">
            <div class="container-fluid">
                <div class="pointer" onClick={() => handleSidebar()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                </div>
                <div class="flower-img">

                </div>

            </div>
        </nav>
    )
}