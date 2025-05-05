import React from 'react';
import styled from 'styled-components';
import Axis from '../Axis';
import { BoundingBox, RayTraceResult, SpotDiagramOptions } from '../../types';
import { dataBox, fontSize, padBox, titlePosition } from '../../data/layout';

const SVGContainer = styled.div`
  max-width: 100%;
`;

const StyledTitle = styled.text.attrs((props) => ({
  fontSize: props.fontSize ? `${props.fontSize}em` : '0.002em',
  textAnchor: 'middle',
  dominantBaseline: 'auto',
}))`
  font-family: sans-serif;
  fill: black;
`;

const defaultOptions: SpotDiagramOptions = {
  axisBoxPadding: 0.05,
  viewBoxPadding: 0.1,
  spotRadius: '0.3%',
  titleFontFractionalEMSize: 0.002,
  titleFractionalOffset: 0.07,
};

export interface SpotDiagramProps {
  rayTraceResult: RayTraceResult;
  dataBox?: BoundingBox;
  options?: SpotDiagramOptions;
  title?: string;
  key?: number | string;
}

const SpotDiagram = (props: SpotDiagramProps) => {
  const options: SpotDiagramOptions = { ...defaultOptions, ...props.options };

  const dBox = props.dataBox ? props.dataBox : dataBox(props.rayTraceResult); // The smallest square box that contains the data
  const axisBox = padBox(dBox, options.axisBoxPadding!); // Contains the data box and the axis
  const vBox = padBox(axisBox, options.viewBoxPadding!); // Contains everything in the figure
  const [xMin, yMin, width, height] = vBox;

  const titleOffset = options.titleFractionalOffset! * height;
  const [titleXCenter, titleYCenter] = titlePosition(vBox, titleOffset);
  const titleFontSize = fontSize(vBox, options.titleFontFractionalEMSize!);

  return (
    <SVGContainer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        viewBox={`${xMin} ${yMin} ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {props.title && (
          <StyledTitle
            x={titleXCenter}
            y={titleYCenter}
            fontSize={titleFontSize}
          >
            {props.title}
          </StyledTitle>
        )}

        <Axis bbox={[...axisBox]} />

        <g
          className="rayIntersections"
          transform={`matrix(1 0 0 -1 0 ${2 * axisBox[1] + axisBox[3]})`}
        >
          {props.rayTraceResult.rayBundle.x.map((x, index) => (
            <circle
              key={index}
              cx={x}
              cy={props.rayTraceResult.rayBundle.y[index]}
              r={options.spotRadius}
              fill="red"
            />
          ))}
        </g>
      </svg>
    </SVGContainer>
  );
};

export default SpotDiagram;
