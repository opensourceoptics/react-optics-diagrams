import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpotDiagram } from '../src';
import { RayTraceResult } from '../src';
import data from './demo.json' with { type: 'json' };

const rayTraceResult: RayTraceResult = data[3];
console.debug('rayTraceResult', rayTraceResult);

const props = {
  rayTraceResult,
  title: 'Spot Diagram',
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SpotDiagram {...props} />
  </React.StrictMode>,
);
