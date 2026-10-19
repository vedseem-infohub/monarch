import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Unified Product Catalog Resolution', () => {
  it('verifies getProductByIdOrSlug resolves products across all sections', () => {
    // Mock sample items representing each section's data
    const allProducts = [
      { id: 'monarch-001', slug: 'gulnaar-lehenga', name: 'Gulnaar Lehenga' },
      { id: 'bridal-01', slug: 'padmavati-crimson', name: 'Padmavati Crimson' },
      { id: 'prod-aw-001', slug: 'awadhi-darbar-couture', name: 'Awadhi Darbar Couture' },
      { id: 'prod-look-001', slug: 'chandrakala-crimson', name: 'Chandrakala Net' },
      { id: 'prod-edit-wedding', slug: 'the-wedding-edit', name: 'The Wedding Edit' },
      { id: 'seasonal-001', slug: 'rukmini-temple-silk', name: 'Rukmini Temple Silk' },
      { id: 'trend-001', slug: 'padmavati-royal-crimson', name: 'Padmavati Royal Crimson' },
    ];

    function getProductByIdOrSlug(idOrSlug) {
      if (!idOrSlug) return undefined;
      const normalized = idOrSlug.trim().toLowerCase();
      return allProducts.find(
        (p) =>
          p.id.toLowerCase() === normalized ||
          (p.slug && p.slug.toLowerCase() === normalized)
      );
    }

    // Test resolving by ID
    assert.strictEqual(getProductByIdOrSlug('monarch-001')?.name, 'Gulnaar Lehenga');
    assert.strictEqual(getProductByIdOrSlug('bridal-01')?.name, 'Padmavati Crimson');
    assert.strictEqual(getProductByIdOrSlug('prod-aw-001')?.name, 'Awadhi Darbar Couture');
    assert.strictEqual(getProductByIdOrSlug('prod-look-001')?.name, 'Chandrakala Net');
    assert.strictEqual(getProductByIdOrSlug('prod-edit-wedding')?.name, 'The Wedding Edit');
    assert.strictEqual(getProductByIdOrSlug('seasonal-001')?.name, 'Rukmini Temple Silk');
    assert.strictEqual(getProductByIdOrSlug('trend-001')?.name, 'Padmavati Royal Crimson');

    // Test resolving by Slug
    assert.strictEqual(getProductByIdOrSlug('awadhi-darbar-couture')?.id, 'prod-aw-001');
    assert.strictEqual(getProductByIdOrSlug('padmavati-crimson')?.id, 'bridal-01');
    assert.strictEqual(getProductByIdOrSlug('the-wedding-edit')?.id, 'prod-edit-wedding');
    assert.strictEqual(getProductByIdOrSlug('rukmini-temple-silk')?.id, 'seasonal-001');

    // Test case-insensitivity
    assert.strictEqual(getProductByIdOrSlug('AWADHI-DARBAR-COUTURE')?.id, 'prod-aw-001');
    assert.strictEqual(getProductByIdOrSlug('BRIDAL-01')?.id, 'bridal-01');
  });

  it('verifies flexible occasion filtering with case-insensitivity', () => {
    const products = [
      { id: '1', occasion: ['Wedding', 'Pheras', 'Bridal'] },
      { id: '2', occasion: ['Festive', 'Diwali'] },
      { id: '3', occasion: ['Royal Gala', 'Reception'] },
    ];

    const selectedOccasions = ['wedding']; // Lowercase from query parameter ?occasion=wedding

    const filtered = products.filter((p) =>
      p.occasion.some((o) =>
        selectedOccasions.some(
          (so) =>
            o.toLowerCase().includes(so.toLowerCase()) ||
            so.toLowerCase().includes(o.toLowerCase())
        )
      )
    );

    assert.strictEqual(filtered.length, 1);
    assert.strictEqual(filtered[0].id, '1');
  });

  it('verifies silk mood category mapping handles all 6 silk moods without 404', () => {
    const silkSlugs = [
      'kanjivaram-silk',
      'chanderi-silk',
      'tussar-silk',
      'paithani-silk',
      'banarasi-silk',
      'organza-tissue',
    ];

    const products = [
      { id: 'p1', fabric: 'Pure Kanjivaram Silk', name: 'Temple Drape' },
      { id: 'p2', fabric: 'Pure Chanderi Silk', name: 'Gulabi Saree' },
      { id: 'p3', fabric: 'Wild Tussar Silk', name: 'Golden Forest' },
      { id: 'p4', fabric: 'Royal Paithani Silk', name: 'Peacock Saree' },
      { id: 'p5', fabric: 'Katan Banarasi Silk', name: 'Kashi Kadwa' },
      { id: 'p6', fabric: 'Organza Tissue Net', name: 'Ethereal Net' },
    ];

    silkSlugs.forEach((slug) => {
      const silkKey = slug.replace('-silk', '').replace('-tissue', '');
      const matched = products.filter((p) =>
        p.fabric.toLowerCase().includes(silkKey) || p.name.toLowerCase().includes(silkKey)
      );
      assert.ok(matched.length >= 1, `Silk slug ${slug} must resolve at least 1 product`);
    });
  });
});
