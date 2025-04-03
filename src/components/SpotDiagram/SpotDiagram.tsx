import React from 'react';

export interface SpotDiagramProps {
  name: string;
}

const SpotDiagram = (props: SpotDiagramProps) => {
  return (
    <div>
      <h1>Spot Diagram for {props.name}</h1>
    </div>
  );
};

export default SpotDiagram;
