import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('BridalCollection Curved Layers Architecture', () => {
  const compPath = path.resolve('src/components/home/BridalCollection.tsx');
  const dividerPath = path.resolve('src/components/home/shared/CurvedDivider.tsx');

  const compContent = fs.readFileSync(compPath, 'utf-8');
  const dividerContent = fs.readFileSync(dividerPath, 'utf-8');

  it('verifies BridalCollection uses authentic #291116 dark brown background', () => {
    assert.ok(compContent.includes('bg-[#291116]'), 'Section must use authentic dark brown #291116');
    assert.ok(compContent.includes('CurvedDivider'), 'Must import and mount CurvedDivider');
  });

  it('verifies 3-tier curved layers in CurvedDivider', () => {
    assert.ok(dividerContent.includes('lightBrownColor'), 'Must accept lightBrownColor');
    assert.ok(dividerContent.includes('darkBrownColor'), 'Must accept darkBrownColor');
    assert.ok(dividerContent.includes("direction === 'toDark'"), 'Must handle toDark transition');
    assert.ok(dividerContent.includes('hasGoldBorder'), 'Must render gold border on curved layers');
    assert.ok(dividerContent.includes('vectorEffect="non-scaling-stroke"'), 'Must use non-scaling stroke for razor-sharp hairline');
    assert.ok(dividerContent.includes('clampedStrokeWidth'), 'Must clamp stroke width strictly to 1px-2px');
  });

  it('verifies top and bottom curved transitions connect light ivory and dark brown', () => {
    assert.ok(compContent.includes('lightBrownColor="#8C6036"'), 'Must pass light brown #8C6036 to CurvedDivider');
    assert.ok(compContent.includes('darkBrownColor="#291116"'), 'Must pass authentic dark brown #291116 to CurvedDivider');
    assert.ok(compContent.includes('direction="toDark"'), 'Must have top toDark transition');
    assert.ok(compContent.includes('direction="toLight"'), 'Must have bottom toLight transition');
  });
});
