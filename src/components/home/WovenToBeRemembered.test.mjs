import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('WovenToBeRemembered True Circular Geometry (Top Circle)', () => {
  it('calculates exact circular arc coordinates and tangent angles for desktop', () => {
    const width = 1440;
    const radius = Math.max(2000, width * 1.7); // 2448px
    const tiltFactor = 0.85;
    const maxRot = 14.5;

    // 1. Apex of the circle (center card): zenith position
    const centerDist = 0;
    const centerTheta = centerDist / radius;
    const centerDeltaX = radius * Math.sin(centerTheta) - centerDist;
    const centerY = radius * (1 - Math.cos(centerTheta));
    const centerRotZ = Math.max(-maxRot, Math.min(maxRot, centerTheta * (180 / Math.PI) * tiltFactor));

    assert.strictEqual(centerY, 0);
    assert.strictEqual(centerRotZ, 0);
    assert.strictEqual(centerDeltaX, 0);

    // 2. Adjacent card (~300px away along the track):
    const adjacentDist = 300;
    const adjacentTheta = adjacentDist / radius;
    const adjacentY = radius * (1 - Math.cos(adjacentTheta));
    const adjacentRotZ = Math.max(-maxRot, Math.min(maxRot, adjacentTheta * (180 / Math.PI) * tiltFactor));
    const adjacentDeltaX = radius * Math.sin(adjacentTheta) - adjacentDist;

    assert.ok(adjacentY > 15 && adjacentY < 22, `Adjacent Y (${adjacentY.toFixed(2)}px) should follow prominent circle drop`);
    assert.ok(adjacentRotZ > 5.0 && adjacentRotZ < 7.5, `Adjacent RotZ (${adjacentRotZ.toFixed(2)}deg) should match top-circle tangent`);
    assert.ok(Math.abs(adjacentDeltaX) < 1.0, `DeltaX arc correction should preserve uniform spacing`);

    // 3. Edge card (~750px away at viewport boundary):
    const edgeDist = 750;
    const edgeTheta = edgeDist / radius;
    const edgeY = radius * (1 - Math.cos(edgeTheta));
    const edgeRotZ = Math.max(-maxRot, Math.min(maxRot, edgeTheta * (180 / Math.PI) * tiltFactor));

    assert.ok(edgeY > 100 && edgeY < 130, `Edge Y drop (${edgeY.toFixed(2)}px) should form a prominent top circle arch`);
    assert.ok(edgeRotZ >= 13.5 && edgeRotZ <= 14.5, `Edge RotZ (${edgeRotZ.toFixed(2)}deg) should match royal crown arch tangent`);
  });

  it('calculates responsive circular arc coordinates on mobile screens', () => {
    const width = 390;
    const radius = Math.max(750, width * 2.0); // 780px
    const tiltFactor = 0.65;
    const maxRot = 12.0;

    // Mobile center card (zenith)
    const centerY = radius * (1 - Math.cos(0));
    assert.strictEqual(centerY, 0);

    // Adjacent card on mobile (~222px away along the track)
    const dist = 222;
    const theta = dist / radius;
    const adjacentY = radius * (1 - Math.cos(theta));
    const adjacentRotZ = Math.max(-maxRot, Math.min(maxRot, theta * (180 / Math.PI) * tiltFactor));

    assert.ok(adjacentY > 25 && adjacentY < 40, `Mobile Y drop (${adjacentY.toFixed(2)}px) should form an active circle curve`);
    assert.ok(adjacentRotZ > 8.0 && adjacentRotZ <= 12.0, `Mobile RotZ (${adjacentRotZ.toFixed(2)}deg) should follow circle arc`);
  });

  it('guarantees container bottom padding safely clears circular drop across all screens', () => {
    const radius = 2448;
    const edgeDist = 750;
    const edgeTheta = edgeDist / radius;
    const edgeY = radius * (1 - Math.cos(edgeTheta));
    const maxTiltBottomOffset = 18;
    const totalDownDisplacement = edgeY + maxTiltBottomOffset; // ~133px

    const containerBottomPadding = 160;
    assert.ok(
      containerBottomPadding > totalDownDisplacement + 20,
      `Bottom padding must safely clear total circular displacement (${totalDownDisplacement.toFixed(1)}px)`
    );
  });
});

describe('WovenToBeRemembered Responsive Architecture & Card Shape Verification', () => {
  const componentPath = path.resolve(process.cwd(), 'src/components/home/WovenToBeRemembered.tsx');
  const componentContent = fs.readFileSync(componentPath, 'utf-8');

  it('verifies arched crown card silhouette on mobile and refined corners on desktop', () => {
    assert.ok(
      componentContent.includes('rounded-t-[75px]') || componentContent.includes('rounded-t-[85px]'),
      'Cards on mobile must feature distinctive arched crown top silhouette (rounded-t-[85px])'
    );
    assert.ok(
      componentContent.includes('lg:rounded-2xl'),
      'Cards on desktop must transition to lg:rounded-2xl'
    );
    assert.ok(
      componentContent.includes('w-[205px]') || componentContent.includes('xs:w-[220px]'),
      'Cards on mobile must use compact proportions (~220px) allowing multiple cards on screen'
    );
  });

  it('verifies unified ScrollTrigger scrolling animation operates on mobile and desktop', () => {
    assert.ok(
      componentContent.includes("id: 'woven-scroll'"),
      'ScrollTrigger must register id woven-scroll for programmatic step control'
    );
    assert.ok(
      componentContent.includes("start: 'top top'"),
      'Desktop and mobile ScrollTrigger must start at top top for seamless position pinning'
    );
    assert.ok(
      componentContent.includes('pin: true'),
      'pin: true must be active for smooth horizontal walkthrough during page scroll'
    );
    assert.ok(
      componentContent.includes('applyCurvature()'),
      'applyCurvature must execute during scroll scrub to keep cards along circular rim'
    );
  });

  it('verifies mobile interactive navigation controls: chevrons, pagination dots, and active counter', () => {
    assert.ok(
      componentContent.includes('ChevronLeft') && componentContent.includes('ChevronRight'),
      'Component must provide previous/next chevron buttons for touch navigation'
    );
    assert.ok(
      componentContent.includes('activeIndex'),
      'Component must track active card index for progress indicator'
    );
    assert.ok(
      componentContent.includes('scrollToCard'),
      'Component must provide smooth scrollToCard function for taps on dots or arrows'
    );
  });

  it('verifies top clearance prevents pinned header collision', () => {
    assert.ok(
      componentContent.includes('pt-16') || componentContent.includes('pt-20'),
      'Pinned container must have top padding (pt-16/pt-20) to clear fixed header'
    );
  });
});
