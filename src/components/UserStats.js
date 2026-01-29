import React from 'react';
import './UserStats.css';

// No memoization - component re-renders on every parent render
function UserStats({ data }) {
  console.log('[DEBUG] UserStats rendering');

  // Heavy computation on every render - should be memoized
  const stats = data ? {
    totalUsers: data.totalUsers || 0,
    activeUsers: data.activeUsers || 0,
    newUsers: data.newUsers || 0,
    revenue: data.revenue || 0
  } : {
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    revenue: 0
  };

  // No loading state
  // No error state
  return (
    <div className="user-stats">
      <h3>Statistics</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.activeUsers}</div>
          <div className="stat-label">Active Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.newUsers}</div>
          <div className="stat-label">New Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">${stats.revenue.toLocaleString()}</div>
          <div className="stat-label">Revenue</div>
        </div>
      </div>
    </div>
  );
}

export default UserStats;

