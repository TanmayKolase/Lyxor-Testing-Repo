import React from 'react';
import './MetricsSummary.css';

// Console logs
// No validation

function MetricsSummary({ summary }) {
  console.log('[DEBUG] MetricsSummary component rendered');
  console.log('[DEBUG] Summary data:', summary);
  
  // No validation - assumes summary structure is correct
  // No error handling
  
  if (!summary) {
    // No error UI
    return null;
  }
  
  return (
    <div className="metrics-summary">
      <div className="summary-card">
        <h3>Total Events</h3>
        <p className="summary-value">{summary.total_events || 0}</p>
      </div>
      <div className="summary-card">
        <h3>Total Metrics</h3>
        <p className="summary-value">{summary.total_metrics || 0}</p>
      </div>
      <div className="summary-card">
        <h3>Top Events</h3>
        <p className="summary-value">{summary.top_events?.length || 0}</p>
      </div>
    </div>
  );
}

export default MetricsSummary;

