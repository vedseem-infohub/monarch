import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { EDITS_FOR_OCCASION_DATA } from '@/data/editsForOccasion';

describe('EditsForEveryOccasion Section Data & Architecture', () => {
  it('validates typography headings matching screenshot specifications', () => {
    assert.strictEqual(EDITS_FOR_OCCASION_DATA.headingPrimary, 'EDITS FOR');
    assert.strictEqual(EDITS_FOR_OCCASION_DATA.headingScript, 'every occasion');
    assert.ok(EDITS_FOR_OCCASION_DATA.ctaHref);
    assert.strictEqual(EDITS_FOR_OCCASION_DATA.edits.length, 4);
  });

  it('ensures all 4 occasion portals implement genuine Product schema with sectionMetadata', () => {
    const expectedTitles = [
      'The Wedding Edit',
      'Heritage Weaves',
      'The New Drape',
      'Private Atelier',
    ];

    EDITS_FOR_OCCASION_DATA.edits.forEach((edit, index) => {
      assert.strictEqual(edit.occasionTitle, expectedTitles[index]);
      assert.ok(edit.id.startsWith('prod-edit-'));
      assert.ok(edit.slug);
      assert.ok(edit.price > 0, 'Price must be a number greater than 0');
      assert.ok(edit.images.length > 0);
      assert.ok(edit.image.startsWith('/images/panoramic/'));
      assert.ok(edit.sectionMetadata?.occasionTag);
      assert.ok(edit.sectionMetadata?.occasionTitle);
      assert.strictEqual(edit.sectionMetadata.occasionTitle, edit.occasionTitle);
    });
  });
});
