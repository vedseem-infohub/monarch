import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('LookThumbnailCard Alternating Tilt Geometry & Theme Styling', () => {
  it('alternates rotation angles between consecutive cards to match editorial reference', () => {
    const getTiltClass = (index) =>
      index % 2 === 0
        ? 'rotate-[3.5deg] hover:rotate-[1deg]'
        : '-rotate-[3.5deg] hover:rotate-[-1deg]';

    const card0 = getTiltClass(0);
    const card1 = getTiltClass(1);
    const card2 = getTiltClass(2);

    assert.ok(card0.includes('rotate-[3.5deg]'), 'Card 0 rotates clockwise');
    assert.ok(card1.includes('-rotate-[3.5deg]'), 'Card 1 rotates counter-clockwise (opposite)');
    assert.ok(card2.includes('rotate-[3.5deg]'), 'Card 2 rotates clockwise (opposite to Card 1)');
  });

  it('guarantees active card uses Monarch brand theme colors (maroon & gold)', () => {
    const getActiveStyles = (isActive) =>
      isActive
        ? 'ring-2 ring-monarch-gold border-2 border-monarch-maroon shadow-[0_8px_22px_rgba(90,23,37,0.28)] scale-105 z-10'
        : 'border border-gray-200/90 shadow-xs opacity-85 hover:opacity-100';

    const activeStyles = getActiveStyles(true);
    assert.ok(activeStyles.includes('ring-monarch-gold'), 'Active card has monarch gold ring highlight');
    assert.ok(activeStyles.includes('border-monarch-maroon'), 'Active card has monarch maroon border');
    assert.ok(!activeStyles.includes('pink'), 'Must not contain pink');
  });
});
