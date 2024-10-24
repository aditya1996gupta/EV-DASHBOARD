// src/components/EVTable.js
import React from 'react';

const EVTable = ({ data }) => {
  return (
    <div>
      <h2>Electric Vehicle Details</h2>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Model Year</th>
            <th>Electric Range</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((item, index) => (
            <tr key={index}>
              <td>{item['Make']}</td>
              <td>{item['Model']}</td>
              <td>{item['Model Year']}</td>
              <td>{item['Electric Range']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EVTable;
