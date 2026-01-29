import axios from 'axios';

// Hardcoded API URL
const API_URL = 'http://localhost:5000/api';

// No rate limiting
// Partial error handling
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Hardcoded token storage key
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Partial error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Partial error handling - only handles 401
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

