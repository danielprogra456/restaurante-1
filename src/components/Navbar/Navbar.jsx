import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

import './Navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <Link to="/home">World Plate</Link>
      </div>
      <ul className="app__navbar-links">
        <li className="p__opensans"><Link to="/home">Inicio</Link></li>
        <li className="p__opensans"><Link to="/menu">Menú</Link></li>
        <li className="p__opensans"><Link to="/carta">Carta</Link></li>
        <li className="p__opensans"><Link to="/reservacion">Reservación</Link></li>
        {isAuthenticated && user?.role === 'admin' && (
          <li className="p__opensans"><Link to="/admin">Admin</Link></li>
        )}
        {isAuthenticated && (user?.role === 'admin' || user?.role === 'staff') && (
          <li className="p__opensans"><Link to="/admin/reservations">Reservas</Link></li>
        )}
      </ul>
      <div className="app__navbar-login">
        {isAuthenticated ? (
          <div className="user-menu">
            <FaUserCircle className="user-icon" />
            <span className="p__opensans user-name">Hola, {user?.name || 'Usuario'}</span>
            <button className="logout-btn p__opensans" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link to="/login" className="p__opensans login-link">Iniciar Sesión</Link>
        )}
      </div>
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
            <ul className="app__navbar-smallscreen_links">
              <li><Link to="/home" onClick={() => setToggleMenu(false)}>Inicio</Link></li>
              <li><Link to="/menu" onClick={() => setToggleMenu(false)}>Menú</Link></li>
              <li><Link to="/carta" onClick={() => setToggleMenu(false)}>Carta</Link></li>
              <li><Link to="/reservacion" onClick={() => setToggleMenu(false)}>Reservación</Link></li>
              {isAuthenticated && user?.role === 'admin' && (
                <li><Link to="/admin" onClick={() => setToggleMenu(false)}>Admin</Link></li>
              )}
              {isAuthenticated && (user?.role === 'admin' || user?.role === 'staff') && (
                <li><Link to="/admin/reservations" onClick={() => setToggleMenu(false)}>Reservas</Link></li>
              )}
              {isAuthenticated ? (
                <li>
                  <div className="user-info-mobile">
                    <span>Hola, {user?.name || 'Usuario'}</span>
                    <button onClick={() => { handleLogout(); setToggleMenu(false); }}>
                      Cerrar Sesión
                    </button>
                  </div>
                </li>
              ) : (
                <li><Link to="/login" onClick={() => setToggleMenu(false)}>Iniciar Sesión</Link></li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
