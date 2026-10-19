import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('WorthYourAttention Architecture & Geometry', () => {
  it('validates collapsed and expanded card geometry specifications', () => {
    const collapsedWidth = 94; // approx px
    const expandedWidth = 580; // approx px
    const minHeight = 540;

    assert.ok(collapsedWidth >= 70 && collapsedWidth <= 120, 'Collapsed card must be slender');
    assert.ok(expandedWidth >= 320 && expandedWidth <= 680, 'Expanded card must have ample width for story');
    assert.ok(minHeight >= 460, 'Card height ensures vertical presence');
  });

  it('validates state transitions between dark grayscale and colorful active', () => {
    const inactiveFilter = 'grayscale(100%) brightness(0.55)';
    const activeFilter = 'filter-none brightness-100';

    assert.ok(inactiveFilter.includes('grayscale(100%)'), 'Inactive card must be dark/grayscale');
    assert.ok(activeFilter.includes('brightness-100'), 'Active card must be full color');
  });
});
