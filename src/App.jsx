import React, { useState } from 'react';
import Navbar from './view/Navbar';
import CentralComponent from './view/CentralComponent';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 1090 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <nav
        className="position-fixed top-0 start-0 h-100 bg-light p-3 border-end"
        style={{
          width: 250,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1100,
          paddingTop: 56, // spazio navbar
          overflowY: 'auto',
        }}
      >
        <ul className="nav flex-column">
          {[
            ['chi-siamo', 'Chi siamo'],
            ['informazioni', 'Informazioni generali'],
            ['chiesa', 'La chiesa'],
            ['ricevimento', 'Il ricevimento'],
            ['partecipazione', 'Partecipazione'],
            ['regali', 'Regali'],
          ].map(([id, label]) => (
            <li className="nav-item mb-2" key={id}>
              <a
                href={`#${id}`}
                className="nav-link"
                onClick={() => setSidebarOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main

        style={{
          backgroundColor: 'var(--bianco-avorio)',
          minHeight: '100vh',
          fontFamily: "'Georgia', serif",
          color: 'var(--colore-testo)',
          margin: 0,
        }}
      >
        <CentralComponent />
      </main>
    </>
  );
}
