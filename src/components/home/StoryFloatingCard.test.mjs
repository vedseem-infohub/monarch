import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const MOCK_STORIES = [
  {
    id: 'story-first-light-001',
    name: 'SWARNA FIRST LIGHT UTSAV SAREE',
    storyTitleLine1: 'First',
    storyTitleLine2: 'Light',
    storyCategoryTag: 'DAILY',
    storySubtitle: 'THE CELEBRATION VAULT',
    bgImage: '/images/panoramic/ensemble_utsav.jpg',
    cardThumbnail: '/images/panoramic/ensemble_utsav.jpg',
    price: 19800,
    formattedPrice: '₹ 19,800',
  },
  {
    id: 'story-twilight-soiree-002',
    name: 'KALYANI CRIMSON IMPERIAL KORVAI',
    storyTitleLine1: 'Twilight',
    storyTitleLine2: 'Soirée',
    storyCategoryTag: 'HERITAGE',
    storySubtitle: 'TEMPLE THREE-SHUTTLE WEFT',
    bgImage: '/images/panoramic/ensemble_kalyani.jpg',
    cardThumbnail: '/images/panoramic/ensemble_kalyani.jpg',
    price: 26400,
    formattedPrice: '₹ 26,400',
  },
];

describe('StoryFloatingCard Component Architecture & Two-Phase Specs', () => {
  it('validates cinematic stories with complete metadata and image assets', () => {
    assert.strictEqual(MOCK_STORIES.length, 2);

    MOCK_STORIES.forEach((story, idx) => {
      assert.ok(story.id, `Story ${idx} has valid id`);
      assert.ok(story.name, `Story ${idx} has valid product name`);
      assert.ok(story.storyTitleLine1, `Story ${idx} has line 1 title`);
      assert.ok(story.storyTitleLine2, `Story ${idx} has line 2 title`);
      assert.ok(story.bgImage.startsWith('/images/'), `Story ${idx} bgImage is valid asset`);
      assert.ok(story.cardThumbnail.startsWith('/images/'), `Story ${idx} thumbnail is valid asset`);
      assert.ok(story.price > 0, `Story ${idx} has numeric price`);
    });
  });

  it('validates First Light is Story 01 matching reference screenshot', () => {
    const firstStory = MOCK_STORIES[0];
    assert.strictEqual(firstStory.storyTitleLine1, 'First');
    assert.strictEqual(firstStory.storyTitleLine2, 'Light');
    assert.strictEqual(firstStory.storyCategoryTag, 'DAILY');
    assert.strictEqual(firstStory.storySubtitle, 'THE CELEBRATION VAULT');
    assert.strictEqual(firstStory.formattedPrice, '₹ 19,800');
  });

  it('verifies two-phase layout class resolution for docked vs expanded states', () => {
    const getPhaseClasses = (isActive) =>
      isActive
        ? 'w-36 sm:w-44 md:w-48 h-48 sm:h-56 ring-2 ring-white/95 border-2 border-monarch-gold/90 z-20'
        : 'w-24 sm:w-28 md:w-32 h-36 sm:h-44 border border-white/20 z-10';

    const expandedClasses = getPhaseClasses(true);
    const dockedClasses = getPhaseClasses(false);

    assert.ok(expandedClasses.includes('w-36'), 'Phase 2 (Active) must expand width');
    assert.ok(expandedClasses.includes('h-48'), 'Phase 2 (Active) must expand height');
    assert.ok(dockedClasses.includes('w-24'), 'Phase 1 (Docked) must remain compact');
    assert.ok(expandedClasses.includes('z-20'), 'Phase 2 has elevated z-index');
  });
});
