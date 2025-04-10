import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import {Home} from './pages/Home';
import {Menu} from './pages/Menu';
import {Carta} from './pages/Carta'
import {ReservationPage} from './pages/Reservacion';
import {Login} from './pages/Login';
import {Admin} from './pages/Admin';
import {AdminReservations} from './pages/AdminReservations';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

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
                <Route path='/login' element={<Login />} />
                <Route path='/admin' element={
                  <ProtectedRoute requiredRole="admin">
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path='/admin/reservations' element={
                  <ProtectedRoute requiredRole={['admin', 'staff']}>
                    <AdminReservations />
                  </ProtectedRoute>
                } />
            </Routes>
        </Router>
  );
};

export default App