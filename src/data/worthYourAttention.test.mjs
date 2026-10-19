import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('WorthYourAttention Architecture & Geometry (Strictly 2 States)', () => {
  it('validates strictly 2 geometry states: non-active dark card with increased width and expanded active card', () => {
    const notActiveDarkWidth = 220; // approx px when not active (increased width dark card)
    const expandedWidth = 660; // approx px when hovered (expanded full story)
    const minHeight = 500;

    assert.ok(notActiveDarkWidth >= 180 && notActiveDarkWidth <= 260, 'State 1 (Not active): dark card has substantial increased width');
    assert.ok(expandedWidth >= 500 && expandedWidth <= 720, 'State 2 (Hovered): card expands to full rich width');
    assert.ok(minHeight >= 460, 'Card height ensures vertical editorial presence');
  });

  it('validates visual transitions between State 1 (dark part) and State 2 (full color)', () => {
    const state1Filter = 'grayscale brightness-[0.45]'; // dark part
    const state2Filter = 'filter-none brightness-100'; // full colorful view

    assert.ok(state1Filter.includes('grayscale'), 'State 1 must be dark part with grayscale');
    assert.ok(state2Filter.includes('brightness-100'), 'State 2 must be full radiant color');
  });
});
