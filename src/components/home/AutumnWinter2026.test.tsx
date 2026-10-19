import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AUTUMN_WINTER_DATA } from '@/data/autumnWinter';

describe('AutumnWinter2026 Section Data & Component Specs', () => {
  it('loads Autumn-Winter 2026 forecast metadata correctly', () => {
    assert.strictEqual(AUTUMN_WINTER_DATA.tag, 'SEASON FORECAST');
    assert.strictEqual(AUTUMN_WINTER_DATA.headingLine1, 'Autumn–');
    assert.strictEqual(AUTUMN_WINTER_DATA.headingLine2, 'Winter');
    assert.strictEqual(AUTUMN_WINTER_DATA.headingYear, '2026');
    assert.ok(AUTUMN_WINTER_DATA.description.length > 20);
    assert.strictEqual(AUTUMN_WINTER_DATA.campaigns.length, 3);
  });

  it('ensures all 3 cathedral arch cards have valid local images', () => {
    const images = AUTUMN_WINTER_DATA.campaigns.map((c) => c.image);
    assert.deepStrictEqual(images, [
      '/images/panoramic/ensemble_utsav.jpg',
      '/images/panoramic/ensemble_vara.jpg',
      '/images/panoramic/ensemble_kalyani.jpg',
    ]);
  });
});
