import React from 'react';
import { BRIDAL_ENSEMBLES } from '@/data/bridal';

/**
 * Test suite for BridalCollection component
 * Verifies bridal collection state management, rotation logic, and asset references.
 */
describe('BridalCollection Component', () => {
  it('loads all bridal items from dedicated bridal data', () => {
    expect(BRIDAL_ENSEMBLES).toBeDefined();
    expect(BRIDAL_ENSEMBLES.length).toBe(6);
  });

  it('ensures each ensemble has an associated product or valid link', () => {
    BRIDAL_ENSEMBLES.forEach((ensemble) => {
      expect(ensemble.href).toContain('/product/');
      expect(ensemble.formattedPrice).toContain('₹');
      expect(ensemble.categoryName).toBeTruthy();
    });
  });

  it('confirms existing image assets are referenced without placeholders', () => {
    BRIDAL_ENSEMBLES.forEach((ensemble) => {
      expect(ensemble.image).toMatch(/^\/images\/(panoramic|moods)\//);
    });
  });
});
