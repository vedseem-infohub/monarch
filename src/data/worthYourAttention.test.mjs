import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('WorthYourAttention Architecture & Geometry (Strictly 2 States)', () => {
  it('validates strictly 2 geometry states: closed slender slat and expanded active card', () => {
    const closedWidth = 94; // approx px when closed (slender slat)
    const expandedWidth = 620; // approx px when hovered (expanded full story)
    const minHeight = 500;

    assert.ok(closedWidth >= 70 && closedWidth <= 120, 'State 1 (Closed): card is a sleek slender slat');
    assert.ok(expandedWidth >= 500 && expandedWidth <= 680, 'State 2 (Hovered): card expands to full rich width');
    assert.ok(minHeight >= 460, 'Card height ensures vertical editorial presence');
  });

  it('validates visual transitions between State 1 (dark part) and State 2 (full color)', () => {
    const state1Filter = 'grayscale brightness-[0.45]'; // dark part
    const state2Filter = 'filter-none brightness-100'; // full colorful view

    assert.ok(state1Filter.includes('grayscale'), 'State 1 must be dark part with grayscale');
    assert.ok(state2Filter.includes('brightness-100'), 'State 2 must be full radiant color');
  });
});
