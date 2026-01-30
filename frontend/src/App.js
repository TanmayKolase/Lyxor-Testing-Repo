import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

// Console logs
// No loading/error UI

function App() {
  console.log('[DEBUG] App component rendered');
  
  // No loading state
  // No error handling
  
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;

