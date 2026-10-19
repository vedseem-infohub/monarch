import { SEASONAL_PRODUCTS } from '@/data/seasonal';

/**
 * Test suite for SeasonalSpecial component and seasonal data
 */
describe('SeasonalSpecial Section', () => {
  it('loads valid seasonal products from dedicated data file', () => {
    expect(SEASONAL_PRODUCTS.length).toBeGreaterThanOrEqual(4);
    SEASONAL_PRODUCTS.forEach((p) => {
      expect(p.slug).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.rating).toBeGreaterThan(4.5);
    });
  });
});
