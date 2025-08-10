import React, { useEffect, useState } from 'react';

export default function FadeInWrapper({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Attiva la classe dopo il montaggio per scattare l'animazione
    setIsVisible(true);
  }, []);

  return (
    <div className={isVisible ? 'fade-in' : ''}>
      {children}
    </div>
  );
}
