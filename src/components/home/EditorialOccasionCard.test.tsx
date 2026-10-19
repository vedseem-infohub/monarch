import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { EDITS_FOR_OCCASION_DATA } from '@/data/editsForOccasion';

describe('EditorialOccasionCard Component Contract', () => {
  it('validates first edit card is The Wedding Edit with valid action text', () => {
    const weddingEdit = EDITS_FOR_OCCASION_DATA.edits[0];
    assert.strictEqual(weddingEdit.occasionTitle, 'The Wedding Edit');
    assert.strictEqual(weddingEdit.occasionTag, 'CURATED WEDDING TROUSSEAU');
    assert.strictEqual(weddingEdit.actionText, 'EXPLORE NOW');
    assert.ok(weddingEdit.actionHref.includes('wedding'));
  });

  it('verifies all 4 cards have valid local images matching the photoshoot gallery', () => {
    const images = EDITS_FOR_OCCASION_DATA.edits.map((e) => e.image);
    assert.deepStrictEqual(images, [
      '/images/panoramic/ensemble_aarunya.jpg',
      '/images/panoramic/ensemble_utsav.jpg',
      '/images/panoramic/ensemble_vara.jpg',
      '/images/panoramic/ensemble_kalyani.jpg',
    ]);
  });
});
