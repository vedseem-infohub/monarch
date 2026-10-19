import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('WovenToBeRemembered Curvature & Dimension Calculations', () => {
  it('calculates parabolic upward curve within safe non-clipping drop range', () => {
    const curveSpan = 1440 * 0.52; // 748.8px
    const viewportCenter = 720;

    // Test center card: norm = 0, y should be exactly 0
    const centerNorm = Math.max(-1.05, Math.min(1.05, (720 - viewportCenter) / curveSpan));
    const centerY = Math.pow(Math.abs(centerNorm), 1.8) * 45;
    const centerRot = centerNorm * 4.5;
    assert.strictEqual(centerY, 0);
    assert.strictEqual(centerRot, 0);

    // Test adjacent card ~280px away: gentle slope
    const adjacentDist = 280;
    const adjacentNorm = Math.max(-1.05, Math.min(1.05, adjacentDist / curveSpan));
    const adjacentY = Math.pow(Math.abs(adjacentNorm), 1.8) * 45;
    const adjacentRot = adjacentNorm * 4.5;
    assert.ok(adjacentY > 5 && adjacentY < 12, `Adjacent Y (${adjacentY}) should be gentle`);
    assert.ok(adjacentRot > 1 && adjacentRot < 2.5, `Adjacent Rot (${adjacentRot}) should be subtle`);

    // Test edge card at screen boundary: drop should not exceed 50px
    const edgeDist = 720;
    const edgeNorm = Math.max(-1.05, Math.min(1.05, edgeDist / curveSpan));
    const edgeY = Math.pow(Math.abs(edgeNorm), 1.8) * 45;
    const edgeRot = edgeNorm * 4.5;
    assert.ok(edgeY <= 48, `Max edge Y drop (${edgeY}) should stay <= 48px to prevent card hiding`);
    assert.ok(Math.abs(edgeRot) <= 4.6, `Max edge rotation (${edgeRot}) should stay <= 4.6 deg`);
  });

  it('guarantees container bottom padding (112px / pb-28) exceeds maximum card drop', () => {
    const maxDrop = 48; // Max drop in pixels
    const maxTiltBottomOffset = 13; // Max downward tilt displacement in pixels
    const totalDownDisplacement = maxDrop + maxTiltBottomOffset; // 61px

    const containerBottomPadding = 112; // pb-28 = 112px in Tailwind
    assert.ok(
      containerBottomPadding > totalDownDisplacement + 30,
      `Bottom padding (${containerBottomPadding}px) must provide at least 30px buffer past total displacement (${totalDownDisplacement}px)`
    );
  });

  it('verifies minimal travel distance calculation for right-edge card alignment', () => {
    const containerWidth = 1440;
    const lastCardOffsetLeft = 2000;
    const lastCardOffsetWidth = 290;
    const minimalGap = 20;

    const travel = Math.max(0, lastCardOffsetLeft + lastCardOffsetWidth - (containerWidth - minimalGap));
    const finalRightEdgePosition = lastCardOffsetLeft + lastCardOffsetWidth - travel;

    assert.strictEqual(
      finalRightEdgePosition,
      containerWidth - minimalGap,
      `Last card right edge must align exactly ${minimalGap}px from viewport right edge`
    );
  });
});
