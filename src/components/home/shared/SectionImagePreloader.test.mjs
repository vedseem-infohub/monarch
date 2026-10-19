import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.resolve(process.cwd(), 'src');

describe('Section Image Preloader & SSR-Safe Card Opacities', () => {
  it('verifies SectionImagePreloader aggregates images across all sections', () => {
    const preloaderPath = path.join(SRC_DIR, 'components/home/shared/SectionImagePreloader.tsx');
    assert.ok(fs.existsSync(preloaderPath), 'SectionImagePreloader.tsx must exist');

    const content = fs.readFileSync(preloaderPath, 'utf8');
    assert.ok(content.includes('getAllSectionImageUrls'), 'Must export getAllSectionImageUrls');
    assert.ok(content.includes('preloadAndDecodeImage'), 'Must export preloadAndDecodeImage');
    assert.ok(content.includes('.decode()'), 'Must use browser img.decode() to prime GPU caches');
    assert.ok(content.includes('AUTUMN_WINTER_DATA'), 'Must preload Autumn-Winter cards');
    assert.ok(content.includes('EDITS_FOR_OCCASION_DATA'), 'Must preload Edits for Occasion cards');
    assert.ok(content.includes('WORTH_YOUR_ATTENTION_DATA'), 'Must preload Worth Your Attention cards');
    assert.ok(content.includes('BRIDAL_ENSEMBLES'), 'Must preload Bridal ensembles');
    assert.ok(content.includes('LATEST_TRENDS_DATA'), 'Must preload Latest Trends deck cards');
    assert.ok(content.includes('CINEMATIC_STORIES'), 'Must preload Cinematic Stories');
  });

  it('guarantees home page mounts SectionImagePreloader', () => {
    const pagePath = path.join(SRC_DIR, 'app/page.tsx');
    const content = fs.readFileSync(pagePath, 'utf8');
    assert.ok(content.includes('SectionImagePreloader'), 'Homepage must mount SectionImagePreloader');
  });

  it('verifies section cards do not use opacity: 0 in ScrollTrigger fromTo entrances', () => {
    const testFiles = [
      'components/home/WorthYourAttention.tsx',
      'components/home/AutumnWinter2026.tsx',
      'components/home/EditsForEveryOccasion.tsx',
      'components/home/LatestTrends.tsx',
      'components/home/BridalCollection.tsx',
      'components/home/NewArrivals.tsx',
      'components/home/BestSellers.tsx',
    ];

    testFiles.forEach((relPath) => {
      const fullPath = path.join(SRC_DIR, relPath);
      assert.ok(fs.existsSync(fullPath), `${relPath} must exist`);
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Ensure baseline opacity floor is >= 0.85
      assert.ok(
        content.includes('opacity: 0.85') || content.includes('opacity: 0.88'),
        `${relPath} entrance must have safe initial opacity (0.85+) to prevent white fade-out`
      );
      assert.ok(
        content.includes("start: 'top 95%'"),
        `${relPath} entrance must trigger early at top 95%`
      );
    });
  });

  it('verifies critical card components use eager image loading', () => {
    const eagerFiles = [
      'components/home/ArchedCard.tsx',
      'components/home/EditorialOccasionCard.tsx',
      'components/home/SixMoodsSection.tsx',
      'components/home/BridalCard.tsx',
      'components/home/StoryFloatingCard.tsx',
      'components/home/AttentionAccordionCard.tsx',
      'components/home/HorizontalProductCard.tsx',
    ];

    eagerFiles.forEach((relPath) => {
      const fullPath = path.join(SRC_DIR, relPath);
      assert.ok(fs.existsSync(fullPath), `${relPath} must exist`);
      const content = fs.readFileSync(fullPath, 'utf8');
      assert.ok(
        content.includes('loading="eager"'),
        `${relPath} must use loading="eager" to prevent delayed lazy image pops`
      );
    });
  });
});
