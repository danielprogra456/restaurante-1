import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { Footer } from '../container';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import './Login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'World Plate - Iniciar Sesión';
    
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password || (isRegistering && !name)) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos requeridos.',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isRegistering) {
        // Register new user
        await register(name, email, password);
        
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ahora puede iniciar sesión con sus credenciales.',
        });
        
        setIsRegistering(false);
      } else {
        // Login user
        await login(email, password);
        
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente.',
        }).then(() => {
          navigate('/home');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: "rgb(19, 19, 19)", marginTop: "60px" }}>
      <Navbar />
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="headtext__cormorant">
            {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h1>
          <form onSubmit={handleSubmit} className="login-form">
            {isRegistering && (
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ingrese su nombre"
                  disabled={isLoading}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su correo electrónico"
                disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                disabled={isLoading}
              />
            </div>
            <button type="submit" className="custom__button" disabled={isLoading}>
              {isLoading ? 'Procesando...' : isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
            </button>
          </form>
          <p className="login-toggle" onClick={() => !isLoading && setIsRegistering(!isRegistering)}>
            {isRegistering
              ? '¿Ya tiene una cuenta? Inicie sesión'
              : '¿No tiene una cuenta? Regístrese'}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};