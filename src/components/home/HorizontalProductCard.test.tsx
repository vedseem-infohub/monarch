import { TREND_PRODUCTS } from '@/data/trends';
import { SEASONAL_PRODUCTS } from '@/data/seasonal';

/**
 * Test suite for HorizontalProductCard and its associated backend models
 */
describe('HorizontalProductCard Component & Data Models', () => {
  const trendItem = TREND_PRODUCTS[0];
  const seasonalItem = SEASONAL_PRODUCTS[0];

  it('verifies trend product matches backend Product schema', () => {
    expect(trendItem).toBeDefined();
    expect(trendItem.id).toBeTruthy();
    expect(trendItem.name).toBe('Aarunya Emerald Kanjivaram');
    expect(trendItem.price).toBeGreaterThan(0);
    expect(trendItem.rating).toBeGreaterThanOrEqual(4.0);
    expect(trendItem.sizes).toContain('M');
  });

  it('verifies seasonal product matches backend Product schema', () => {
    expect(seasonalItem).toBeDefined();
    expect(seasonalItem.id).toBeTruthy();
    expect(seasonalItem.name).toBe('Rukmini Temple Silk');
    expect(seasonalItem.price).toBeGreaterThan(0);
    expect(seasonalItem.rating).toBeGreaterThanOrEqual(4.0);
    expect(seasonalItem.sizes).toContain('M');
  });

  it('ensures each product has existing local media assets', () => {
    TREND_PRODUCTS.forEach((p) => {
      expect(p.images[0]).toMatch(/^\/images\//);
    });
    SEASONAL_PRODUCTS.forEach((p) => {
      expect(p.images[0]).toMatch(/^\/images\//);
    });
  });
});
