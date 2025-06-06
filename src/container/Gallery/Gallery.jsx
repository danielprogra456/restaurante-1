import React from 'react';
import { Link } from 'react-router-dom';

import { BsInstagram, BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { SubHeading } from '../../components';
import { images, data } from '../../constants';
import './Gallery.css';

const galleryImages = [images.gallery01, images.gallery02, images.gallery03, images.gallery04]

const Gallery = () => {

  const scrollRef = React.useRef(null)
  const scroll = (direction) => {
    const { current } = scrollRef;

    if(direction === "left"){
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }

  }

  return(
    <div className='app__gallery flex__center section__padding'>
      <div className='app__gallery-content'>
        <h1 className='headtext__cormorant'>Momentos Compartidos</h1>
        <p className='p__opensans2' style={{ color: '#AAA', marginTop: '2rem', marginBottom: '2rem', textAlign: 'justify' }} >
        Descubre nuestra galería de fotos, donde nuestros queridos clientes comparten sus momentos especiales disfrutando de nuestra comida. ¡Nos encanta ver cómo viven su experiencia en nuestro restaurante! Si has tomado alguna foto, no olvides etiquetarnos en Instagram para que podamos incluirla aquí.
        </p>
        <Link to="/reservacion" className='custom__button' target="_blank">Haz tu reservación</Link>
      </div>

      <div className='app__gallery-images'>
        <div className='app__gallery-images_container' ref={scrollRef}>
          {galleryImages.map((image,index) => (
            <div className='app__gallery-images_card flex__center' key={`gallery_image-${index + 1}`}>
              <img src={image} alt="gallery" />
              <BsInstagram className='gallery__image-icon'/>
            </div>
          ))}
        </div>

        <div className='app__gallery-images_arrows'>
          <BsArrowLeftShort className='gallery__arrow-icon' onClick={() => scroll('left') } />
          <BsArrowRightShort className='gallery__arrow-icon' onClick={() => scroll('right') } />
        </div>

      </div>

    </div>
  )
};

export default Gallery;
