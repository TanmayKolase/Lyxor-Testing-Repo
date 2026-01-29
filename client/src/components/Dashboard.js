import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hardcoded API endpoint
    // Partial error handling
    api.get('/admin/stats')
      .then(response => {
        setStats(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        // Partial error handling - only logs
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats?.totalUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Active Users</h3>
          <p className="stat-value">{stats?.activeUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Admin Users</h3>
          <p className="stat-value">{stats?.adminUsers || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

