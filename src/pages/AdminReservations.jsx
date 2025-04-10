import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { Footer } from '../container';
import { useAuth } from '../context/AuthContext';
import { get, put, del } from '../utils/fetchUtils';
import Swal from 'sweetalert2';
import './AdminReservations.css';

export const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'World Plate - Administrar Reservaciones';
    
    // Check if user is admin or staff
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'admin' && user?.role !== 'staff') {
      navigate('/home');
      return;
    }
    
    fetchReservations();
  }, [isAuthenticated, user, navigate]);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);
      const data = await get('/reservations');
      setReservations(data);
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudieron cargar las reservaciones'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    try {
      await put(`/reservations/${reservationId}/status`, { status: newStatus });
      
      // Update local state
      setReservations(reservations.map(reservation => 
        reservation._id === reservationId ? { ...reservation, status: newStatus } : reservation
      ));

      Swal.fire({
        icon: 'success',
        title: 'Estado actualizado',
        text: 'El estado de la reservación ha sido actualizado correctamente'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo actualizar el estado de la reservación'
      });
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      const result = await Swal.fire({
        title: '¿Está seguro?',
        text: "Esta acción no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await del(`/reservations/${reservationId}`);
        
        // Update local state
        setReservations(reservations.filter(reservation => reservation._id !== reservationId));

        Swal.fire(
          'Eliminado',
          'La reservación ha sido eliminada correctamente',
          'success'
        );
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'No se pudo eliminar la reservación'
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  if (isLoading) {
    return (
      <div style={{ background: "rgb(19, 19, 19)", marginTop: "60px" }}>
        <Navbar />
        <div className="admin-container">
          <h1 className="headtext__cormorant">Cargando...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: "rgb(19, 19, 19)", marginTop: "60px" }}>
        <Navbar />
        <div className="admin-container">
          <h1 className="headtext__cormorant">Error</h1>
          <p className="p__opensans">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ background: "rgb(19, 19, 19)", marginTop: "60px" }}>
      <Navbar />
      <div className="admin-container">
        <h1 className="headtext__cormorant">Administrar Reservaciones</h1>
        
        <div className="admin-section">
          <h2 className="admin-section-title">Reservaciones</h2>
          
          {reservations.length === 0 ? (
            <p className="p__opensans">No hay reservaciones disponibles.</p>
          ) : (
            <div className="reservations-grid">
              {reservations.map(reservation => (
                <div key={reservation._id} className="reservation-card">
                  <div className="reservation-header">
                    <h3>{reservation.name}</h3>
                    <span className={`status-badge status-${reservation.status}`}>
                      {reservation.status === 'pending' ? 'Pendiente' : 
                       reservation.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                    </span>
                  </div>
                  
                  <div className="reservation-details">
                    <div className="reservation-info">
                      <p><strong>Fecha:</strong> {formatDate(reservation.date)}</p>
                      <p><strong>Hora:</strong> {reservation.time}</p>
                      <p><strong>Personas:</strong> {reservation.guests}</p>
                      <p><strong>Email:</strong> {reservation.email}</p>
                      <p><strong>Teléfono:</strong> {reservation.phone}</p>
                    </div>
                    
                    {reservation.profileImage && (
                      <div className="profile-image-container">
                        <img 
                          src={reservation.profileImage} 
                          alt={`Foto de ${reservation.name}`} 
                          className="profile-image"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="reservation-actions">
                    <select 
                      value={reservation.status}
                      onChange={(e) => handleStatusChange(reservation._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmada</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                    
                    {user.role === 'admin' && (
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteReservation(reservation._id)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};