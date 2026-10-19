import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('BridalCollection Curved Architecture Verification', () => {
  const compPath = path.resolve('src/components/home/BridalCollection.tsx');
  const dividerPath = path.resolve('src/components/home/shared/CurvedDivider.tsx');

  const compContent = fs.readFileSync(compPath, 'utf-8');
  const dividerContent = fs.readFileSync(dividerPath, 'utf-8');

  it('verifies BridalCollection mounts CurvedDivider with original color scheme', () => {
    assert.ok(compContent.includes('CurvedDivider'), 'Must import and mount CurvedDivider');
    assert.ok(compContent.includes('direction="toDark"'), 'Must have top toDark transition');
    assert.ok(compContent.includes('direction="toLight"'), 'Must have bottom toLight transition');
  });

  it('verifies CurvedDivider uses authentic #291116 burgundy and #F7F0E5 ivory', () => {
    assert.ok(dividerContent.includes('#291116'), 'Must use authentic #291116 burgundy');
    assert.ok(dividerContent.includes('#F7F0E5'), 'Must use authentic #F7F0E5 ivory');
    assert.ok(dividerContent.includes('hasGoldBorder'), 'Must render gold border accent');
  });
});
