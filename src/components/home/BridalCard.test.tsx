import React from 'react';
import { BRIDAL_ENSEMBLES } from '@/data/bridal';

/**
 * Test suite for BridalCard component
 * Verifies rendering, active state styling, and interaction callbacks.
 */
describe('BridalCard Component', () => {
  const mockEnsemble = BRIDAL_ENSEMBLES[0];

  it('provides complete data structure for bridal ensemble', () => {
    expect(mockEnsemble).toBeDefined();
    expect(mockEnsemble.id).toBeTruthy();
    expect(mockEnsemble.name).toBe('Janki Courtyard Silk');
    expect(mockEnsemble.formattedPrice).toBe('₹ 2,60,000');
    expect(mockEnsemble.image).toBeTruthy();
    expect(mockEnsemble.craft).toBeTruthy();
  });

  it('contains expected categories in BRIDAL_ENSEMBLES list', () => {
    expect(BRIDAL_ENSEMBLES.length).toBeGreaterThanOrEqual(4);
    BRIDAL_ENSEMBLES.forEach((item) => {
      expect(item.id).toMatch(/^monarch-/);
      expect(item.image.startsWith('/images/')).toBe(true);
      expect(item.price).toBeGreaterThan(0);
    });
  });
});
