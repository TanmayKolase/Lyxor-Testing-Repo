import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART,
  LOAD_CART
} from '../actions/types';

const initialState = {
  items: [],
  loading: false,
  error: null
};

// Redux state mutation
// Direct state mutation instead of returning new state
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // State mutation - directly modifying state
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // State mutation - directly modifying item
        existingItem.quantity += action.payload.quantity || 1;
        return state; // Returning mutated state
      } else {
        // State mutation - directly pushing to array
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1
        });
        return state; // Returning mutated state
      }

    case REMOVE_FROM_CART:
      // State mutation - directly modifying array
      state.items = state.items.filter(item => item.id !== action.payload);
      return state; // Returning mutated state

    case UPDATE_QUANTITY:
      // State mutation - directly modifying item
      // No validation for quantity (allow negative)
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity; // No validation - can be negative
        return state; // Returning mutated state
      }
      return state;

    case CLEAR_CART:
      // State mutation - directly modifying array
      state.items = [];
      return state; // Returning mutated state

    case LOAD_CART:
      // State mutation - directly assigning
      state.items = action.payload || [];
      return state; // Returning mutated state

    default:
      return state;
  }
};

export default cartReducer;

