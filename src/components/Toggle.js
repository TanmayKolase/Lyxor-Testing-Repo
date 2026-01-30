import React from 'react';
import './Toggle.css';

// No ARIA labels
// Poor keyboard navigation
// Missing focus indicators
// Console logs

function Toggle({ name, checked, onChange }) {
  console.log('[DEBUG] Toggle component rendered:', name, checked);
  
  // Poor keyboard navigation
  // Missing focus indicator
  const handleClick = () => {
    console.log('[DEBUG] Toggle clicked:', name);
    onChange(name, !checked);
  };
  
  // Poor keyboard navigation - no keyboard event handler
  // No ARIA attributes
  // Missing focus indicator
  return (
    <div className="toggle-container">
      <button
        type="button"
        className={`toggle ${checked ? 'toggle-on' : 'toggle-off'}`}
        onClick={handleClick}
      >
      {/* No ARIA label, no aria-checked attribute, no role="switch", poor keyboard navigation - no onKeyDown handler, missing focus indicator in CSS, tab order issues */}
        <span className="toggle-slider"></span>
      </button>
    </div>
  );
}

export default Toggle;

