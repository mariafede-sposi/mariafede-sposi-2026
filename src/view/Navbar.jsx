import React from 'react';

export default function Navbar({ onMenuClick }) {
  return (
    <nav
      className="navbar bg-light border-bottom"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        zIndex: 1100,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <button
        className="btn btn-primary"
        onClick={onMenuClick}
        aria-label="Apri menu"
      >
        ☰
      </button>
      <span className="navbar-brand ms-3 mb-0 h1" style={{ userSelect: 'none' }}>
        Matrimonio
      </span>
    </nav>
  );
}
