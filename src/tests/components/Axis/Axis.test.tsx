import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Ticks } from '../../../components/Axis';
import { BoundingBox } from '../../../types';

describe('Ticks Component', () => {
  it('throws an exception if a side is not recognized', () => {
    const bbox: BoundingBox = [0, 0, 1, 1];
    const side = 'invalidSide' as 'top' | 'bottom' | 'left' | 'right';

    expect(() => {
      render(<Ticks bbox={bbox} side={side} />);
    }).toThrowError(
      `Invalid side "${side}". Valid sides are: top, bottom, left, right.`,
    );
  });
});
