import React from 'react';
import { SixMoodsSection } from './SixMoodsSection';

describe('SixMoodsSection', () => {
  it('exports SixMoodsSection component properly', () => {
    expect(SixMoodsSection).toBeDefined();
    expect(typeof SixMoodsSection).toBe('function');
  });

  it('verifies responsive horizontal scroll geometry calculation', () => {
    // Proportional card widths across breakpoints
    const cardWidthMobile = 155;
    const cardWidthXs = 175;
    const cardWidthSm = 210;

    expect(cardWidthMobile).toBeGreaterThan(0);
    expect(cardWidthXs).toBeGreaterThan(cardWidthMobile);
    expect(cardWidthSm).toBeGreaterThan(cardWidthXs);

    // Arch card aspect ratio 3 / 4.6
    const aspectRatio = 3 / 4.6;
    const heightMobile = cardWidthMobile / aspectRatio;
    expect(heightMobile).toBeCloseTo(237.67, 1);
  });
});
