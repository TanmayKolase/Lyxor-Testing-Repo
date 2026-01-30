import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Chart from './Chart';
import MetricsSummary from './MetricsSummary';
import { getChartData, getDashboardSummary, getMetrics } from '../services/api';

// No loading/error UI
// Console logs
// No validation

function Dashboard() {
  const [chartData, setChartData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('events');
  
  // No loading state
  // No error state
  
  console.log('[DEBUG] Dashboard component rendered');
  console.log('[DEBUG] Selected metric:', selectedMetric);
  
  useEffect(() => {
    console.log('[DEBUG] Dashboard useEffect triggered');
    
    // No error handling
    // No loading state
    loadDashboardData();
  }, [selectedMetric]);
  
  // No validation
  // No error handling
  async function loadDashboardData() {
    console.log('[DEBUG] Loading dashboard data');
    
    try {
      // No error handling
      // No loading state
      const [chart, summaryData, metricsData] = await Promise.all([
        getChartData(selectedMetric),
        getDashboardSummary(),
        getMetrics()
      ]);
      
      console.log('[DEBUG] Dashboard data loaded:', { chart, summaryData, metricsData });
      
      setChartData(chart);
      setSummary(summaryData);
      setMetrics(metricsData);
    } catch (error) {
      // No error UI - error silently fails
      console.error('[ERROR] Failed to load dashboard data:', error);
    }
  }
  
  // No validation
  function handleMetricChange(event) {
    console.log('[DEBUG] Metric changed:', event.target.value);
    
    // No validation - accepts any value
    setSelectedMetric(event.target.value);
  }
  
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-controls">
          <label>
            Metric Type:
            <select value={selectedMetric} onChange={handleMetricChange}>
              {/* No validation */}
              <option value="events">Events</option>
              <option value="users">Users</option>
              <option value="metrics">Metrics</option>
            </select>
          </label>
        </div>
        
        {/* No loading indicator */}
        {/* No error message */}
        
        {summary && <MetricsSummary summary={summary} />}
        
        {chartData && <Chart data={chartData} />}
        
        {metrics.length > 0 && (
          <div className="metrics-list">
            <h2>Metrics</h2>
            {/* No pagination - shows all metrics */}
            {metrics.map(metric => (
              <div key={metric.id} className="metric-item">
                <span>{metric.metric_name}: {metric.metric_value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

