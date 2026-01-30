import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Chart.css';

// Console logs
// No validation

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart({ data }) {
  console.log('[DEBUG] Chart component rendered');
  console.log('[DEBUG] Chart data:', data);
  
  // No validation - assumes data structure is correct
  // No error handling
  
  if (!data || !data.labels || !data.datasets) {
    // No error UI - just returns null
    console.error('[ERROR] Invalid chart data');
    return null;
  }
  
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset, index) => ({
      ...dataset,
      backgroundColor: `rgba(${54 + index * 50}, ${162 + index * 30}, ${235 + index * 20}, 0.5)`,
      borderColor: `rgba(${54 + index * 50}, ${162 + index * 30}, ${235 + index * 20}, 1)`,
      borderWidth: 2
    }))
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Analytics Data'
      }
    }
  };
  
  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Chart;

