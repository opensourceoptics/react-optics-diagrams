/**
 * Functions to handle layout of the spot diagrams.
 * @module layout
 */
import {
  BoundingBox,
  FieldSpec,
  RayTraceResult,
  RayTraceResults,
  SystemSpec,
  Ticks,
} from '../types';

/**
 * Computes the square bounding box of ray intersections from a ray trace result.
 * @param rayTraceResult - The ray trace result containing the ray intersections.
 * @returns A bounding box for the data defined by the tuple [xmin, ymin, width,
 * height].
 */
function dataBox(rayTraceResult: RayTraceResult): BoundingBox {
  const x = rayTraceResult.rayBundle.x;
  const y = rayTraceResult.rayBundle.y;

  const minX = Math.min(...x);
  const minY = Math.min(...y);
  const maxX = Math.max(...x);
  const maxY = Math.max(...y);

  return forceSquareBox(minX, minY, maxX, maxY);
}

/**
 * Computes the smallest square bounding box that bounds the ray intersections of all
 * the results.
 * @param {RayTraceResults} rayTraceResults - The set of ray trace results.
 * @returns {BoundingBox} - The bounding box for the data defined by the tuple [xmin,
 * ymin, width, height].
 */
function minimalDataBox(rayTraceResults: RayTraceResults): BoundingBox {
  const boxes = rayTraceResults.map((result) => dataBox(result));
  const minX = Math.min(...boxes.map((box) => box[0]));
  const minY = Math.min(...boxes.map((box) => box[1]));
  const maxX = Math.max(...boxes.map((box) => box[0] + box[2]));
  const maxY = Math.max(...boxes.map((box) => box[1] + box[3]));

  return forceSquareBox(minX, minY, maxX, maxY);
}

function forceSquareBox(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
): BoundingBox {
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const halfSize = Math.max(maxX - minX, maxY - minY) / 2;
  return [centerX - halfSize, centerY - halfSize, 2 * halfSize, 2 * halfSize];
}

/**
 * Pads a bounding box by a given fraction of its size.
 * @param box {BoundingBox} - The bounding box to pad.
 * @param padding {number} - The padding in units of a fraction of the padded box's
 * size. For example, a value of 0.05 will result in a box where 10% of the width and
 * 10% of the height are spanned by padding, whereas 90% of the width and height are
 * spanned by the data.
 * @returns {BoundingBox} - The padded bounding box.
 */
function padBox(box: BoundingBox, padding: number): BoundingBox {
  const [minX, minY, width, height] = box;
  const centerX = minX + width / 2;
  const centerY = minY + height / 2;

  return [
    centerX - ((1 + 2 * padding) * width) / 2,
    centerY - ((1 + 2 * padding) * height) / 2,
    (1 + 2 * padding) * width,
    (1 + 2 * padding) * height,
  ];
}

/**
 * Algorithm for determining "nice" tick positions for a given range of values.
 *
 * Nice tick positions are those that are easy to read and interpret. The distance
 * between ticks is an integer multiple of the step size, and the step size is
 * f * 10^{n} where f is either 1, 2, 5, or 10.
 * @param {number} min The minimum value of the range.
 * @param {number} max The maximum value of the range.
 * @param {number} minTickCount The minimum number of ticks to display (default is 5).
 * @param {number} maxTickCount The maximum number of ticks to display (default is 9).
 * @returns {Object} An object containing the minimum, maximum, step size, and an array of tick
 * positions.
 */
function calcTickPositions(
  min: number,
  max: number,
  minTickCount: number = 5,
  maxTickCount = 9,
): Ticks {
  const range = max - min;

  const roughStep = range / (maxTickCount - 1);
  const niceStep = niceNumber(roughStep);
  let niceMin = Math.floor(min / niceStep) * niceStep;
  let niceMax = Math.ceil(max / niceStep) * niceStep;

  // Adjust the niceMin and niceMax to ensure they are within the range
  if (niceMin < min) {
    niceMin += niceStep;
  }
  if (niceMax > max) {
    niceMax -= niceStep;
  }

  const tickCount = Math.round((niceMax - niceMin) / niceStep) + 1;

  // If we have too few ticks, try a smaller nice number, which dependson maxTickCount
  if (tickCount < minTickCount) {
    return calcTickPositions(min, max, minTickCount, maxTickCount * 2);
  }

  const ticks = [];
  for (let i = 0; i < tickCount; i++) {
    const tickValue = niceMin + i * niceStep;

    // Bounds check
    if (tickValue <= niceMax + 1e-10) {
      ticks.push(tickValue);
    }
  }

  return {
    min: niceMin,
    max: niceMax,
    step: niceStep,
    positions: ticks,
  };
}

/**
 * Round a number to a "nice" value (multiple of 1, 2, 5, 10, etc.).
 * @param value - The number to round.
 * @returns The rounded number.
 */
function niceNumber(value: number) {
  const exponent = Math.floor(Math.log10(value));
  const fraction = value / Math.pow(10, exponent);

  let niceFraction;

  // Round to a nice fraction: 1, 2, 5, 10
  if (fraction < 1.5) {
    niceFraction = 1;
  } else if (fraction < 3) {
    niceFraction = 2;
  } else if (fraction < 7) {
    niceFraction = 5;
  } else {
    niceFraction = 10;
  }

  return niceFraction * Math.pow(10, exponent);
}

/**
 * Calculate the number of rows and columns for the grid layout.
 * @param {SystemSpec} wavelengths ReadonlyArray<SystemSpec> - The wavelengths of the rays.
 * @param {FieldSpec} fieldSpecs ReadonlyArray<FieldSpec> - The field specifications.
 * @returns {[number, number]} - The number of rows and columns.
 */
function calcNumRowsAndCols(
  wavelengths: ReadonlyArray<SystemSpec>,
  fieldSpecs: ReadonlyArray<FieldSpec>,
): [number, number] {
  const numRows = fieldSpecs.length;
  const numCols = wavelengths.length;

  return [numRows, numCols];
}

/**
 * Calculate the center position of the title from a bounding box.
 * @param {BoundingBox} box - The bounding box to place the title above.
 * @param {number} titleOffset - The offset from the top of the box to place the title.
 * @returns {[number, number]} - The x, y center coordinates of the title.
 */
function titlePosition(
  box: BoundingBox,
  titleOffset: number,
): [number, number] {
  const [minX, minY, width] = box;
  const centerX = minX + width / 2;
  const centerY = minY + titleOffset;

  return [centerX, centerY];
}

/**
 * Calculate the font size as a fraction of the bounding box's diagonal size.
 * @param {BoundingBox} box - The bounding box to calculate the font size from.
 * @param {number} fontSizeFraction - The font size as a fraction of the bounding box size.
 * @returns {number} - The font size in em.
 */
function fontSize(box: BoundingBox, fontSizeFraction: number): number {
  const [, , width, height] = box;
  const diagonal = Math.sqrt(width * width + height * height);
  return fontSizeFraction * diagonal;
}

export {
  calcNumRowsAndCols,
  calcTickPositions,
  dataBox,
  fontSize,
  minimalDataBox,
  padBox,
  titlePosition,
};
