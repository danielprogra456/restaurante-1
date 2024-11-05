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
      <h2>Postres</h2>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <span className="menu-name">{item.name}</span>
            <span className="menu-price">{item.price}</span>
          </li>
        ))}
      </ul>

      <div className="link-container">
        <Link to="/reservacion" className='Link-Carta' target="_blank">Reservar</Link>
      </div>

    </div>
  );
};

export default CartaPostre;