import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('WovenToBeRemembered True Circular Geometry (Top Circle)', () => {
  it('calculates exact circular arc coordinates and tangent angles', () => {
    const radius = Math.max(2600, 1440 * 2.1); // 3024px

    // 1. Apex of the circle (center card): zenith position
    const centerDist = 0;
    const centerTheta = centerDist / radius;
    const centerDeltaX = radius * Math.sin(centerTheta) - centerDist;
    const centerY = radius * (1 - Math.cos(centerTheta));
    const centerRotZ = centerTheta * (180 / Math.PI);

    assert.strictEqual(centerY, 0);
    assert.strictEqual(centerRotZ, 0);
    assert.strictEqual(centerDeltaX, 0);

    // 2. Adjacent card (~285px away along the track):
    const adjacentDist = 285;
    const adjacentTheta = adjacentDist / radius;
    const adjacentY = radius * (1 - Math.cos(adjacentTheta));
    const adjacentRotZ = adjacentTheta * (180 / Math.PI);
    const adjacentDeltaX = radius * Math.sin(adjacentTheta) - adjacentDist;

    assert.ok(adjacentY > 10 && adjacentY < 18, `Adjacent Y (${adjacentY.toFixed(2)}px) should follow circle drop`);
    assert.ok(adjacentRotZ > 4.5 && adjacentRotZ < 6.5, `Adjacent RotZ (${adjacentRotZ.toFixed(2)}deg) should match circle tangent`);
    assert.ok(Math.abs(adjacentDeltaX) < 1.0, `DeltaX arc correction should preserve uniform spacing`);

    // 3. Edge card (~750px away at viewport boundary):
    const edgeDist = 750;
    const edgeTheta = edgeDist / radius;
    const edgeY = radius * (1 - Math.cos(edgeTheta));
    const edgeRotZ = edgeTheta * (180 / Math.PI);

    assert.ok(edgeY > 80 && edgeY < 105, `Edge Y drop (${edgeY.toFixed(2)}px) should form a prominent top circle arch`);
    assert.ok(edgeRotZ > 12 && edgeRotZ < 16, `Edge RotZ (${edgeRotZ.toFixed(2)}deg) should match exact circular rim`);
  });

  it('guarantees container bottom padding (160px / pb-40) safely clears top-circle drop', () => {
    const radius = 3024;
    const edgeDist = 750;
    const edgeTheta = edgeDist / radius;
    const edgeY = radius * (1 - Math.cos(edgeTheta));
    const maxTiltBottomOffset = 18;
    const totalDownDisplacement = edgeY + maxTiltBottomOffset; // ~111px

    const containerBottomPadding = 160; // pb-40 in Tailwind
    assert.ok(
      containerBottomPadding > totalDownDisplacement + 35,
      `Bottom padding (${containerBottomPadding}px) must provide at least 35px safety buffer past total displacement (${totalDownDisplacement.toFixed(1)}px)`
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
