// src/components/ReservationPage.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa estilos para el calendario
import './Reservacion.css';
import { Navbar } from '../components';
import Swal from 'sweetalert2';

export const ReservationPage = () => {
  useEffect(() => {
    document.title = 'World Plate - Reservación';
  }, []);

  const [date, setDate] = useState(new Date());
  const [people, setPeople] = useState('2 personas');
  const [time, setTime] = useState('12:00');
  const [name, setName] = useState(''); // Estado para el nombre
  const [email, setEmail] = useState(''); // Estado para el email
  const [phone, setPhone] = useState(''); // Estado para el teléfono

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

  const handleBook = () => {
    if (!name || !email || !phone) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos antes de reservar.',
        icon: 'error',
      });
      return;
    }

    Swal.fire({
      title: 'Reservación confirmada',
      text: `Reservación confirmada para ${people} a las ${time} de ${date.toDateString()}\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}`,
      icon: 'success',
    });
  };

  return (
    <div>
      <Navbar />
      <div className="father">
        <div className="container">
          <div className="content">
            <h1 className="title">Reserva una mesa</h1>

            <Calendar onChange={handleDateChange} value={date} className="calendar" />

            <div className="inputContainer">
              <div className="inputWrapper">
                <label htmlFor="name">Nombre:</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className="input"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="email">Correo electrónico:</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="input"
                  placeholder="Tu correo electrónico"
                />
              </div>
              <div className="inputWrapper">
                <label htmlFor="phone">Teléfono:</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="input"
                  placeholder="Tu número de teléfono"
                />
              </div>
            </div>

            <div className="selectContainer">
              <div className="selectWrapper">
                <label htmlFor="people">Número de personas:</label>
                <select id="people" value={people} onChange={handlePeopleChange} className="select">
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
                <select id="time" value={time} onChange={handleTimeChange} className="select">
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
              <button onClick={handleBook} className="bookButton">Reservar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
