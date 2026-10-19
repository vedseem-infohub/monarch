import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('BridalCollection Curved Layers Architecture', () => {
  const compPath = path.resolve('src/components/home/BridalCollection.tsx');
  const dividerPath = path.resolve('src/components/home/shared/CurvedDivider.tsx');

  const compContent = fs.readFileSync(compPath, 'utf-8');
  const dividerContent = fs.readFileSync(dividerPath, 'utf-8');

  it('verifies BridalCollection uses dark brown background', () => {
    assert.ok(compContent.includes('bg-[#240E13]'), 'Section must use rich dark brown #240E13');
    assert.ok(compContent.includes('CurvedDivider'), 'Must import and mount CurvedDivider');
  });

  it('verifies 3-tier curved layers in CurvedDivider', () => {
    assert.ok(dividerContent.includes('lightBrownColor'), 'Must accept lightBrownColor');
    assert.ok(dividerContent.includes('darkBrownColor'), 'Must accept darkBrownColor');
    assert.ok(dividerContent.includes('direction === \'toDark\''), 'Must handle toDark transition');
    assert.ok(dividerContent.includes('hasGoldBorder'), 'Must render gold border on curved layers');
  });

  it('verifies top and bottom curved transitions connect light ivory and dark brown', () => {
    assert.ok(compContent.includes('lightBrownColor="#8C6036"'), 'Must pass light brown #8C6036 to CurvedDivider');
    assert.ok(compContent.includes('darkBrownColor="#240E13"'), 'Must pass dark brown #240E13 to CurvedDivider');
    assert.ok(compContent.includes('direction="toDark"'), 'Must have top toDark transition');
    assert.ok(compContent.includes('direction="toLight"'), 'Must have bottom toLight transition');
  });
});
