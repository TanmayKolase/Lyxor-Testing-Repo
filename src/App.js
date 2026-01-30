import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Header from './components/Header';

// Console logs
// Missing memoization

function App() {
  console.log('[DEBUG] App component rendered');
  
  // Missing memoization - App re-renders unnecessarily
  // No error boundary
  
  return (
    <div className="App">
      <Header />
      <ProductList />
    </div>
  );
}

export default App;

