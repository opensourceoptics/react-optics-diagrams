import React from 'react';
import ReactDOM from 'react-dom/client';
import { styled } from 'styled-components';
import { SpotDiagram } from '../src';
import { RayTraceResult } from '../src';
import data from './demo.json' with { type: 'json' };

// Final surface is ID 3
const rayTraceResult: RayTraceResult = data[3];

const Container = styled.div`
  margin: auto;
  max-width: 1200px;
}`;

const props = {
  rayTraceResult,
  title: 'Spot Diagram',
};

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <Container>
      <SpotDiagram {...props} />
    </Container>
  </React.StrictMode>,
);
