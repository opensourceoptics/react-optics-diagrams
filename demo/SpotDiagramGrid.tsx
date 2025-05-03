import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpotDiagramsGrid } from '../src';
import { RayTraceResults } from '../src';
import data from './demo.json' with { type: 'json' };

const rayTraceResults: RayTraceResults = data;
console.debug('rayTraceResults', rayTraceResults);

const props = {
  rayTraceResults,
  wavelengths: [
    { value: 0.4861, units: 'µm' },
    { value: 0.5876, units: 'µm' },
    { value: 0.6563, units: 'µm' },
  ],
  fieldSpecs: [
    { value: 0.0, units: 'deg', type: 'angle' } as const,
    { value: 5.0, units: 'deg', type: 'angle' } as const,
  ],
};

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <SpotDiagramsGrid {...props} />
  </React.StrictMode>,
);
