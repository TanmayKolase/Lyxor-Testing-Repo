import React, { useState } from 'react';
import './Filters.css';

// No memoization - component re-renders on every parent render
function Filters({ filters, onFilterChange, onSearch }) {
  const [localSearch, setLocalSearch] = useState(filters.search);

  console.log('[DEBUG] Filters component rendering');

  // Excessive re-renders - function recreated on every render
  const handleDateRangeChange = (e) => {
    console.log('[DEBUG] Date range changed:', e.target.value);
    onFilterChange({
      ...filters,
      dateRange: e.target.value
    });
  };

  // Excessive re-renders - function recreated on every render
  const handleStatusChange = (e) => {
    console.log('[DEBUG] Status changed:', e.target.value);
    onFilterChange({
      ...filters,
      status: e.target.value
    });
  };

  // Excessive re-renders - function recreated on every render
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    // Debouncing would help but not implemented
    onSearch(value);
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label>
          Date Range
        </label>
        <select
          value={filters.dateRange}
          onChange={handleDateRangeChange}
          // Missing accessibility attributes - no aria-label
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          Status
        </label>
        <select
          value={filters.status}
          onChange={handleStatusChange}
          // Missing accessibility attributes - no aria-label
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="filter-group">
        <label>
          Search
        </label>
        <input
          type="text"
          value={localSearch}
          onChange={handleSearchChange}
          placeholder="Search users..."
          // Missing accessibility attributes - no aria-label, no aria-describedby
        />
      </div>
    </div>
  );
}

export default Filters;

