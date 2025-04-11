import React from 'react';
import { BoundingBox } from '../../types';
import { calcTickPositions } from '../../data/layout';

const defaultOptions = {
  stroke: 'black',
  strokeWidth: '0.25%',
  fractionalTickLength: 0.01,
};

interface AxisProps {
  bbox: BoundingBox;
  stroke?: string;
  strokeWidth?: string;
  fractionalTickLength?: number;
}

const Axis = (props: AxisProps) => {
  const options = { ...defaultOptions, ...props };
  const [xMin, yMin, width, height] = props.bbox;
  return (
    <g
      className="axis"
      stroke={options.stroke}
      strokeWidth={options.strokeWidth}
    >
      <path
        d={`M ${xMin} ${yMin} L ${xMin + width} ${yMin} L ${xMin + width} ${
          yMin + height
        } L ${xMin} ${yMin + height} Z`}
        fill="none"
      />

      <Ticks
        bbox={props.bbox}
        side="top"
        fractionalTickLength={options.fractionalTickLength}
      />
      <Ticks
        bbox={props.bbox}
        side="bottom"
        fractionalTickLength={options.fractionalTickLength}
      />
      <Ticks
        bbox={props.bbox}
        side="left"
        fractionalTickLength={options.fractionalTickLength}
      />
      <Ticks
        bbox={props.bbox}
        side="right"
        fractionalTickLength={options.fractionalTickLength}
      />
    </g>
  );
};

interface TicksProps {
  bbox: BoundingBox;
  side: 'top' | 'bottom' | 'left' | 'right';
  stroke?: string;
  strokeWidth?: string;
  fractionalTickLength?: number;
}

const Ticks = (props: TicksProps) => {
  const options = { ...defaultOptions, ...props };
  const [xMin, yMin, width, height] = props.bbox;
  const side = props.side;

  const diagonal = Math.sqrt(width ** 2 + height ** 2);
  const tickLength = diagonal * options.fractionalTickLength;

  let positions;
  if (side === 'top') {
    const ticks = calcTickPositions(xMin, xMin + width);
    positions = ticks.positions.map((position) => {
      return { x1: position, y1: yMin, x2: position, y2: yMin + tickLength };
    });
  } else if (side === 'bottom') {
    const ticks = calcTickPositions(xMin, xMin + width);
    positions = ticks.positions.map((position) => {
      return {
        x1: position,
        y1: yMin + height,
        x2: position,
        y2: yMin + height - tickLength,
      };
    });
  } else if (side === 'left') {
    const ticks = calcTickPositions(yMin, yMin + height);
    positions = ticks.positions.map((position) => {
      return { x1: xMin, y1: position, x2: xMin + tickLength, y2: position };
    });
  } else if (side === 'right') {
    const ticks = calcTickPositions(yMin, yMin + height);
    positions = ticks.positions.map((position) => {
      return {
        x1: xMin + width,
        y1: position,
        x2: xMin + width - tickLength,
        y2: position,
      };
    });
  } else {
    throw new Error(
      `Invalid side "${side}". Valid sides are: top, bottom, left, right.`,
    );
  }

  return (
    <g
      className="ticks"
      stroke={options.stroke}
      strokeWidth={options.strokeWidth}
    >
      {positions.map((position, index) => (
        <line
          key={index}
          x1={position.x1}
          y1={position.y1}
          x2={position.x2}
          y2={position.y2}
        />
      ))}
    </g>
  );
};

export { Ticks };
export type { AxisProps, TicksProps };
export default Axis;
