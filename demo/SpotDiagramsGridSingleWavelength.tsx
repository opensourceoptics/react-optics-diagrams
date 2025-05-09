import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpotDiagramsGrid } from '../src';
import { RayTraceResults } from '../src';
import data from './demo.json' with { type: 'json' };

const rayTraceResults: RayTraceResults = data;
const filteredResults = rayTraceResults.filter(
  (result) => result.wavelengthId === 0 && result.fieldId === 0,
);

const props = {
  rayTraceResults: filteredResults,
  wavelengths: [
    { value: 0.4861, units: 'µm' },
  ],
  fieldSpecs: [
    { value: 0.0, units: 'deg', type: 'angle' } as const,
  ],
};

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <SpotDiagramsGrid {...props} />
  </React.StrictMode>,
);
