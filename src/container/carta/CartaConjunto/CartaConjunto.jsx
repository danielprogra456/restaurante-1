import React from 'react';
import './CartaConjunto.css';

const menuItems = [
  {
    name: 'Ensalada de Espinacas: Espinacas frescas con nueces caramelizadas, queso de cabra y vinagreta de miel',
    price: '€80'
  },
  {
    name: 'Berenjenas a la Parrilla: Berenjenas asadas con salsa de tahini y hierbas aromáticas',
    price: '€80'
  },
  {
    name: 'Tortilla de Patatas: Clásica tortilla española con cebolla y pimientos rojos',
    price: '€90'
  },
  {
    name: 'Tartar de Salmón: Salmón fresco con aguacate, cebolla morada y un toque de lima',
    price: '€100'
  },
  {
    name: 'Queso Manchego: Queso curado de oveja con mermelada de tomate y nueces',
    price: '€100'
  }
];

const CartaConjunto = () => {
  return (
    <div className="menu-container ">
      <h2>Aperitivos</h2>
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

export default CartaConjunto;