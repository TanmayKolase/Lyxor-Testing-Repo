import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SalesChart.css';

// No memoization - component re-renders on every parent render
// Heavy component with chart rendering
function SalesChart({ data }) {
  console.log('[DEBUG] SalesChart rendering with', data?.length || 0, 'data points');

  // Heavy computation on every render - should be memoized
  const chartData = data ? data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    sales: item.amount,
    orders: item.orders
  })) : [];

  // No loading state
  // No error state
  if (!data || data.length === 0) {
    return (
      <div className="sales-chart">
        <h3>Sales Overview</h3>
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="sales-chart">
      <h3>Sales Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#3498db" strokeWidth={2} />
          <Line type="monotone" dataKey="orders" stroke="#27ae60" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;

