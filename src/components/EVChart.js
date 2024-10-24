// src/components/EVChart.js
import React, { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js';

// Register necessary components
Chart.register(LineController, LineElement, LinearScale, PointElement, CategoryScale);

const EVChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Reference to the chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Electric Vehicles',
            data: data.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category', // Specify the x-axis type
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });

    // Cleanup function to destroy the chart instance on unmount
    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} id="myChart"></canvas>;
};

export default EVChart;
