import React from 'react';
import './CartaPrincipal.css';

const menuItems = [
  {
    name: 'Pescado a la Sal: Filete de pescado al horno con hierbas y limón',
    price: '€150'
  },
  {
    name: 'Rissotto de Setas: Cremoso risotto con setas de temporada y parmesano',
    price: '€110'
  },
  {
    name: 'Pollo al Limón: Pechuga de pollo mar marinada con hierbas y limón, acompañada de puré de patatas',
    price: '€80'
  },
  {
    name: 'Costillas a la Barbacoa: Costillas tiernas con salsa barbacoa casera',
    price: '€90'
  },
  {
    name: 'Lentejas Estofadas: Lentejas cocidas con verduras y especias, servidas con arroz',
    price: '€80'
  }
];

const CartaPrincipal = () => {
  return (
    <div className="menu-container ">
      <h2>Platillos principales</h2>
      <ul className="menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <span className="menu-name">{item.name}</span>
            <span className="menu-price">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartaPrincipal;