/**
 * Functions for accessing and manipulating rays trace results.
 * @module rays
 */

import { RayTraceResults } from '../types';

function getRayTraceResultByWavelength(
  rayTraceResults: RayTraceResults,
  wavelengthId: number,
): RayTraceResults {
  return rayTraceResults.filter(
    (result) => result.wavelengthId === wavelengthId,
  );
}

function getRayTraceResultByField(
  rayTraceResults: RayTraceResults,
  fieldId: number,
): RayTraceResults {
  return rayTraceResults.filter((result) => result.fieldId === fieldId);
}

function getRayTraceResultBySurface(
  rayTraceResults: RayTraceResults,
  surfaceId: number,
): RayTraceResults {
  return rayTraceResults.filter((result) => result.surfaceId === surfaceId);
}

function getRayTraceResultsAtLastSurface(
  rayTraceResults: RayTraceResults,
): RayTraceResults {
  const numSurfaces = Math.max(
    ...rayTraceResults.map((result) => result.surfaceId || 0),
  );

  return getRayTraceResultBySurface(rayTraceResults, numSurfaces);
}

export {
  getRayTraceResultsAtLastSurface,
  getRayTraceResultByField,
  getRayTraceResultBySurface,
  getRayTraceResultByWavelength,
};
