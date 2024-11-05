import React from 'react';
import { FiFacebook, FiTwitter, FiX } from 'react-icons/fi';
import { images } from '../../constants';
import { FooterOverlay, Newsletter } from '../../components';
import './Footer.css';

const Footer = () => (
  <div className='app__footer section__padding'>
    <div className='app__footer-links'>
      <div className='app__footer-links_contact'>
        <h1 className='app__footer-headtext'>Contactanos</h1>
        <p className='p__opensans'>Calle del Sabor 123, Ciudad Gourmet, CP 45678, Italia</p>
        <p className='p__opensans'>(555) 123-4567</p>
        <p className='p__opensans'>(555) 352-4537</p>
      </div>

      <div className='app__footer-links_logo'>
        <div className='app__footer-links_icons'>
          <FiFacebook />
          <FiTwitter />
          <FiX />
        </div>
      </div>

      <div className='app__footer-links_work'>
        <h1 className='app__footer-headtext'>Horario</h1>
        <p className='p__opensans'>Lunes a Domingo</p>
        
        <p className='p__opensans'>12:00 pm - 15:00pm</p>        
      </div>
    </div>

    <div className='footer__copyright'>
      <p className='p__opensans'>2024 World Plate. Todos los derechos reservados.</p>
    </div>


  </div>
);

export default Footer;