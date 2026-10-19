import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CHANGE_LOOK_STYLES } from '../../data/changeLook';

describe('LookThumbnailCard & ChangeLook Data Validation', () => {
  it('validates interactive change look dataset structure', () => {
    assert.strictEqual(CHANGE_LOOK_STYLES.length, 3);
    CHANGE_LOOK_STYLES.forEach((look) => {
      assert.ok(look.id);
      assert.ok(look.name);
      assert.ok(look.price);
      assert.ok(look.rawPrice > 0);
      assert.ok(look.modelImage.startsWith('/images/'));
      assert.ok(look.sizes.length >= 3);
      assert.ok(look.colors.length >= 2);
    });
  });

  it('checks first look is IVORY ORGANZA BLOOM matching Screenshot 2', () => {
    const ivory = CHANGE_LOOK_STYLES[0];
    assert.strictEqual(ivory.name, 'IVORY ORGANZA BLOOM');
    assert.strictEqual(ivory.price, '₹ 18,400');
    assert.strictEqual(ivory.rawPrice, 18400);
    assert.strictEqual(ivory.colorName, 'Ivory');
  });
});
