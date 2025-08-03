import React, { useState } from 'react';
import { Button, Offcanvas, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Siderbar = ({ show, handleShow, handleClose }) => {


    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link >Chi siamo</Nav.Link>
                        <Nav.Link >Informazioni generali</Nav.Link>
                        <Nav.Link >La chiesa</Nav.Link>
                        <Nav.Link >Il ricevimento</Nav.Link>
                        <Nav.Link >Partecipazione</Nav.Link>
                        <Nav.Link >Il vostro regalo</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
