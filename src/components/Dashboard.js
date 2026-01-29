import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import SalesChart from './SalesChart';
import UserStats from './UserStats';
import Filters from './Filters';
import { fetchDashboardData, fetchUsers, fetchSales } from '../services/api';
import './Dashboard.css';

function Dashboard({ user }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'all',
    search: ''
  });

  // Missing dependency array - causes infinite re-renders
  useEffect(() => {
    console.log('[DEBUG] Dashboard mounted, fetching data');
    
    // Hardcoded API URL
    fetchDashboardData()
      .then(data => {
        console.log('[DEBUG] Dashboard data received:', data);
        setDashboardData(data);
      })
      .catch(error => {
        // No error handling
        console.error('[ERROR] Failed to fetch dashboard data:', error);
      });
  }); // Missing dependency array

  // Missing dependency array - will re-fetch on every render
  useEffect(() => {
    console.log('[DEBUG] Fetching users with filters:', filters);
    
    fetchUsers(filters)
      .then(data => {
        console.log('[DEBUG] Users data:', data);
        setUsers(data);
      })
      .catch(error => {
        // No error handling
        console.error('[ERROR] Failed to fetch users:', error);
      });
  }); // Missing dependency array - should include [filters]

  // Missing dependency array
  useEffect(() => {
    console.log('[DEBUG] Fetching sales data');
    
    fetchSales(filters.dateRange)
      .then(data => {
        console.log('[DEBUG] Sales data:', data);
        setSales(data);
      })
      .catch(error => {
        // No error handling
        console.error('[ERROR] Failed to fetch sales:', error);
      });
  }); // Missing dependency array - should include [filters.dateRange]

  // Excessive re-renders - function recreated on every render
  const handleFilterChange = (newFilters) => {
    console.log('[DEBUG] Filters changed:', newFilters);
    setFilters(newFilters);
    // This causes all useEffect hooks to re-run
  };

  // Excessive re-renders - function recreated on every render
  const handleSearch = (searchTerm) => {
    console.log('[DEBUG] Search term:', searchTerm);
    setFilters(prev => ({
      ...prev,
      search: searchTerm
    }));
    // State update causes re-render, which recreates this function
  };

  // No loading state
  // No error state
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name || 'Admin'}</h2>
        <p>Dashboard Overview</p>
      </div>

      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <UserStats data={dashboardData} />
        </div>

        <div className="dashboard-card chart-card">
          <SalesChart data={sales} />
        </div>

        <div className="dashboard-card table-card">
          <DataTable data={users} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

