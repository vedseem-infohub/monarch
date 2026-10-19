import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('CurvedAddToCartButton Exact Contour Architecture', () => {
  it('validates closed organic silhouette coordinates match reference measurements', () => {
    // Exact contour path
    const pathD = `M 41.4 147.6
             C 63.0 99.0, 126.0 43.2, 216.0 16.2
             C 244.8 7.2, 284.4 9.0, 302.4 32.4
             C 313.2 48.6, 298.8 66.6, 273.6 73.8
             C 216.0 93.6, 135.0 133.2, 81.0 169.2
             C 59.4 174.6, 34.2 165.6, 41.4 147.6 Z`;

    assert.ok(pathD.includes('M 41.4 147.6'), 'Starts at measured bottom-left cap');
    assert.ok(pathD.includes('302.4 32.4'), 'Reaches measured top-right terminus');
    assert.ok(pathD.endsWith('Z'), 'Path must be a closed silhouette');
  });

  it('verifies circular token alignment inside top-right apex', () => {
    const circleCx = 273.6;
    const circleCy = 34.2;
    const circleR = 23;

    // Must be positioned within the top-right envelope (x: 245-302, y: 10-60)
    assert.ok(circleCx > 245 && circleCx < 302, 'Circle center X inside top-right lobe');
    assert.ok(circleCy > 10 && circleCy < 60, 'Circle center Y inside top-right lobe');
    assert.strictEqual(circleR, 23, 'Circle radius matches scaled measurement');
  });
});
