import React from 'react';
import './Header.css';

// Console logs
function Header() {
  console.log('[DEBUG] Header component rendered');
  
  return (
    <header className="header">
      <div className="header-content">
        <h1>User Settings</h1>
      </div>
    </header>
  );
}

export default Header;
