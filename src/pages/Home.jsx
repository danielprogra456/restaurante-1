import React from 'react';

import { AboutUs, Chef, FindUs, Footer, Gallery, Header } from '../container';
import { Navbar } from '../components';
import '../App.css';
import { useEffect } from 'react';

export const Home = () => {

  useEffect(() => {
    document.title = 'World Plate - Inicio';
  }, []);

  return(
    <div>
      <Navbar />
      <Header />
      <AboutUs />
      <Gallery />
      <Footer />
    </div>
  )
}