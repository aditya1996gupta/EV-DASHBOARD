// src/App.js
import React, { useState, useEffect } from 'react';
import EVChart from './components/EVChart';
import Papa from 'papaparse';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong in the chart component.</h1>;
    }
    return this.props.children;
  }
}

const App = () => {
  const [data, setData] = useState({ labels: [], values: [] });

  const fetchData = () => {
    Papa.parse('Desktop/Electric_Vehicle_Population_Data.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const labels = results.data.map(item => item.label); // Adjust based on your CSV structure
        const values = results.data.map(item => Number(item.value)); // Convert to numbers if necessary
        setData({ labels, values });
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Electric Vehicle Population Chart</h1>
      <ErrorBoundary>
        <EVChart data={data} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
