import React from 'react';

import { Navbar, Meal } from '../components';
import { images } from '../constants';
import { Footer } from '../container';
import { useEffect } from 'react';

export const Menu = () => {

  useEffect(() => {
    document.title = 'World Plate - Menú';
  }, []);

  return(
    <div style={{ background: 'black', marginTop: "60px", paddingTop: "20px"}} >
      <Navbar />

      <h1 className='headtext__cormorant2'>Aperitivos</h1>
      
      <Meal 
        title="Ensalada de Espinacas" 
        description="Una fresca combinación de espinacas con un toque dulce y cremoso." 
        ingredients="Espinacas frescas, nueces caramelizadas, queso de cabra, vinagreta de miel" 
        price="€80" 
        image={images.espinaca}
      />

      <Meal 
        title="Berenjenas a la Parrilla" 
        description="Berenjenas asadas con una deliciosa salsa de tahini y hierbas aromáticas." 
        ingredients="Berenjenas, tahini, ajo, limón, hierbas frescas" 
        price="€80" 
        image={images.berenjena}
      />

      <Meal 
        title="Tortilla de Patatas" 
        description="Clásica tortilla española, suave y jugosa, con cebolla y pimientos." 
        ingredients="Huevos, patatas, cebolla, pimientos rojos" 
        price="€90" 
        image={images.patata}
      />

      <Meal 
        title="Tartar de Salmón" 
        description="Salmón fresco y suave, con aguacate y un toque cítrico." 
        ingredients="Salmón, aguacate, cebolla morada, lima" 
        price="€100" 
        image={images.salmones}
      />

      <Meal 
        title="Queso Manchego" 
        description="Queso curado de oveja acompañado de mermelada de tomate y nueces." 
        ingredients="Queso manchego, mermelada de tomate, nueces" 
        price="€100" 
        image={images.queso}
      />

      <h1 className='headtext__cormorant2'>Platillos principales</h1>

      <Meal 
        title="Pescado a la Sal" 
        description="Filete de pescado al horno, cocido a la perfección con hierbas y limón." 
        ingredients="Pescado fresco, sal, hierbas, limón" 
        price="€150" 
        image={images.pescado}
      />

      <Meal 
        title="Rissotto de Setas" 
        description="Cremoso risotto enriquecido con setas de temporada y un toque de parmesano." 
        ingredients="Arroz arborio, setas, caldo de verduras, parmesano, cebolla" 
        price="€110" 
        image={images.hongos}
      />

      <Meal 
        title="Pollo al Limón" 
        description="Pechuga de pollo marinada, jugosa y aromática, acompañada de puré de patatas." 
        ingredients="Pechuga de pollo, limón, hierbas, puré de patatas" 
        price="€80" 
        image={images.pollo}
      />

      <Meal 
        title="Costillas a la Barbacoa" 
        description="Costillas tiernas, glaseadas con nuestra salsa barbacoa casera." 
        ingredients="Costillas de cerdo, salsa barbacoa, especias" 
        price="€90" 
        image={images.bbq}
      />

      <Meal 
        title="Lentejas Estofadas" 
        description="Lentejas cocidas a fuego lento con verduras y especias, servidas con arroz." 
        ingredients="Lentejas, zanahoria, cebolla, especias, arroz" 
        price="€80" 
        image={images.lentejas}
      />

      <h1 className='headtext__cormorant2'>Postres</h1>

      <Meal 
        title="Flan de Caramelo" 
        description="Un clásico postre suave y cremoso con un toque de caramelo." 
        ingredients="Huevos, leche, azúcar, caramelo" 
        price="€60" 
        image={images.flan}
      />

      <Meal 
        title="Tarta de Queso" 
        description="Deliciosa tarta cremosa con base de galleta y coulis de fruta." 
        ingredients="Queso crema, galletas, mantequilla, azúcar, fruta" 
        price="€60" 
        image={images.tarta}
      />

      <Meal 
        title="Mousse de Chocolate con Frutos Rojos" 
        description="Suave mousse de chocolate, decorada con fresas y frambuesas." 
        ingredients="Chocolate, nata, huevos, frutos rojos" 
        price="€60" 
        image={images.mousse}
      />

      <Meal 
        title="Tarta de Manzana Casera" 
        description="Tarta de manzana tibia con canela y masa quebrada." 
        ingredients="Manzanas, azúcar, canela, masa quebrada" 
        price="€60" 
        image={images.manzana}
      />

      <Meal 
        title="Helado Artesanal de Vainilla" 
        description="Helado cremoso y suave, hecho con ingredientes naturales." 
        ingredients="Leche, nata, azúcar, vainilla" 
        price="€60" 
        image={images.ice}
      />
    <Footer />
    </div>
    )
  }