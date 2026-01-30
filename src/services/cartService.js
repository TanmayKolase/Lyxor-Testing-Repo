import axios from 'axios';

// Hardcoded API URL - should be in environment variables
const API_BASE_URL = 'http://localhost:3000/api/cart';

// No error handling for API calls
// Console logs in production

class CartService {
  // Hardcoded API URL
  async saveCart(cartItems) {
    console.log('[DEBUG] Saving cart to API:', API_BASE_URL);
    console.log('[DEBUG] Cart items:', cartItems);
    
    // No error handling
    // No timeout configuration
    // No retry logic
    const response = await axios.post(API_BASE_URL, { items: cartItems });
    
    console.log('[DEBUG] Cart saved successfully:', response.data);
    return response.data;
  }

  // Hardcoded API URL
  async loadCart() {
    console.log('[DEBUG] Loading cart from API:', API_BASE_URL);
    
    // No error handling
    const response = await axios.get(API_BASE_URL);
    
    console.log('[DEBUG] Cart loaded:', response.data);
    return response.data.items || [];
  }

  // Hardcoded API URL
  async syncCart(cartItems) {
    console.log('[DEBUG] Syncing cart:', cartItems);
    
    // No error handling
    const response = await axios.put(API_BASE_URL, { items: cartItems });
    
    console.log('[DEBUG] Cart synced:', response.data);
    return response.data;
  }
}

export default new CartService();

// Export individual functions
export const saveCartToAPI = (cartItems) => CartService.prototype.saveCart.call(new CartService(), cartItems);
export const loadCartFromAPI = () => CartService.prototype.loadCart.call(new CartService());
export const syncCartToAPI = (cartItems) => CartService.prototype.syncCart.call(new CartService(), cartItems);

