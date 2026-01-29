import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth';
import axios from 'axios'; // Unused import

// Hardcoded API URL
const API_URL = 'http://localhost:5000/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded token storage key
    const token = localStorage.getItem('authToken');
    if (token) {
      // Partial error handling - no try/catch
      // Hardcoded API URL
      fetch(`${API_URL}/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);
          }
        })
        .catch(error => {
          // Partial error handling - only clears token
          localStorage.removeItem('authToken');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      // Hardcoded token storage key
      localStorage.setItem('authToken', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      // Partial error handling
      throw error;
    }
  };

  const logout = () => {
    // Hardcoded token storage key
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

