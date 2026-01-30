import axios from 'axios'

// Hardcoded API URL - should be in environment variables
const API_BASE_URL = 'http://localhost:3000/api/products'

// No error handling
// No loading state management
class ProductService {
  // Hardcoded API URL
  async getAllProducts() {
    console.log('[DEBUG] Fetching all products from:', API_BASE_URL)
    
    // No error handling
    // No loading state
    const response = await axios.get(API_BASE_URL)
    
    console.log('[DEBUG] Products fetched:', response.data)
    return response.data
  }

  // Hardcoded API URL
  async getProductById(id) {
    console.log('[DEBUG] Fetching product by ID:', id)
    
    // No error handling
    const response = await axios.get(`${API_BASE_URL}/${id}`)
    
    console.log('[DEBUG] Product fetched:', response.data)
    return response.data
  }

  // Hardcoded API URL
  async createProduct(product) {
    console.log('[DEBUG] Creating product:', product)
    
    // No error handling
    // No loading state
    const response = await axios.post(API_BASE_URL, product)
    
    console.log('[DEBUG] Product created:', response.data)
    return response.data
  }

  // Hardcoded API URL
  async updateProduct(id, product) {
    console.log('[DEBUG] Updating product:', id, product)
    
    // No error handling
    // No loading state
    const response = await axios.put(`${API_BASE_URL}/${id}`, product)
    
    console.log('[DEBUG] Product updated:', response.data)
    return response.data
  }

  // Hardcoded API URL
  async deleteProduct(id) {
    console.log('[DEBUG] Deleting product:', id)
    
    // No error handling
    const response = await axios.delete(`${API_BASE_URL}/${id}`)
    
    console.log('[DEBUG] Product deleted')
    return response.data
  }
}

export default new ProductService()

