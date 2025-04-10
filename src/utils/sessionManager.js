import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Session timeout in milliseconds (5 minutes)
const SESSION_TIMEOUT = 5 * 60 * 1000;

export const useSessionTimeout = () => {
  const { logout } = useAuth();
  
  useEffect(() => {
    let timeoutId;
    
    // Function to reset the timeout
    const resetTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        // Log the user out after timeout
        logout();
        alert('Su sesión ha expirado por inactividad.');
      }, SESSION_TIMEOUT);
    };
    
    // Events to track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimeout);
    });
    
    // Initialize the timeout
    resetTimeout();
    
    // Cleanup function
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      events.forEach(event => {
        document.removeEventListener(event, resetTimeout);
      });
    };
  }, [logout]);
};

// Function to handle page unload/close
export const setupPageUnloadLogout = () => {
  const { isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const handleUnload = () => {
      // Clear token from localStorage
      localStorage.removeItem('token');
    };
    
    window.addEventListener('beforeunload', handleUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [isAuthenticated, logout]);
};