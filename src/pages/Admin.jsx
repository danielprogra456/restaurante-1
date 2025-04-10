import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { Footer } from '../container';
import Swal from 'sweetalert2';
import './Admin.css';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'World Plate - Admin';
    
    // Check if user is admin
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
      navigate('/home');
      return;
    }
    
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));

      Swal.fire({
        icon: 'success',
        title: 'Rol actualizado',
        text: 'El rol del usuario ha sido actualizado correctamente'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  };

  const handleDeleteUser = async (userId) => {
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
        const token = localStorage.getItem('token');
        
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        // Update local state
        setUsers(users.filter(user => user._id !== userId));

        Swal.fire(
          'Eliminado',
          'El usuario ha sido eliminado correctamente',
          'success'
        );
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
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
        <h1 className="headtext__cormorant">Panel de Administración</h1>
        
        <div className="admin-section">
          <h2 className="admin-section-title">Gestión de Usuarios</h2>
          
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="role-select"
                      >
                        <option value="user">Usuario</option>
                        <option value="staff">Personal</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        className="delete-button"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};