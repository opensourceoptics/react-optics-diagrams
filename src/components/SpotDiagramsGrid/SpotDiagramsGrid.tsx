import React from 'react';
import styled from 'styled-components';
import SpotDiagram from '../SpotDiagram';
import {
  FieldSpec,
  RayTraceResult,
  RayTraceResults,
  SystemSpec,
} from '../../types';
import { calcNumRowsAndCols, minimalDataBox } from '../../data/layout';
import {
  getRayTraceResultsAtLastSurface,
  getRayTraceResultByField,
  getRayTraceResultBySurface,
  getRayTraceResultByWavelength,
} from '../../data/rays';
import { sortSystemSpecsIndexes } from '../../data/specs';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--max-columns), 1fr);
  align-items: center;
  width: 100%;
`;

interface SpotDiagramsGridProps {
  rayTraceResults: RayTraceResults;
  wavelengths: Array<SystemSpec>;
  fieldSpecs: Array<FieldSpec>;
  surfaceIndex?: number;
}

const SpotDiagramsGrid = (props: SpotDiagramsGridProps) => {
  const maxNumCols = calcNumRowsAndCols(props.wavelengths, props.fieldSpecs)[1];
  const sortedWavelengthsIndexes = sortSystemSpecsIndexes(props.wavelengths);
  const sortedFieldSpecsIndexes = sortSystemSpecsIndexes(props.fieldSpecs);

  const results =
    props.surfaceIndex === undefined
      ? getRayTraceResultsAtLastSurface(props.rayTraceResults)
      : getRayTraceResultBySurface(props.rayTraceResults, props.surfaceIndex);

  return (
    <GridContainer
      style={{ '--max-columns': maxNumCols } as React.CSSProperties}
    >
      {sortedFieldSpecsIndexes.flatMap((fieldIndex) => {
        const resultsAtThisField = getRayTraceResultByField(
          results,
          fieldIndex,
        );
        const dataBox = minimalDataBox(resultsAtThisField);

        return sortedWavelengthsIndexes.map((wavelengthIndex) => {
          const result = getRayTraceResultByWavelength(
            resultsAtThisField,
            wavelengthIndex,
          )[0];

          return (
            <SpotDiagram
              rayTraceResult={result as RayTraceResult}
              dataBox={dataBox}
              title={`Wavelength: ${props.wavelengths[wavelengthIndex].value} ${props.wavelengths[wavelengthIndex].units}, Field: ${props.fieldSpecs[fieldIndex].value} ${props.fieldSpecs[fieldIndex].units}`}
              key={`${fieldIndex},${wavelengthIndex}`}
            />
          );
        });
      })}
    </GridContainer>
  );
};

export default SpotDiagramsGrid;
