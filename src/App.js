import React from 'react';
import './App.css';
import SettingsPage from './components/SettingsPage';
import Header from './components/Header';

// Console logs
function App() {
  console.log('[DEBUG] App component rendered');
  
  return (
    <div className="App">
      <Header />
      <SettingsPage />
    </div>
  );
}

export default App;
