import React from 'react';
import { Link } from 'react-router-dom';

import { images } from "../../constants"
import './Header.css';
import { SubHeading } from '../../components';
import { Typewriter } from 'react-simple-typewriter'

const Header = () => (
  <div className='app__header app__wrapper section__padding' id='home'>
    <div className='app__wrapper_info'>
      <h1 className='app__header-h1 img'>Disfruta de sabores{' '}</h1>
        <span className='app__header-h1'>
            {/* Style will be inherited from the parent element */}
            <Typewriter
              words={['genuinos', 'reales', 'únicos', 'originales', 'auténticos']}
              loop={5}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
      <p className='p__opensans' style={{ margin: '2rem 0' }}>No te quedes sin mesa y disfruta de una comida especial con nuestros sabores únicos.</p>
      <Link to="/reservacion" className='custom__button' target="_blank">Reservar Mesa</Link>
    </div>
    <div className='app__wrapper_img app__header-img'>
      <img src={images.header} alt="header img" />
    </div>
  </div>
);

export default Header;
