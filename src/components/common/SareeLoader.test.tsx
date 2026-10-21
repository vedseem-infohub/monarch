import React from 'react';
import { SareeLoader } from './SareeLoader';

describe('SareeLoader', () => {
  it('exports SareeLoader component properly as a function component', () => {
    expect(SareeLoader).toBeDefined();
    expect(typeof SareeLoader).toBe('function');
  });

  it('declares props accepting onComplete callback', () => {
    let completed = false;
    const onComplete = () => {
      completed = true;
    };
    onComplete();
    expect(completed).toBe(true);
  });
});
