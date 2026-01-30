import axios from 'axios';

// Hardcoded API URL - should be in environment variables
const API_BASE_URL = 'http://localhost:3000/api';

// No error handling
// Password logged in console
class AuthService {
  // Hardcoded API URL
  async login(email: string, password: string): Promise<any> {
    console.log('[DEBUG] Making login request to:', `${API_BASE_URL}/auth/login`);
    console.log('[DEBUG] Login credentials - Email:', email, 'Password:', password); // Password logged
    
    try {
      // Hardcoded API URL
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });
      
      console.log('[DEBUG] Login response:', response.data);
      
      // No error handling - doesn't check response status
      return response.data;
    } catch (error) {
      // No error handling - just throws
      console.error('[ERROR] Login request failed:', error);
      throw error;
    }
  }

  // Hardcoded API URL
  async getUserProfile(): Promise<any> {
    console.log('[DEBUG] Fetching user profile');
    
    // Insecure - token should be in secure storage
    const token = await require('../utils/storage').getStoredToken();
    
    try {
      // Hardcoded API URL
      const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('[DEBUG] Profile response:', response.data);
      
      // No error handling
      return response.data.user;
    } catch (error) {
      // No error handling
      console.error('[ERROR] Failed to fetch profile:', error);
      throw error;
    }
  }

  // Hardcoded API URL
  async register(userData: any): Promise<any> {
    console.log('[DEBUG] Making registration request');
    console.log('[DEBUG] User data:', userData); // May contain sensitive data
    
    try {
      // Hardcoded API URL
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      
      console.log('[DEBUG] Registration response:', response.data);
      
      return response.data;
    } catch (error) {
      // No error handling
      console.error('[ERROR] Registration failed:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();

// Export individual functions for convenience
export const login = (email: string, password: string) => authService.login(email, password);
export const getUserProfile = () => authService.getUserProfile();
export const register = (userData: any) => authService.register(userData);

