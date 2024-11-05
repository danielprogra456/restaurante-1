import React, { useState } from 'react';

import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from "react-icons/ai";

import images from '../../constants/images';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false)

  return (
  <nav className='app__navbar'>
    <Link to="/home" className='app__navbar-logo'>
      <img src={images.logo2} alt="app logo" />
    </Link>
    <ul className='app__navbar-links'>
      <li className='p__opensans'><Link to="/home">Inicio</Link></li>
      <li className='p__opensans'><Link to="/menu">Menú</Link></li>
      <li className='p__opensans'><Link to="/reservacion">Reservar</Link></li>
      <li className='p__opensans'><Link to="/carta">Carta</Link></li>
    </ul>

    <div className='app__navbar-smallscreen'>
      <GiHamburgerMenu color='#fff' fontSize={27} onClick={() => setToggleMenu(true)} />

      {toggleMenu && (
        <div className='app__navbar-smallscren_overlay flex__center slide-bottom'>
          <AiOutlineClose fontSize={27} className='overlay__close' onClick={() => setToggleMenu(false) } />
          <ul className='app__navbar-smallscren-links'>
            <li className='p__opensans'><Link to="/">Inicio</Link></li>
            <li className='p__opensans'><Link to="/menu">Menú</Link></li>
            <li className='p__opensans'><Link to="/reservacion">Reservar</Link></li>
            <li className='p__opensans'><Link to="/carta">Carta</Link></li>
          </ul>
        </div>
      )}
      
    </div>
  </nav>
);
}

export default Navbar;
