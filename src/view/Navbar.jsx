import React from 'react';

export default function Navbar({ onMenuClick }) {
  return (
    <nav
      className="navbar bg-lights"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'auto',
        minHeight: 56,
        zIndex: 1100,
        padding: '0 10px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap', // Permette di andare a capo su schermi piccoli
        gap: '0.5rem'
      }}
    >
      <button
        className="btn btn-primary navbar-button"
        onClick={onMenuClick}
        aria-label="Apri menu"
      >
        ☰
      </button>

      <span
        style={{
          fontSize: '2rem',
          fontWeight: 500,
          whiteSpace: 'normal', // Permette al testo di spezzarsi
          wordBreak: 'break-word', // Evita overflow
          flex: 1, // Prende lo spazio rimanente
          marginLeft: 50
        }}
      >
        M&F
      </span>
      <span
        style={{
          fontSize: '1rem',
          fontWeight: 500,
          whiteSpace: 'normal', // Permette al testo di spezzarsi
          wordBreak: 'break-word', // Evita overflow 
          marginRight: 10
        }}
      >
        14/02/2026
      </span>
    </nav>
  );
}
