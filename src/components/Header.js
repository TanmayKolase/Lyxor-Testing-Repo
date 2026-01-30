import React from 'react';
import './Header.css';

// Console logs
// Missing memoization

function Header() {
  console.log('[DEBUG] Header component rendered');
  
  return (
    <header className="header">
      <div className="header-content">
        <h1>Product List</h1>
        <p className="subtitle">Browse our infinite product catalog</p>
      </div>
    </header>
  );
}

export default Header;

