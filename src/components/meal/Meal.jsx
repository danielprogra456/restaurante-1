import React from 'react';
import './Meal.css';

const Meal = ({ title, description, ingredients, price, image }) => (
  <div className='meal-container'>
    <div className='app__wrapper2 section__padding2' id='contact'>
      <div className='app__wrapper_info2'>
        <h1 className='headtext__cormorant' style={{ marginBottom: '3rem' }}>{title}</h1> 
        <div>
          <p className='p__opensans'>{description}</p> 
          <p className='p__cormorant' style={{ color: '#DCCA87', margin: '2rem 0' }}>Ingredientes:</p>
          <p className='p__opensans'>{ingredients}</p> 
        </div>
        <p className='p__cormorant' style={{ color: '#DCCA87', margin: '2rem 0' }}>Precio: {price}</p> 
      </div>

      <div className='app__wrapper_img2'>
        <img src={image} alt="findus" /> 
      </div>
    </div>
  </div>
);

export default Meal;