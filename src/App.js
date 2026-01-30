import React from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import './App.css';

function App() {
  // Excessive re-renders - selector called on every render
  const cartItems = useSelector(state => state.cart.items);
  const cartTotal = useSelector(state => {
    // Excessive re-renders - complex calculation on every render
    return state.cart.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  });

  console.log('[DEBUG] App rendered, cart items:', cartItems.length);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Shopping Cart</h1>
        <div className="cart-summary">
          <span>Items: {cartItems.length}</span>
          <span>Total: ${cartTotal.toFixed(2)}</span>
        </div>
      </header>
      <main className="app-main">
        <ProductList />
        <Cart />
      </main>
    </div>
  );
}

export default App;
