import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Reservacion.css';
import { Navbar } from '../components';
import { Footer } from '../container';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';
import { post } from '../utils/fetchUtils';

export const ReservationPage = () => {
  const [date, setDate] = useState(new Date());
  const [people, setPeople] = useState('2 personas');
  const [time, setTime] = useState('12:00');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'World Plate - Reservación';
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Inicio de sesión requerido',
        text: 'Debe iniciar sesión para realizar una reservación',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Ir a iniciar sesión',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        } else {
          navigate('/home');
        }
      });
    } else if (user) {
      // Pre-fill form with user data if available
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [isAuthenticated, user, navigate]);

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handlePeopleChange = (event) => {
    setPeople(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Convert image to Base64 for storage
      convertToBase64(file);
    }
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Remove the duplicate import statement here
  
  const handleBook = async () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Debe iniciar sesión para realizar una reservación',
        icon: 'error',
        confirmButtonText: 'Ir a iniciar sesión'
      }).then(() => {
        navigate('/login');
      });
      return;
    }
  
    if (!name || !email || !phone) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos obligatorios antes de reservar.',
        icon: 'error',
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      // Extract number of people from the string
      const guestsCount = parseInt(people.split(' ')[0]);
      
      // Add image compression before sending
      let compressedImage = profileImage;
      if (profileImage) {
        try {
          compressedImage = await compressImage(profileImage);
        } catch (err) {
          console.error("Error compressing image:", err);
          // Continue with original image if compression fails
        }
      }
      
      const reservationData = {
        name,
        email,
        phone,
        date,
        time,
        guests: guestsCount,
        profileImage: compressedImage || null,
        userId: user.id
      };
  
      // Use the utility function instead of fetch directly
      const data = await post('/reservations', reservationData);
      
      Swal.fire({
        title: 'Reservación confirmada',
        text: `Reservación confirmada para ${people} a las ${time} el ${date.toLocaleDateString()}`,
        icon: 'success',
      }).then(() => {
        navigate('/home');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Ha ocurrido un error al procesar su reservación',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add image compression function
  const compressImage = (base64Image, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      try {
        // Create an image element
        const img = new Image();
        img.src = base64Image;
        
        img.onload = () => {
          // Create canvas
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          
          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;
          
          // Draw image on canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Get compressed image as base64 string
          const compressedImage = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedImage);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image for compression'));
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  // If not authenticated, don't render the form (will redirect in useEffect)
  if (!isAuthenticated) {
    return (
      <div>
        <Navbar />
        <div className="father">
          <div className="container">
            <div className="content">
              <h1 className="title">Cargando...</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="father">
        <div className="container">
          <div className="content">
            <h1 className="title">Reserva una mesa</h1>

            <Calendar onChange={handleDateChange} value={date} className="calendar" minDate={new Date()} />

            <div className="inputContainer">
              <div className="inputWrapper">
                <label htmlFor="name">Nombre: <span className="required">*</span></label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="input"
                  placeholder="Tu nombre completo"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="email">Correo electrónico: <span className="required">*</span></label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="input"
                  placeholder="Tu correo electrónico"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="phone">Teléfono: <span className="required">*</span></label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="input"
                  placeholder="Tu número de teléfono"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="profileImage">Foto de perfil:</label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="input file-input"
                  disabled={isLoading}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Vista previa" />
                  </div>
                )}
              </div>
            </div>

            <div className="selectContainer">
              <div className="selectWrapper">
                <label htmlFor="people">Número de personas:</label>
                <select 
                  id="people" 
                  value={people} 
                  onChange={handlePeopleChange} 
                  className="select"
                  disabled={isLoading}
                >
                  <option value="1 persona">1 persona</option>
                  <option value="2 personas">2 personas</option>
                  <option value="3 personas">3 personas</option>
                  <option value="4 personas">4 personas</option>
                  <option value="5 personas">5 personas</option>
                  <option value="6 personas">6 personas</option>
                </select>
              </div>
              <div className="selectWrapper">
                <label htmlFor="time">Hora:</label>
                <select 
                  id="time" 
                  value={time} 
                  onChange={handleTimeChange} 
                  className="select"
                  disabled={isLoading}
                >
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="14:00">14:00</option>
                  <option value="14:30">14:30</option>
                  <option value="15:00">15:00</option>
                </select>
              </div>
            </div>

            <div className="buttonContainer">
              <button 
                onClick={handleBook} 
                className="bookButton"
                disabled={isLoading}
              >
                {isLoading ? 'Procesando...' : 'Reservar'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
