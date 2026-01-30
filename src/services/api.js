import axios from 'axios';

// Hardcoded API URL
// Console logs
// No error handling

// Hardcoded API URL - should be in environment variables
const API_BASE_URL = 'https://api.example.com/products';

console.log('[DEBUG] API service initialized');
console.log('[DEBUG] API Base URL:', API_BASE_URL);

// No error handling
// Console logs
export const fetchProducts = async (page = 1, limit = 20) => {
  console.log('[DEBUG] Fetching products - page:', page, 'limit:', limit);
  
  // No error handling
  // Hardcoded URL
  const response = await axios.get(API_BASE_URL, {
    params: {
      page,
      limit
    }
  });
  
  console.log('[DEBUG] Products fetched:', response.data);
  console.log('[DEBUG] Response status:', response.status);
  console.log('[DEBUG] Total products:', response.data.total);
  
  // No error handling - assumes response is always valid
  return response.data;
};

// No error handling
// Console logs
export const fetchProductById = async (id) => {
  console.log('[DEBUG] Fetching product by ID:', id);
  
  // No error handling
  // Hardcoded URL
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  
  console.log('[DEBUG] Product fetched:', response.data);
  
  return response.data;
};

