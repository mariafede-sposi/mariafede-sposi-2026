import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Container } from 'react-bootstrap'; // Importa i componenti che ti servono

import { CentralComponent } from './view/CentralComponent';


function App() {

  return (
    <React.Fragment>
      <CentralComponent />

    </React.Fragment>

  )
}

export default App
