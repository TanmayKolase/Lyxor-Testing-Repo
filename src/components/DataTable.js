import React, { useState } from 'react';
import './DataTable.css';

// No memoization - component re-renders on every parent render
function DataTable({ data }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  console.log('[DEBUG] DataTable rendering with', data?.length || 0, 'items');

  // Excessive re-renders - function recreated on every render
  const handleSort = (column) => {
    console.log('[DEBUG] Sorting by column:', column);
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
    // State updates cause re-render
  };

  // Heavy computation on every render - should be memoized
  const sortedData = data ? [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  }) : [];

  // No loading state
  // No error state
  if (!data || data.length === 0) {
    return (
      <div className="data-table">
        <h3>Users</h3>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="data-table">
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {sortColumn === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('name')}>
              Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('role')}>
              Role {sortColumn === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('status')}>
              Status {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;

