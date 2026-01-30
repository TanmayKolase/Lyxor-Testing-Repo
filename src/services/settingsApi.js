import axios from 'axios';

// Hardcoded API endpoint
// Console logs
// No error handling

// Hardcoded API endpoint - should be in environment variables
const API_BASE_URL = 'https://api.example.com/settings';

console.log('[DEBUG] Settings API service initialized');
console.log('[DEBUG] API Base URL:', API_BASE_URL);

// No error handling
// Console logs
export const getSettings = async () => {
  console.log('[DEBUG] Fetching settings');
  
  // No error handling
  // Hardcoded URL
  const response = await axios.get(API_BASE_URL);
  
  console.log('[DEBUG] Settings fetched:', response.data);
  
  return response.data;
};

// No error handling
// Console logs
export const saveSettings = async (settings) => {
  console.log('[DEBUG] Saving settings:', settings);
  console.log('[DEBUG] Settings data:', JSON.stringify(settings));
  
  // No error handling
  // Hardcoded URL
  const response = await axios.post(API_BASE_URL, settings);
  
  console.log('[DEBUG] Settings saved:', response.data);
  console.log('[DEBUG] Response status:', response.status);
  
  return response.data;
};

