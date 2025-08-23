import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["chi-siamo", "Chi siamo"],
    ["informazioni", "Informazioni generali"],
    ["chiesa", "La chiesa"],
    ["ricevimento", "Il ricevimento"],
    ["partecipazione", "Partecipazione"],
    ["regali", "Regali"],
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        minHeight: 56,
        zIndex: 1100,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "white", 
      }}
    >
      {/* Logo */}
      <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>M&F</span>

      {/* Menu Desktop */}
      <ul className="nav-links">
        {links.map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`}>{label}</a>
          </li>
        ))}
      </ul>

      {/* Bottone Hamburger (mobile) */}
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Apri menu"
      >
        ☰
      </button>

      {/* Menu Mobile a comparsa */}
      {open && (
        <div className="mobile-menu">
          <ul>
            {links.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
