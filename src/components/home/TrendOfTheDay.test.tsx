import { TREND_PRODUCTS } from '@/data/trends';

/**
 * Test suite for TrendOfTheDay component and trends data
 */
describe('TrendOfTheDay Section', () => {
  it('loads valid trend products from dedicated data file', () => {
    expect(TREND_PRODUCTS.length).toBeGreaterThanOrEqual(4);
    TREND_PRODUCTS.forEach((p) => {
      expect(p.slug).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.rating).toBeGreaterThan(4.5);
    });
  });
});
