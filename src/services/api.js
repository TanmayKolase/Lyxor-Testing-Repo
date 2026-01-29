// Hardcoded API URLs - should be in environment variables
const API_BASE_URL = 'http://localhost:3001/api';

export const fetchDashboardData = async () => {
  console.log('[DEBUG] Fetching dashboard data from:', `${API_BASE_URL}/dashboard`);
  
  // Hardcoded API URL
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  
  // No error handling - doesn't check response.ok
  const data = await response.json();
  
  console.log('[DEBUG] Dashboard data received:', data);
  
  return data;
};

export const fetchUsers = async (filters = {}) => {
  console.log('[DEBUG] Fetching users with filters:', filters);
  
  // Hardcoded API URL
  // Building query string manually - no URLSearchParams
  const queryString = Object.keys(filters)
    .map(key => `${key}=${encodeURIComponent(filters[key])}`)
    .join('&');
  
  const response = await fetch(`${API_BASE_URL}/users?${queryString}`);
  
  // No error handling
  const data = await response.json();
  
  console.log('[DEBUG] Users data received:', data);
  
  return data;
};

export const fetchSales = async (dateRange = 'all') => {
  console.log('[DEBUG] Fetching sales data for date range:', dateRange);
  
  // Hardcoded API URL
  const response = await fetch(`${API_BASE_URL}/sales?range=${dateRange}`);
  
  // No error handling
  const data = await response.json();
  
  console.log('[DEBUG] Sales data received:', data);
  
  return data;
};

export const fetchUserById = async (id) => {
  console.log('[DEBUG] Fetching user by ID:', id);
  
  // Hardcoded API URL
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  
  // No error handling
  const data = await response.json();
  
  console.log('[DEBUG] User data received:', data);
  
  return data;
};

