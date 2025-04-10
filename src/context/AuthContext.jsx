import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionTimeoutId, setSessionTimeoutId] = useState(null);

  // Function to verify token
  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        // Token is invalid or expired
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Auth verification error:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  // Reset session timeout
  const resetSessionTimeout = () => {
    // Clear existing timeout
    if (sessionTimeoutId) {
      clearTimeout(sessionTimeoutId);
    }
    
    // Only set timeout if user is authenticated
    if (isAuthenticated) {
      // 5 minutes in milliseconds
      const SESSION_TIMEOUT = 5 * 60 * 1000;
      
      const timeoutId = setTimeout(() => {
        console.log('Session timeout - logging out');
        logout();
        alert('Su sesión ha expirado por inactividad.');
      }, SESSION_TIMEOUT);
      
      setSessionTimeoutId(timeoutId);
    }
  };

  // Check authentication on initial load
  useEffect(() => {
    verifyToken();
    
    // Cleanup function
    return () => {
      if (sessionTimeoutId) {
        clearTimeout(sessionTimeoutId);
      }
    };
  }, []);

  // Set up activity listeners for session timeout
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Reset timeout on user activity
    const handleActivity = () => {
      resetSessionTimeout();
    };
    
    // Events to track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });
    
    // Initialize timeout
    resetSessionTimeout();
    
    // Cleanup function
    return () => {
      if (sessionTimeoutId) {
        clearTimeout(sessionTimeoutId);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [isAuthenticated]);

  // Handle page unload/close
  useEffect(() => {
    const handleUnload = () => {
      // We don't log out on page refresh/close anymore
      // This was causing issues with navigation
      // Instead, we rely on token expiration
    };
    
    window.addEventListener('beforeunload', handleUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        resetSessionTimeout();
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Error de conexión' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    if (sessionTimeoutId) {
      clearTimeout(sessionTimeoutId);
      setSessionTimeoutId(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, verifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);