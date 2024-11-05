import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import {Home} from './pages/Home';
import {Menu} from './pages/Menu';
import {Carta} from './pages/Carta'
import {ReservationPage} from './pages/Reservacion';

const App = () => {
  return (
        <Router>
            {/* Vistas segun la ruta */}
            <Routes>
                <Route path="/*" element={<Navigate to="/home" />} />
                <Route path='/home' element={<Home />} />
                <Route path='/menu' element={<Menu />} />
                <Route path='/carta' element={<Carta />} />
                <Route path='/reservacion' element={<ReservationPage />} />
            </Routes>
        </Router>
  );
};

export default App