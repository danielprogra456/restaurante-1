// src/components/ReservationPage.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa estilos para el calendario
import './Reservacion.css'
import { Navbar } from '../components';

import Swal from 'sweetalert2'
import { useEffect } from 'react';

export const ReservationPage = () => {

  useEffect(() => {
    document.title = 'World Plate - Reservación';
  }, []);

  const [date, setDate] = useState(new Date());  // Estado para la fecha
  const [people, setPeople] = useState('2 personas'); // Estado para el número de personas
  const [time, setTime] = useState('12:00');  // Estado para la hora

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handlePeopleChange = (event) => {
    setPeople(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleBook = () => {
    Swal.fire({
      title: 'Reservación confirmada',
      text: `Reservacion confirmada para ${people} a las ${time} de ${date.toDateString()}`,
      icon: 'success'
    });
  };

  // const handleWaitingList = () => {
  //   alert(`Added to the waiting list for ${people} at ${time} on ${date.toDateString()}`);
  // };

  return (
    <div>
    <Navbar/>
    <div className='father'>
        <div className='container'>
            <div className='content'>
                <h1 className='title'>Reserva una mesa</h1>

                <Calendar onChange={handleDateChange} value={date} className='calendar' />

                <div className='selectContainer'>
                    <div className='selectWrapper'>
                        <label htmlFor="people">Numbero de personas:</label>
                        <select id="people" value={people} onChange={handlePeopleChange} className='select'>
                            <option value="1 persona">1 persona</option>
                            <option value="2 personas">2 personas</option>
                            <option value="3 personas">3 personas</option>
                            <option value="4 personas">4 personas</option>
                            <option value="5 personas">5 personas</option>
                            <option value="6 personas">6 personas</option>
                        </select>
                    </div>
                    <div className='selectWrapper'>
                        <label htmlFor="time">Hora:</label>
                        <select id="time" value={time} onChange={handleTimeChange} className='select'>
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

                <div className='buttonContainer'>
                    <button onClick={handleBook} className='bookButton'>Reservar</button>
                    {/* <button onClick={handleWaitingList} className='waitingButton'>WAITING LIST</button> */}
                </div>

                {/* <p className='terms'>
                    Se requiere una tarjeta de crédito válida para garantizar su reserva. Cuatro días antes de su visita...
                </p> */}
            </div>
        </div>
    </div>
    </div>
  );
};