import React from 'react';
import './Loading.css';

// No proper loading or skeleton UI
// Console logs

function Loading() {
  console.log('[DEBUG] Loading component rendered');
  
  // No skeleton UI - just a simple spinner
  // No proper loading state indication
  
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">Loading more products...</p>
    </div>
  );
}

export default Loading;

