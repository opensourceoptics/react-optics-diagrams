import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpotDiagram } from '../src';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SpotDiagram {...{ name: 'Spotty' }} />
  </React.StrictMode>,
);
