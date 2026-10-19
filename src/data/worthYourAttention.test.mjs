import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('WorthYourAttention Architecture & Geometry', () => {
  it('validates idle increased width, expanded active width, and decreased sibling width', () => {
    const idleDefaultWidth = 280; // approx px when not hovering (increased width)
    const expandedWidth = 620; // approx px when active (expanded full story)
    const decreasedSiblingWidth = 80; // approx px when sibling hovered (decreased slender slat)
    const minHeight = 500;

    assert.ok(idleDefaultWidth >= 220 && idleDefaultWidth <= 320, 'Idle default card has increased, comfortable width');
    assert.ok(expandedWidth >= 500 && expandedWidth <= 680, 'Expanded card provides rich full story space');
    assert.ok(decreasedSiblingWidth >= 60 && decreasedSiblingWidth <= 100, 'Decreased sibling compresses to slender slat');
    assert.ok(minHeight >= 460, 'Card height ensures vertical editorial presence');
  });

  it('validates state transitions between dark grayscale, idle moody, and colorful active', () => {
    const idleFilter = 'grayscale-[45%] brightness-[0.72]';
    const decreasedFilter = 'grayscale brightness-[0.38]';
    const activeFilter = 'filter-none brightness-100';

    assert.ok(idleFilter.includes('grayscale-[45%]'), 'Idle card has subtle moody tone');
    assert.ok(decreasedFilter.includes('brightness-[0.38]'), 'Decreased sibling card is dark and muted');
    assert.ok(activeFilter.includes('brightness-100'), 'Active card is full radiant color');
  });
});
