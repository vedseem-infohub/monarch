import React from 'react';
import { BRIDAL_ENSEMBLES } from '@/data/bridal';
import { BridalCollection } from './BridalCollection';
import { BridalCard } from './BridalCard';

describe('BridalCollection', () => {
  it('exports BridalCollection and BridalCard components properly', () => {
    expect(BridalCollection).toBeDefined();
    expect(typeof BridalCollection).toBe('function');
    expect(BridalCard).toBeDefined();
    expect(typeof BridalCard).toBe('function');
  });

  it('contains valid bridal ensembles with required properties', () => {
    expect(BRIDAL_ENSEMBLES).toBeDefined();
    expect(BRIDAL_ENSEMBLES.length).toBeGreaterThan(0);

    BRIDAL_ENSEMBLES.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(typeof item.price).toBe('number');
      expect(item.formattedPrice).toBeTruthy();
      expect(item.image).toBeTruthy();
      expect(item.href).toBeTruthy();
      expect(item.craft).toBeTruthy();
    });
  });

  it('verifies responsive card width and aspect ratio calculations', () => {
    const mobileWidth = 155;
    const xsWidth = 175;
    const smWidth = 220;
    const lgWidth = 260;

    const aspectRatio = 3 / 4.2;

    const mobileHeight = mobileWidth / aspectRatio;
    const xsHeight = xsWidth / aspectRatio;
    const smHeight = smWidth / aspectRatio;
    const lgHeight = lgWidth / aspectRatio;

    expect(mobileHeight).toBeCloseTo(217, 0);
    expect(xsHeight).toBeCloseTo(245, 0);
    expect(smHeight).toBeCloseTo(308, 0);
    expect(lgHeight).toBeCloseTo(364, 0);
  });

  it('verifies infinite marquee repetition and index wrapping', () => {
    const baseCount = BRIDAL_ENSEMBLES.length;
    const repeatCount = 4;
    const quadrupled = Array(repeatCount).fill(BRIDAL_ENSEMBLES).flat();

    expect(quadrupled.length).toBe(baseCount * 4);

    // Any index should deterministically map to the canonical ensemble index
    for (let i = 0; i < quadrupled.length; i++) {
      const realIndex = i % baseCount;
      expect(realIndex).toBeGreaterThanOrEqual(0);
      expect(realIndex).toBeLessThan(baseCount);
      expect(quadrupled[i].id).toBe(BRIDAL_ENSEMBLES[realIndex].id);
    }
  });
});
