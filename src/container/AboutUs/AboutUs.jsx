import React from 'react';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className='app__aboutus app__bg flex__center section__padding' id='about'>
    {/* <div className='app__aboutus-overlay flex__center'>
      <img src={images.rin} alt="" />
    </div> */}

    <div className='app__aboutus-content flex__center'>
      <div className='app__aboutus-content_about'>
        <h1 className='headtext__cormorant'>Sobre nosotros</h1>
        <p className='p__opensans'>En World Plate, cada plato cuenta una historia. Desde nuestra apertura en 2014, nos hemos dedicado a ofrecer una experiencia gastronómica única, combinando lo mejor de la cocina con un ambiente cálido y acogedor.</p>
      </div>

      <div className='app__aboutus-content_knife flex__center'>
        {/* <img src={images.knife} alt="about knife" /> */}
      </div>

      <div className='app__aboutus-content_history'>
        <h1 className='headtext__cormorant'>Nuestra historia</h1>
        <p className='p__opensans'>Nuestra aventura comenzó con una pasión por la comida y el deseo de compartirla con nuestra comunidad. El restaurante se ha convertido en un lugar emblemático en Italia, donde cada ingrediente se selecciona cuidadosamente y se transforma en creaciones que despiertan los sentidos.</p>
      </div>
    </div>
  </div>
);

export default AboutUs;