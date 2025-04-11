/**
 * Routines for accessing and manipulating system specs.
 * @module specs
 */

import { SystemSpec } from '../types';

/**
 * Sorts an array of specs by their value property, returning an array of their indexes.
 * @param {ReadonlyArray<SystemSpec>} specs
 * @returns The indexes of the sorted specs.
 */
function sortSystemSpecsIndexes(
  specs: ReadonlyArray<SystemSpec>,
): ReadonlyArray<number> {
  const indexedArr = specs.map((item, index) => ({
    item,
    index,
  }));

  // Sort the array based on the value property
  indexedArr.sort((a, b) => a.item.value - b.item.value);

  // Return just the original indices
  return indexedArr.map((obj) => obj.index);
}

export { sortSystemSpecsIndexes };
