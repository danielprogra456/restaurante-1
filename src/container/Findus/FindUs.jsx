import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';

const FindUs = () => (
  <div className='app__bg app__wrapper section__padding' id='contact'>
    <div className='app__wrapper_info'>
      <SubHeading title="Contact" />
      <h1 className='headtext__cormorant' style={{ marginBottom: '3rem' }}>Find us</h1>
      <div className='app__wrapper-content'>
        <p className='p__opensans'>la obeja estab a llorando en la orilla del arrollo sola apunto de</p>
        <p className='p__cormorant' style={{ color:'#DCCA87', margin: '2rem 0' }}>Opening Hours</p>
        <p className='p__opensans'>la obeja estab a llorando en la orilla del arrollo sola apunto de</p>
        <p className='p__opensans'>la obeja estab a llorando en la orilla del arrollo sola apunto de</p>
      </div>
      <button className='custom__button' style={{ marginTop: '2rem' }}>Visit us</button>
    </div>

    <div className='app__wrapper_img'>
      <img src={images.findus} alt="findus" />
    </div>
  </div>
);

export default FindUs;
