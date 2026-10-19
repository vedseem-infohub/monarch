import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CHANGE_LOOK_STYLES } from '@/data/changeLook';

describe('ChangeYourLook Section Component & Integration', () => {
  it('contains valid lookbook items with complete metadata', () => {
    assert.strictEqual(CHANGE_LOOK_STYLES.length, 3);
    const firstLook = CHANGE_LOOK_STYLES[0];
    assert.strictEqual(firstLook.name, 'IVORY ORGANZA BLOOM');
    assert.strictEqual(firstLook.price, '₹ 18,400');
    assert.ok(firstLook.sizes.includes('36'));
    assert.strictEqual(firstLook.colors.length, 3);
  });

  it('validates color swatches and image paths', () => {
    CHANGE_LOOK_STYLES.forEach((look) => {
      look.colors.forEach((c) => {
        assert.ok(c.name);
        assert.ok(c.hex.startsWith('#'));
        assert.ok(c.image.startsWith('/images/'));
      });
    });
  });

  it('verifies audio track metadata for floating media pill', () => {
    CHANGE_LOOK_STYLES.forEach((look) => {
      assert.ok(look.audioTrack.title);
      assert.ok(look.audioTrack.artist);
    });
  });
});
