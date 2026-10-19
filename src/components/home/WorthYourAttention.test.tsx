import { WORTH_YOUR_ATTENTION_DATA, ATTENTION_PRODUCTS } from '@/data/worthYourAttention';

describe('WorthYourAttention Section Data & Configuration', () => {
  it('has valid editorial typography attributes matching the screenshot reference', () => {
    expect(WORTH_YOUR_ATTENTION_DATA.heading).toBe('Worth your attention');
    expect(WORTH_YOUR_ATTENTION_DATA.eyebrow).toBe('ROYAL SPOTLIGHT');
    expect(WORTH_YOUR_ATTENTION_DATA.ctaText).toBe('EXPLORE ALL SPOTLIGHTS');
    expect(WORTH_YOUR_ATTENTION_DATA.ctaHref).toBe('/collections/all');
  });

  it('guarantees each product implements the canonical Product schema with valid numerical prices', () => {
    expect(ATTENTION_PRODUCTS.length).toBeGreaterThanOrEqual(5);

    ATTENTION_PRODUCTS.forEach((product) => {
      expect(typeof product.id).toBe('string');
      expect(typeof product.name).toBe('string');
      expect(typeof product.price).toBe('number');
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.formattedPrice).toBe('string');
      expect(product.formattedPrice).toContain('₹');
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.sectionMetadata).toBeDefined();
      expect(typeof product.sectionMetadata?.verticalText).toBe('string');
      expect(typeof product.sectionMetadata?.attentionHeadline).toBe('string');
    });
  });
});
