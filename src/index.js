import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Console logs
console.log('[DEBUG] Application starting');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('[DEBUG] Application rendered');
