import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CINEMATIC_STORIES } from '@/data/cinematicStories';

describe('StoryFloatingCard Component Props & Data Validation', () => {
  it('has 4 valid stories with distinct imagery and metadata', () => {
    assert.strictEqual(CINEMATIC_STORIES.length, 4);
    assert.strictEqual(CINEMATIC_STORIES[0].storyTitleLine1, 'First');
    assert.strictEqual(CINEMATIC_STORIES[0].storyTitleLine2, 'Light');
    assert.ok(CINEMATIC_STORIES[0].bgImage.startsWith('/images/'));
  });

  it('validates prices are numeric numbers', () => {
    CINEMATIC_STORIES.forEach((story) => {
      assert.strictEqual(typeof story.price, 'number');
      assert.ok(story.price > 10000);
      assert.ok(story.formattedPrice.includes('₹'));
    });
  });
});
