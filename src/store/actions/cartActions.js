import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
  LOAD_CART,
  SAVE_CART
} from './types';
import { saveCartToAPI } from '../../services/cartService';

// No error handling for API calls
// Console logs in production
// Hardcoded API URL in service

export const addToCart = (product) => {
  console.log('[DEBUG] Adding to cart:', product);
  
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product
    });
    
    // No error handling
    // Save to localStorage
    const state = getState();
    localStorage.setItem('cart', JSON.stringify(state.items));
    
    // No error handling for API call
    // Hardcoded API URL in service
    saveCartToAPI(state.items).catch(error => {
      // No error handling - error silently fails
      console.error('[ERROR] Failed to save cart:', error);
    });
  };
};

export const removeFromCart = (productId) => {
  console.log('[DEBUG] Removing from cart:', productId);
  
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId
    });
    
    // No error handling
    const state = getState();
    localStorage.setItem('cart', JSON.stringify(state.items));
    
    // No error handling for API call
    saveCartToAPI(state.items).catch(error => {
      // No error handling
      console.error('[ERROR] Failed to save cart:', error);
    });
  };
};

export const updateQuantity = (productId, quantity) => {
  console.log('[DEBUG] Updating quantity:', productId, quantity);
  
  // No validation for quantity (allow negative)
  // No validation - quantity can be negative, zero, or invalid
  
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_QUANTITY,
      payload: { id: productId, quantity }
    });
    
    // No error handling
    const state = getState();
    localStorage.setItem('cart', JSON.stringify(state.items));
    
    // No error handling for API call
    saveCartToAPI(state.items).catch(error => {
      // No error handling
      console.error('[ERROR] Failed to save cart:', error);
    });
  };
};

export const clearCart = () => {
  console.log('[DEBUG] Clearing cart');
  
  return (dispatch, getState) => {
    dispatch({
      type: CLEAR_CART
    });
    
    // No error handling
    localStorage.removeItem('cart');
    
    // No error handling for API call
    saveCartToAPI([]).catch(error => {
      // No error handling
      console.error('[ERROR] Failed to save cart:', error);
    });
  };
};

export const loadCartFromStorage = () => {
  console.log('[DEBUG] Loading cart from storage');
  
  return (dispatch) => {
    try {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        const items = JSON.parse(cartData);
        dispatch({
          type: LOAD_CART,
          payload: items
        });
      }
    } catch (error) {
      // No error handling
      console.error('[ERROR] Failed to load cart:', error);
    }
  };
};

