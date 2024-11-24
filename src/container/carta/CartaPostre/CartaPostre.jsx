import React from 'react';
import '../CartaPrincipal/CartaPrincipal.css';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    name: 'Flan de Caramelo',
    price: '€60'
  },
  {
    name: 'Tarta de Queso',
    price: '€60'
  },
  {
    name: 'Mousse de Chocolate con Frutos Rojos',
    price: '€60'
  },
  {
    name: 'Tarta de Manzana Casera',
    price: '€60'
  },
  {
    name: 'Helado Artesanal de Vainilla',
    price: '€60'
  }
];

const CartaPostre = () => {
  return (
    <div className="menu-container ">
      <h2 className='carta_title'>Postres</h2>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item_aperitivo">
            <span className="menu-name_aperitivos">{item.name}</span>
            <span className="menu-price_aperitivos">{item.price}</span>
          </li>
        ))}
      </ul>

      <div className="link-container">
        <Link to="/reservacion" className='custom__button custom__button2' target="_blank">Reservar Mesa</Link>
      </div>

    </div>
  );
};

export default CartaPostre;