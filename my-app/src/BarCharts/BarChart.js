import React from 'react';
import './BarChart.css';
import PieDiagram from './PieDiagram';
import AreaDiagram from './AreaDiagram';
import BarDiagram from './BarDiagram';
const BarChart = () => {
  return (
    <div className="barchart-container">
      <h1 className="title">Dashboard Screen</h1>
      <div className="chart-grid">
        <PieDiagram />
      </div>
      <div className="chart-grid">
        <AreaDiagram />
      </div>
      <div className="chart-grid">
        <BarDiagram />
      </div>
      <div className="chart-grid">
        <BarDiagram />
      </div>
      <div className="chart-grid">
        <BarDiagram />
      </div>
      <div className="chart-grid"></div>
    </div>
  );
};

export default BarChart;