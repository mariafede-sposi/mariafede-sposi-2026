import React, { useState } from 'react';
import Navbar from './view/Navbar';
import CentralComponent from './view/CentralComponent';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    < div style={{ paddingBottom: 50 }}>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <div className='header'>

        <div>
          <div className='disneyland-foto'>
            <div style={{ position: 'absolute', top: 20, justifySelf: 'center' }}>

              <h1 style={{ marginBottom: -5, color: 'white' }}>
                Maria Teresa & Federico<br />
              </h1>
              <h4 style={{ color: 'white', fontSize: '1em' }}>si sposano il</h4>
              <hr style={{ width: '300px', placeSelf: 'center', color: 'white' }} />
              <h1 style={{ marginBottom: -5, color: 'white' }}>14 Febbraio 2026</h1>
            </div>
            <svg style={{ transform: 'rotate(180deg)', position: 'absolute', bottom: 0, left: 0 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"><g fill="#F9F6F2"><path d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z" opacity=".5"></path><path d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z"></path></g></svg>

          </div>

        </div>
      </div>
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: '#fafafa', zIndex: 1090 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}


      <CentralComponent />
    </div>
  );
}
