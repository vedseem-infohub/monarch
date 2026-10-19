import { LATEST_TRENDS_DATA, LATEST_TRENDS_PRODUCTS } from '@/data/latestTrends';

describe('LatestTrends Component Architecture', () => {
  it('validates 3-column layout data requirements', () => {
    expect(LATEST_TRENDS_DATA.headingPrimary).toBe('LATEST');
    expect(LATEST_TRENDS_DATA.headingSecondary).toBe('TRENDS');
    expect(LATEST_TRENDS_DATA.eyebrow).toBe('Explore Collection');
    expect(LATEST_TRENDS_DATA.ctaText).toBe('Discover Now');
    expect(LATEST_TRENDS_DATA.storyHeading).toBe('Stories Behind The Drape');
    expect(LATEST_TRENDS_DATA.rangeHeading).toBe('Explore The Range');
  });

  it('verifies all trend deck products contain genuine image assets and URLs', () => {
    LATEST_TRENDS_PRODUCTS.forEach((product) => {
      expect(product.images[0]).toMatch(/^\/images\//);
      expect(product.actionHref).toMatch(/^\/product\//);
      expect(typeof product.price).toBe('number');
    });
  });
});
