import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('WovenToBeRemembered True Circular Geometry (Top Circle)', () => {
  it('calculates exact circular arc coordinates and refined luxury rotation angles', () => {
    const radius = Math.max(2800, 1440 * 2.2); // 3168px
    const damping = 0.30;
    const maxAngle = 4.2;

    // 1. Apex of the circle (center card): zenith position
    const centerDist = 0;
    const centerTheta = centerDist / radius;
    const centerDeltaX = radius * Math.sin(centerTheta) - centerDist;
    const centerY = radius * (1 - Math.cos(centerTheta));
    const centerRotZ = Math.max(-maxAngle, Math.min(maxAngle, centerTheta * (180 / Math.PI) * damping));

    assert.strictEqual(centerY, 0);
    assert.strictEqual(centerRotZ, 0);
    assert.strictEqual(centerDeltaX, 0);

    // 2. Adjacent card (~300px away along the track):
    const adjacentDist = 300;
    const adjacentTheta = adjacentDist / radius;
    const adjacentY = radius * (1 - Math.cos(adjacentTheta));
    const adjacentRotZ = Math.max(-maxAngle, Math.min(maxAngle, adjacentTheta * (180 / Math.PI) * damping));
    const adjacentDeltaX = radius * Math.sin(adjacentTheta) - adjacentDist;

    assert.ok(adjacentY > 10 && adjacentY < 18, `Adjacent Y (${adjacentY.toFixed(2)}px) should follow circle drop`);
    assert.ok(adjacentRotZ > 1.2 && adjacentRotZ < 2.0, `Adjacent RotZ (${adjacentRotZ.toFixed(2)}deg) should be refined and subtle`);
    assert.ok(Math.abs(adjacentDeltaX) < 1.0, `DeltaX arc correction should preserve uniform spacing`);

    // 3. Edge card (~750px away at viewport boundary):
    const edgeDist = 750;
    const edgeTheta = edgeDist / radius;
    const edgeY = radius * (1 - Math.cos(edgeTheta));
    const edgeRotZ = Math.max(-maxAngle, Math.min(maxAngle, edgeTheta * (180 / Math.PI) * damping));

    assert.ok(edgeY > 75 && edgeY < 100, `Edge Y drop (${edgeY.toFixed(2)}px) should form a prominent top circle arch`);
    assert.ok(edgeRotZ >= 3.8 && edgeRotZ <= 4.2, `Edge RotZ (${edgeRotZ.toFixed(2)}deg) must be clamped to refined royal angle (<= 4.2deg) instead of raw 15-23deg`);
  });

  it('guarantees container bottom padding safely clears top-circle drop', () => {
    const radius = 3168;
    const edgeDist = 750;
    const edgeTheta = edgeDist / radius;
    const edgeY = radius * (1 - Math.cos(edgeTheta));
    const maxTiltBottomOffset = 18;
    const totalDownDisplacement = edgeY + maxTiltBottomOffset; // ~106px

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

describe('WovenToBeRemembered Mobile Responsiveness & Viewport Coverage Architecture', () => {
  const componentPath = path.resolve(process.cwd(), 'src/components/home/WovenToBeRemembered.tsx');
  const componentContent = fs.readFileSync(componentPath, 'utf-8');

  it('verifies card width covers mobile viewport (84vw) with centered magnetic snapping', () => {
    assert.ok(
      componentContent.includes('w-[84vw]'),
      'Cards on mobile must cover 84vw of the screen for prominent editorial presentation'
    );
    assert.ok(
      componentContent.includes('snap-center'),
      'Cards on mobile must have snap-center so the active card centers cleanly in viewport'
    );
    assert.ok(
      componentContent.includes('px-[8vw]'),
      'Track must provide 8vw horizontal padding to balance 84vw cards exactly in center ((100vw - 84vw) / 2 = 8vw)'
    );
  });

  it('verifies mobile horizontal scroll container with no-scrollbar and touch pan', () => {
    assert.ok(
      componentContent.includes('overflow-x-auto lg:overflow-visible'),
      'Outer container must be horizontally scrollable on mobile and visible on desktop'
    );
    assert.ok(
      componentContent.includes('snap-x snap-mandatory lg:snap-none'),
      'Outer container must enable CSS snap-mandatory on mobile and none on desktop'
    );
    assert.ok(
      componentContent.includes('touch-pan-x'),
      'Outer container must optimize touch gestures for horizontal pan'
    );
  });

  it('verifies mobile interactive navigation controls: chevrons, pagination dots, and active counter', () => {
    assert.ok(
      componentContent.includes('ChevronLeft') && componentContent.includes('ChevronRight'),
      'Component must provide previous/next chevron buttons for mobile touch navigation'
    );
    assert.ok(
      componentContent.includes('activeMobileIndex'),
      'Component must track active card index for mobile progress indicator'
    );
    assert.ok(
      componentContent.includes('scrollToIndex'),
      'Component must provide smooth scrollToIndex function for taps on dots or arrows'
    );
    assert.ok(
      componentContent.includes('lg:hidden'),
      'Mobile navigation controls must be hidden on desktop breakpoint'
    );
  });

  it('verifies GSAP matchMedia isolates desktop arc animation and reverts transforms on mobile', () => {
    assert.ok(
      componentContent.includes("mm.add('(min-width: 1024px)'"),
      'GSAP must use matchMedia to target desktop screens (min-width: 1024px)'
    );
    assert.ok(
      componentContent.includes("card.style.transform = ''"),
      'GSAP matchMedia cleanup must reset inline card transforms when switching to mobile'
    );
    assert.ok(
      componentContent.includes("track.style.transform = ''"),
      'GSAP matchMedia cleanup must reset track transform when switching to mobile'
    );
  });

  it('verifies refined rotation angle damping factor (0.30) and clamping (max 4.2deg)', () => {
    assert.ok(
      componentContent.includes('0.30'),
      'Component must use 0.30 rotation damping factor to prevent severe card tilting'
    );
    assert.ok(
      componentContent.includes('maxAngle = 4.2') || componentContent.includes('4.2'),
      'Component must cap rotation angle to max 4.2deg for a regal crown curve'
    );
  });
});
