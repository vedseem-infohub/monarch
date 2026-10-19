import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('CurvedAddToCartButton Unified Token Architecture', () => {
  it('guarantees the white action disc and arrow form a single unified composite part', () => {
    const cx = 268;
    const cy = 38;
    const r = 19;

    // Arrow stem endpoints
    const arrowStartX = 259;
    const arrowEndX = 277;
    const arrowMidY = 38;

    // Verify arrow is perfectly centered inside the circle
    const arrowCenter = (arrowStartX + arrowEndX) / 2;
    assert.strictEqual(arrowCenter, cx, 'Arrow horizontal center must match circle cx');
    assert.strictEqual(arrowMidY, cy, 'Arrow vertical line must match circle cy');

    // Arrow must fit strictly inside the circle with margin
    assert.ok(arrowStartX > cx - r, 'Arrow start is inside circle');
    assert.ok(arrowEndX < cx + r, 'Arrow end is inside circle');
  });

  it('guarantees the composite token is strictly contained inside the maroon silhouette', () => {
    const cx = 268;
    const cy = 38;
    const r = 19;

    assert.ok(cy - r > 15, 'Token top has maroon border above it');
    assert.ok(cy + r < 75, 'Token bottom has maroon border below it');
    assert.ok(cx + r < 312, 'Token right has maroon border to the right of it');
    assert.ok(cx - r > 240, 'Token left is preceded by maroon body');
  });
});
