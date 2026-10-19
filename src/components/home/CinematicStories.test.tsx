import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { CINEMATIC_STORIES } from '@/data/cinematicStories';

describe('CinematicStories Full-Screen Showcase Integration', () => {
  it('confirms all stories implement full Product interface', () => {
    CINEMATIC_STORIES.forEach((story) => {
      assert.ok(story.id);
      assert.ok(story.name);
      assert.ok(story.slug);
      assert.ok(story.description);
      assert.ok(story.category);
      assert.ok(story.gender);
      assert.ok(story.fabric);
      assert.ok(story.images.length >= 1);
      assert.ok(story.colors.length >= 1);
      assert.ok(story.sizes.length >= 1);
    });
  });
});
