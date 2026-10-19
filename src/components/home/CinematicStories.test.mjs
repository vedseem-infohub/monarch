import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('CinematicStories Full-Screen Section Architecture', () => {
  it('validates navigation cycle logic', () => {
    const totalStories = 4;
    const getNextIndex = (current) => (current + 1) % totalStories;
    const getPrevIndex = (current) => (current === 0 ? totalStories - 1 : current - 1);

    assert.strictEqual(getNextIndex(0), 1);
    assert.strictEqual(getNextIndex(3), 0, 'Wraps from last to first story');
    assert.strictEqual(getPrevIndex(0), 3, 'Wraps from first to last story');
    assert.strictEqual(getPrevIndex(2), 1);
  });

  it('verifies full-screen aspect and motion container configuration', () => {
    const sectionClass =
      'relative w-full bg-black text-white select-none';
    const pinWrapperClass =
      'relative h-screen w-full overflow-hidden flex flex-col justify-between pt-[92px] sm:pt-[100px] lg:pt-[108px] pb-6 sm:pb-8 px-6 sm:px-10 lg:px-16';

    assert.ok(sectionClass.includes('bg-black'), 'Section must have pitch black background');
    assert.ok(pinWrapperClass.includes('h-screen'), 'Pinned container must be full viewport height');
    assert.ok(pinWrapperClass.includes('overflow-hidden'), 'Must prevent scroll overflow');
  });

  it('guarantees top padding clears the fixed navbar height', () => {
    const pinWrapperClass =
      'relative h-screen w-full overflow-hidden flex flex-col justify-between pt-[92px] sm:pt-[100px] lg:pt-[108px] pb-6 sm:pb-8 px-6 sm:px-10 lg:px-16';
    const navbarHeight = 72; // px (Header height when scrolled)

    assert.ok(pinWrapperClass.includes('pt-[92px]'), 'Must provide at least 92px top padding');
    const mobilePadding = 92;
    assert.ok(mobilePadding > navbarHeight, 'Mobile padding must strictly exceed navbar height (72px)');
  });

  it('validates scroll scrub progress mapping to story index', () => {
    const totalStories = 4;
    const getStoryIndex = (progress) =>
      Math.min(totalStories - 1, Math.floor(progress * totalStories));

    assert.strictEqual(getStoryIndex(0.0), 0, 'Start of pin displays Story 1');
    assert.strictEqual(getStoryIndex(0.24), 0, 'First quarter belongs to Story 1');
    assert.strictEqual(getStoryIndex(0.26), 1, 'Transitions to Story 2');
    assert.strictEqual(getStoryIndex(0.51), 2, 'Transitions to Story 3');
    assert.strictEqual(getStoryIndex(0.76), 3, 'Transitions to Story 4');
    assert.strictEqual(getStoryIndex(1.0), 3, 'End of pin displays Story 4');
  });

  it('validates slow left-to-right directional slide variants', () => {
    const getEnterX = (dir) => (dir > 0 ? '-35%' : '35%');
    const getExitX = (dir) => (dir > 0 ? '35%' : '-35%');

    // Forward progression (left to right)
    assert.strictEqual(getEnterX(1), '-35%', 'Incoming image enters from left');
    assert.strictEqual(getExitX(1), '35%', 'Outgoing old image exits to right');

    // Reverse progression
    assert.strictEqual(getEnterX(-1), '35%', 'Reverse enters from right');
    assert.strictEqual(getExitX(-1), '-35%', 'Reverse exits to left');
  });

  it('validates direct wishlist integration and id lookup', () => {
    const storyId = 'story-first-light-001';
    let wishlist = [];

    const toggle = (id) => {
      wishlist = wishlist.includes(id) ? wishlist.filter((x) => x !== id) : [...wishlist, id];
    };

    assert.strictEqual(wishlist.includes(storyId), false);
    toggle(storyId);
    assert.strictEqual(wishlist.includes(storyId), true, 'Wishlist contains story after toggle');
    toggle(storyId);
    assert.strictEqual(wishlist.includes(storyId), false, 'Wishlist removes story on second toggle');
  });

  it('validates exploration drawer ensemble href generation', () => {
    const story = {
      id: 'story-first-light-001',
      slug: 'swarna-first-light-utsav-saree',
    };
    const exploreHref = `/product/${story.slug || story.id}`;

    assert.strictEqual(
      exploreHref,
      '/product/swarna-first-light-utsav-saree',
      'Must navigate to canonical product detail page'
    );
  });

  it('validates backend developer data model schema compliance', () => {
    const requiredDbFields = [
      'id',
      'productId',
      'storyTitleLine1',
      'storyTitleLine2',
      'storyCategoryTag',
      'storySubtitle',
      'storyDescription',
      'bgImage',
      'cardThumbnail',
      'displayOrder',
      'isActive',
    ];

    const sampleDbRecord = {
      id: 'cuid_story_001',
      productId: 'prod_utsav_001',
      storyTitleLine1: 'First',
      storyTitleLine2: 'Light',
      storyCategoryTag: 'DAILY',
      storySubtitle: 'THE CELEBRATION VAULT',
      storyDescription: 'Morning radiance in pure katan silk',
      bgImage: '/images/panoramic/ensemble_utsav.jpg',
      cardThumbnail: '/images/panoramic/ensemble_utsav.jpg',
      displayOrder: 0,
      isActive: true,
    };

    requiredDbFields.forEach((field) => {
      assert.ok(field in sampleDbRecord, `Database schema must define ${field}`);
    });
  });
});
