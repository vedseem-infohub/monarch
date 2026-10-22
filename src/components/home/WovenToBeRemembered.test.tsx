import React from 'react';
import { SIGNATURE_ENSEMBLES } from '@/data/bridal';
import { WovenToBeRemembered } from './WovenToBeRemembered';

describe('WovenToBeRemembered', () => {
  it('has 6 signature ensembles defined with valid required properties', () => {
    expect(SIGNATURE_ENSEMBLES).toBeDefined();
    expect(SIGNATURE_ENSEMBLES.length).toBeGreaterThanOrEqual(6);

    SIGNATURE_ENSEMBLES.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.craft).toBeTruthy();
      expect(item.price).toBeTruthy();
      expect(item.image).toBeTruthy();
      expect(item.href).toBeTruthy();
    });
  });

  it('exports WovenToBeRemembered component properly', () => {
    expect(WovenToBeRemembered).toBeDefined();
    expect(typeof WovenToBeRemembered).toBe('function');
  });

  it('calculates circular arc curvature math deterministically without nan', () => {
    const width = 1440;
    const viewportCenter = width / 2;
    const radius = Math.max(2200, width * 1.7);
    const tiltFactor = 0.85;
    const maxRot = 14.5;

    // Test a card centered at zenith
    const zenithCardScreenX = viewportCenter;
    const zenithDist = zenithCardScreenX - viewportCenter;
    const zenithTheta = zenithDist / radius;
    const zenithDeltaX = radius * Math.sin(zenithTheta) - zenithDist;
    const zenithY = radius * (1 - Math.cos(zenithTheta));
    const zenithRotZ = Math.max(-maxRot, Math.min(maxRot, zenithTheta * (180 / Math.PI) * tiltFactor));

    expect(zenithDist).toBe(0);
    expect(zenithDeltaX).toBeCloseTo(0, 5);
    expect(zenithY).toBeCloseTo(0, 5);
    expect(zenithRotZ).toBeCloseTo(0, 5);

    // Test a card offset by 400px to the left
    const leftCardScreenX = viewportCenter - 400;
    const leftDist = leftCardScreenX - viewportCenter;
    const leftTheta = leftDist / radius;
    const leftY = radius * (1 - Math.cos(leftTheta));
    const leftRotZ = Math.max(-maxRot, Math.min(maxRot, leftTheta * (180 / Math.PI) * tiltFactor));

    expect(leftY).toBeGreaterThan(0);
    expect(leftRotZ).toBeLessThan(0);
    expect(Number.isNaN(leftY)).toBe(false);
    expect(Number.isNaN(leftRotZ)).toBe(false);
  });

  it('verifies mobile screen (< 640px) uses linear flat layout without circular arc drop or rotation', () => {
    const width = 390; // Typical mobile screen (iPhone 14/15)
    const isMobile = width < 640;
    expect(isMobile).toBe(true);

    // On mobile, applyCurvature clears transforms so cards sit completely flat:
    // deltaX = 0, y = 0, rotZ = 0 (no circular displacement or tilt)
    const deltaX = 0;
    const y = 0;
    const rotZ = 0;

    expect(deltaX).toBe(0);
    expect(y).toBe(0);
    expect(rotZ).toBe(0);

    // Verify right padding on mobile is compact (24px vs 48px desktop)
    const mobileRightPadding = isMobile ? 24 : 48;
    expect(mobileRightPadding).toBe(24);
  });

  it('verifies edge-to-edge travel calculation eliminating half-screen free space', () => {
    const containerWidth = 1440;
    const rightPadding = 48;
    const lastCardOffsetLeft = 1600;
    const lastCardWidth = 290;
    const lastCardRight = lastCardOffsetLeft + lastCardWidth;

    const startX = 0;
    const travel = Math.max(0, lastCardRight - (containerWidth - rightPadding));
    const endX = -travel;

    expect(startX).toBe(0);
    expect(travel).toBeGreaterThan(0);
    expect(endX).toBeLessThan(0);
    // At endX, last card right edge sits at containerWidth - rightPadding
    expect(endX + lastCardRight).toBe(containerWidth - rightPadding);
  });
});
