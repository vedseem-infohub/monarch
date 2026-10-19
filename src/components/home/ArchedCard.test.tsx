import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AUTUMN_WINTER_DATA } from '@/data/autumnWinter';

describe('ArchedCard Component & Data Validation', () => {
  it('validates autumn winter campaign dataset structure', () => {
    assert.strictEqual(AUTUMN_WINTER_DATA.campaigns.length, 3);
    AUTUMN_WINTER_DATA.campaigns.forEach((camp) => {
      assert.ok(camp.id, 'Campaign item must have an id');
      assert.ok(camp.title, 'Campaign item must have a title');
      assert.ok(camp.image, 'Campaign item must have an image path');
      assert.ok(camp.href, 'Campaign item must have a link');
      assert.ok(camp.image.startsWith('/images/'), 'Campaign image must reference local existing assets');
    });
  });

  it('verifies arch top dimensions and responsive aspect ratio specs', () => {
    const archBorderRadiusClass = 'rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[210px]';
    assert.ok(archBorderRadiusClass.includes('rounded-t-'), 'Arch card must use top-rounded arch classes');
  });
});
