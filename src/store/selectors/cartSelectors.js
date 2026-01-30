// Excessive re-renders due to selectors
// Selectors not memoized
// Complex calculations on every render

export const selectCartItems = (state) => {
  // No memoization - creates new array reference on every call
  console.log('[DEBUG] selectCartItems called');
  return state.cart.items;
};

export const selectCartTotal = (state) => {
  // Excessive re-renders - complex calculation on every render
  // No memoization
  console.log('[DEBUG] selectCartTotal called');
  return state.cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

export const selectCartItemCount = (state) => {
  // Excessive re-renders - calculation on every render
  // No memoization
  console.log('[DEBUG] selectCartItemCount called');
  return state.cart.items.reduce((count, item) => {
    return count + item.quantity;
  }, 0);
};

export const selectCartItemsByCategory = (state, category) => {
  // Excessive re-renders - filter creates new array on every call
  // No memoization
  console.log('[DEBUG] selectCartItemsByCategory called');
  return state.cart.items.filter(item => item.category === category);
};

export const selectExpensiveItems = (state) => {
  // Excessive re-renders - filter and map on every call
  // No memoization
  console.log('[DEBUG] selectExpensiveItems called');
  return state.cart.items
    .filter(item => item.price > 100)
    .map(item => ({ ...item, isExpensive: true }));
};

