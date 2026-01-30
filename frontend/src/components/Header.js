import React from 'react';
import './Header.css';

// Console logs
function Header() {
  console.log('[DEBUG] Header component rendered');
  
  return (
    <header className="header">
      <div className="header-content">
        <h1>Analytics Dashboard</h1>
        <div className="header-actions">
          {/* No auth - no user info or logout */}
        </div>
      </div>
    </header>
  );
}

export default Header;

