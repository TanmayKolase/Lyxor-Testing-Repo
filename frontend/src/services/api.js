import axios from 'axios';

// Hardcoded API URL
// Console logs
// No error handling

// Hardcoded API URL - should be in environment variables
const API_BASE_URL = 'http://localhost:8000/api';

console.log('[DEBUG] API service initialized');
console.log('[DEBUG] API Base URL:', API_BASE_URL);

// No error handling
// Console logs
export const getChartData = async (metricType) => {
  console.log('[DEBUG] Fetching chart data for metric:', metricType);
  
  // No error handling
  // Hardcoded URL
  const response = await axios.get(`${API_BASE_URL}/dashboard/chart-data`, {
    params: {
      metric_type: metricType
    }
  });
  
  console.log('[DEBUG] Chart data received:', response.data);
  
  return response.data;
};

// No error handling
// Console logs
export const getDashboardSummary = async () => {
  console.log('[DEBUG] Fetching dashboard summary');
  
  // No error handling
  // Hardcoded URL
  const response = await axios.get(`${API_BASE_URL}/dashboard/summary`);
  
  console.log('[DEBUG] Dashboard summary received:', response.data);
  
  return response.data;
};

// No error handling
// Console logs
export const getMetrics = async () => {
  console.log('[DEBUG] Fetching metrics');
  
  // No error handling
  // Hardcoded URL
  const response = await axios.get(`${API_BASE_URL}/dashboard/metrics`);
  
  console.log('[DEBUG] Metrics received:', response.data);
  
  return response.data;
};

// No error handling
// Console logs
export const createEvent = async (eventData) => {
  console.log('[DEBUG] Creating event:', eventData);
  
  // No validation of eventData
  // No error handling
  // Hardcoded URL
  const response = await axios.post(`${API_BASE_URL}/analytics/events`, eventData);
  
  console.log('[DEBUG] Event created:', response.data);
  
  return response.data;
};

