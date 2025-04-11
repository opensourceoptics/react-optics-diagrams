import { describe, it, expect } from 'vitest';
import {
  calcNumRowsAndCols,
  calcTickPositions,
  dataBox,
  minimalDataBox,
  padBox,
  titlePosition,
} from '../../data/layout';
import {
  BoundingBox,
  FieldSpec,
  RayTraceResult,
  SystemSpec,
  Ticks,
} from '../../types';

describe('dataBox', () => {
  it('should compute a square bounding box from ray intersections', () => {
    const rayTraceResult: RayTraceResult = {
      wavelengthId: 0,
      fieldId: 0,
      rayBundle: {
        x: [1, 2, 3, 4],
        y: [5, 6, 7, 10],
      },
      chiefRay: {
        x: [2.5],
        y: [7.5],
      },
    };
    const box = dataBox(rayTraceResult);
    expect(box).toEqual([0, 5, 5, 5]);
  });
});

describe('minimalDataBox', () => {
  it('should compute the smallest square bounding box from multiple ray trace results', () => {
    const rayTraceResults: RayTraceResult[] = [
      {
        wavelengthId: 0,
        fieldId: 0,
        rayBundle: {
          x: [1, 2, 3, 4],
          y: [5, 6, 7, 10],
        },
        chiefRay: {
          x: [2.5],
          y: [7.5],
        },
      },
      {
        wavelengthId: 1,
        fieldId: 1,
        rayBundle: {
          x: [0, 1, 2],
          y: [3, 4, 5],
        },
        chiefRay: {
          x: [1],
          y: [4],
        },
      },
    ];
    const box = minimalDataBox(rayTraceResults);
    expect(box).toEqual([-1, 3, 7, 7]);
  });
});

describe('padBox', () => {
  it('should compute a square bounding box from ray intersections with padding', () => {
    const inputBox: BoundingBox = [0, 5, 5, 5];
    const padding = 0.1; // 10% padding to each side
    const box = padBox(inputBox, padding);
    expect(box).toEqual([-0.5, 4.5, 6, 6]);
  });
});

describe('calcTickPositions', () => {
  it('should calculate tick positions that are integer multiples of the step', () => {
    const min = -2;
    const max = 9;
    const ticks: Ticks = calcTickPositions(min, max);

    for (const position in ticks.positions) {
      const tick = ticks.positions[position];
      expect(Math.abs(tick % ticks.step)).toBe(0);
    }
  });

  it('should return a min and max that are within the input range', () => {
    const min = -2.44;
    const max = 9.73;
    const ticks: Ticks = calcTickPositions(min, max);

    expect(ticks.min).toBeGreaterThanOrEqual(min);
    expect(ticks.max).toBeLessThanOrEqual(max);
  });
});

describe('calcNumRowsAndCols', () => {
  it('should calculate the number of rows and columns for a grid layout', () => {
    const wavelengths: ReadonlyArray<SystemSpec> = [
      { value: 0.4861, units: 'µm' },
      { value: 0.5876, units: 'µm' },
      { value: 0.6563, units: 'µm' },
    ];
    const fieldSpecs: ReadonlyArray<FieldSpec> = [
      { value: 0.0, units: 'deg', type: 'angle' } as const,
      { value: 5.0, units: 'deg', type: 'angle' } as const,
    ];

    const [numRows, numCols] = calcNumRowsAndCols(wavelengths, fieldSpecs);
    expect(numRows).toBe(2);
    expect(numCols).toBe(3);
  });

  describe('titlePosition', () => {
    it('should calculate the center position of the title from a bounding box', () => {
      const box: BoundingBox = [0, 0, 10, 5];
      const titleOffset = 0.5;
      const [x, y] = titlePosition(box, titleOffset);
      expect(x).toBe(5);
      expect(y).toBe(0.5);
    });
  });
});
