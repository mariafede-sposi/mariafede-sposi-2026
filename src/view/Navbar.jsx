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
        justifyContent: 'left'
      }}
    >
      <button
        className="btn btn-primary navbar-button"
        onClick={onMenuClick}
        aria-label="Apri menu"
      >
        ☰
      </button>
      <span className="navbar-brand ms-3 mb-0" style={{ userSelect: 'none' }}>
        Matrimonio di Maria Teresa & Federico
      </span>
    </nav>
  );
}
