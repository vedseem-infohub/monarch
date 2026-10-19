import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('HeroSection Component & Data Architecture Verification', async (t) => {
  const heroComponentPath = path.resolve(process.cwd(), 'src/components/home/HeroSection.tsx');
  const heroDataPath = path.resolve(process.cwd(), 'src/data/hero.ts');
  const layoutPath = path.resolve(process.cwd(), 'src/app/layout.tsx');

  const heroContent = fs.readFileSync(heroComponentPath, 'utf-8');
  const heroDataContent = fs.readFileSync(heroDataPath, 'utf-8');
  const layoutContent = fs.readFileSync(layoutPath, 'utf-8');

  await t.test('verifies all overlays are completely removed for 100% clean frames', () => {
    // Ensure all fullscreen scrims and vignettes are removed
    assert.ok(
      !heroContent.includes('radial-gradient(circle at center'),
      'Fullscreen heavy radial-gradient overlay must be removed'
    );
    assert.ok(
      !heroContent.includes('bg-gradient-to-t from-[#1A0A0E]'),
      'Fullscreen vertical dark scrim must be removed'
    );
    assert.ok(
      !heroContent.includes('bg-gradient-to-r from-[#1A0A0E]'),
      'Fullscreen horizontal dark scrim must be removed'
    );
    // Ensure any glassmorphic or backdrop card overlays behind text are removed
    assert.ok(
      !heroContent.includes('backdrop-blur-['),
      'Backdrop blur boxes covering frames must be removed for pure clean frames'
    );
    assert.ok(
      !heroContent.includes('linear-gradient(135deg'),
      'Gradient card overlay behind text must be removed'
    );
    // Ensure dark blocking ambient loader is removed
    assert.ok(
      !heroContent.includes('!isFirstFrameReady && ('),
      'Blocking ambient loader overlay must be removed in favor of clean starting frame'
    );
  });

  await t.test('verifies starting frame poster is present, clean, and preloaded', () => {
    // Image tag with starting frame
    assert.ok(
      heroContent.includes('initialPosterPath'),
      'HeroSection must render initialPosterPath for instant starting frame'
    );
    assert.ok(
      heroContent.includes('loading="eager"'),
      'Starting frame must load eagerly'
    );
    assert.ok(
      heroContent.includes('fetchPriority="high"'),
      'Starting frame must have high fetch priority'
    );
    // Preload link in RootLayout
    assert.ok(
      layoutContent.includes('/hero-frames/frame_001.webp'),
      'RootLayout must preload /hero-frames/frame_001.webp'
    );
    // Starting frame file exists in data
    assert.ok(
      heroDataContent.includes('frame_001.webp'),
      'hero.ts data file must specify initialPosterPath as frame_001.webp'
    );
  });

  await t.test('verifies clean frame text styling with direct text-shadow', () => {
    assert.ok(
      heroContent.includes('[text-shadow:'),
      'Typography must feature direct CSS text-shadow for high-contrast readability on clean frames'
    );
    assert.ok(
      heroContent.includes('textContainerRef'),
      'Micro-parallax and text container must be present'
    );
  });

  await t.test('verifies Lenis and useGSAP ScrollTrigger integration per Rule 2', () => {
    assert.ok(
      heroContent.includes('useGSAP'),
      'HeroSection must use useGSAP hook per Rule 2'
    );
    assert.ok(
      heroContent.includes('ScrollTrigger'),
      'HeroSection must use ScrollTrigger'
    );
    assert.ok(
      heroContent.includes('useSmoothScroll'),
      'HeroSection must access Lenis via useSmoothScroll'
    );
    assert.ok(
      heroContent.includes('lenis.scrollTo'),
      'HeroSection must use lenis.scrollTo for interactive chapter and advance navigation'
    );
    // Ensure double-smoothing LERP loop is removed
    assert.ok(
      !heroContent.includes('currentFrameRef.current += diff * 0.2'),
      'Sluggish secondary LERP loop must be replaced by direct ScrollTrigger synchronization'
    );
  });

  await t.test('verifies decoupled data architecture per Rule 4', () => {
    assert.ok(
      heroDataContent.includes('HERO_CONFIG'),
      'hero.ts must export HERO_CONFIG'
    );
    assert.ok(
      heroDataContent.includes('HERO_FRAME_PATHS'),
      'hero.ts must export HERO_FRAME_PATHS'
    );
    assert.ok(
      heroDataContent.includes('totalFrames: 79'),
      'hero.ts must define totalFrames: 79'
    );
  });
});
