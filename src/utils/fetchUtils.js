/**
 * Utility functions for API requests with better error handling
 */

// Base API URL
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Makes an API request with proper error handling
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options
 * @returns {Promise} - Response data or error
 */
export const fetchApi = async (endpoint, options = {}) => {
  try {
    // Add authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      };
    }

    // Set default headers if not provided
    if (!options.headers) {
      options.headers = {
        'Content-Type': 'application/json'
      };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    // Parse response based on content type
    let data;
    if (isJson) {
      data = await response.json();
    } else {
      // If not JSON, get text and create a user-friendly error
      const text = await response.text();
      throw new Error('El servidor no respondió en el formato esperado');
    }
    
    // Check if response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(data.message || 'Ha ocurrido un error en el servidor');
    }
    
    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor. Verifique su conexión a internet.');
    }
    
    // Handle JSON parse errors
    if (error.name === 'SyntaxError' && error.message.includes('Unexpected token')) {
      throw new Error('El servidor respondió con un formato incorrecto');
    }
    
    // Rethrow the error with the message
    throw error;
  }
};

/**
 * Shorthand for GET requests
 */
export const get = (endpoint) => fetchApi(endpoint, { method: 'GET' });

/**
 * Shorthand for POST requests
 */
export const post = (endpoint, data) => fetchApi(endpoint, {
  method: 'POST',
  body: JSON.stringify(data)
});

/**
 * Shorthand for PUT requests
 */
export const put = (endpoint, data) => fetchApi(endpoint, {
  method: 'PUT',
  body: JSON.stringify(data)
});

/**
 * Shorthand for DELETE requests
 */
export const del = (endpoint) => fetchApi(endpoint, { method: 'DELETE' });