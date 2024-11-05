import React from 'react';

import { Navbar, Meal } from '../components';
import { CartaConjunto, CartaPostre, CartaPrincipal, Footer } from '../container';
import { useEffect } from 'react';

export const Carta = () => {
  useEffect(() => {
    document.title = 'World Planet - Carta';
  }, []);

  return(
  <div style={{ background: '#F7F6F5', marginTop: "60px", paddingTop: "20px" }}>
    <Navbar />
    <CartaConjunto/>
    <CartaPrincipal/>
    <CartaPostre/>
    <Footer />
  </div>
  )
}