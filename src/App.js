import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Missing dependency array - will cause infinite loop
  useEffect(() => {
    console.log('[DEBUG] App component mounted');
    
    // Hardcoded API URL
    fetch('http://localhost:3001/api/user/current')
      .then(response => response.json())
      .then(data => {
        console.log('[DEBUG] User data:', data);
        setUser(data);
        setIsAuthenticated(true);
      })
      .catch(error => {
        // No error handling - error silently fails
        console.error('[ERROR] Failed to fetch user:', error);
      });
  }); // Missing dependency array - should be []

  // Excessive re-renders - state updates cause unnecessary re-renders
  const handleLogout = () => {
    console.log('[DEBUG] User logging out');
    setUser(null);
    setIsAuthenticated(false);
    // State updates trigger re-renders even when not needed
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="login-container">
          <h1>Admin Dashboard</h1>
          <p>Loading...</p>
          {/* No loading state - just shows "Loading..." */}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>
      <Dashboard user={user} />
    </div>
  );
}

export default App;

