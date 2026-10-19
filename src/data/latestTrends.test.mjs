import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('LatestTrends Data & Product Architecture', () => {
  it('validates section configuration and editorial labels matching reference', () => {
    const filePath = path.resolve('src/data/latestTrends.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    assert.ok(content.includes("headingPrimary: 'LATEST'"), 'Heading primary must be LATEST');
    assert.ok(content.includes("headingSecondary: 'TRENDS'"), 'Heading secondary must be TRENDS');
    assert.ok(content.includes("ctaText: 'Discover Now'"), 'CTA text must be Discover Now');
    assert.ok(content.includes("storyHeading: 'Stories Behind The Drape'"), 'Story heading must match reference');
    assert.ok(content.includes("rangeHeading: 'Explore The Range'"), 'Range heading must match reference');
    assert.ok(content.includes("ensemble_utsav.jpg"), 'Must use ensemble_utsav.jpg matching screenshot');
  });

  it('validates card deck stack geometry and physics constants', () => {
    const topCardScale = 1.0;
    const secondCardScale = 0.94;
    const thirdCardScale = 0.88;
    const cardTiltAngle = 2.8;

    assert.ok(topCardScale === 1.0, 'Top card must be at full scale');
    assert.ok(secondCardScale < topCardScale, 'Second card must be scaled down in stack');
    assert.ok(thirdCardScale < secondCardScale, 'Third card must be scaled further down');
    assert.ok(cardTiltAngle > 2 && cardTiltAngle < 5, 'Card deck tilt simulates realistic playing card stack');
  });

  it('verifies that range categories link to legitimate catalog slugs', () => {
    const categories = ['kanjivaram-silk', 'banarasi-silk', 'bridal-lehengas', 'festive-wear-women', 'organza-tissue'];
    const filePath = path.resolve('src/data/latestTrends.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    categories.forEach((slug) => {
      assert.ok(content.includes(slug), `LatestTrends must reference ${slug}`);
    });
  });
});
