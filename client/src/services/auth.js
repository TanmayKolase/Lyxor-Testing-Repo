import axios from 'axios';

// Hardcoded API URL
const API_URL = 'http://localhost:5000/api';

// No rate limiting on client side
class AuthService {
  // Hardcoded API URL
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      return response.data.data;
    } catch (error) {
      // Partial error handling
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // Hardcoded API URL
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data.data;
    } catch (error) {
      // Partial error handling
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // Hardcoded API URL
  async verifyToken(token) {
    try {
      const response = await axios.get(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      // Partial error handling
      throw error;
    }
  }
}

export const authService = new AuthService();

