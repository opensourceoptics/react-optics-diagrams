import { describe, it, expect } from 'vitest';
import { sortSystemSpecsIndexes } from '../../data/specs';
import { FieldSpec, SystemSpec } from '../../types';

describe('sortSystemSpecs', () => {
  it('should sort wavelengths by value', () => {
    const wavelengths: ReadonlyArray<SystemSpec> = [
      { value: 0.6563, units: 'µm' },
      { value: 0.4861, units: 'µm' },
      { value: 0.5876, units: 'µm' },
    ];

    const sortedWavelengths = sortSystemSpecsIndexes(wavelengths);
    expect(sortedWavelengths[0]).toBe(1);
    expect(sortedWavelengths[1]).toBe(2);
    expect(sortedWavelengths[2]).toBe(0);
  });

  it('should sort field specs by value', () => {
    const fieldSpecs: ReadonlyArray<FieldSpec> = [
      { value: 5.0, units: 'deg', type: 'angle' } as const,
      { value: 0.0, units: 'deg', type: 'angle' } as const,
    ];

    const sortedFieldSpecs = sortSystemSpecsIndexes(fieldSpecs);
    expect(sortedFieldSpecs[0]).toBe(1);
    expect(sortedFieldSpecs[1]).toBe(0);
  });
});
