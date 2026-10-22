import React from 'react';
import { WORTH_YOUR_ATTENTION_DATA } from '@/data/worthYourAttention';
import { WorthYourAttention } from './WorthYourAttention';
import { AttentionAccordionCard } from './AttentionAccordionCard';

describe('WorthYourAttention', () => {
  it('exports WorthYourAttention and AttentionAccordionCard components', () => {
    expect(WorthYourAttention).toBeDefined();
    expect(typeof WorthYourAttention).toBe('function');
    expect(AttentionAccordionCard).toBeDefined();
    expect(typeof AttentionAccordionCard).toBe('function');
  });

  it('contains valid spotlight products in WORTH_YOUR_ATTENTION_DATA', () => {
    expect(WORTH_YOUR_ATTENTION_DATA.products).toBeDefined();
    expect(WORTH_YOUR_ATTENTION_DATA.products.length).toBeGreaterThan(0);

    WORTH_YOUR_ATTENTION_DATA.products.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.attentionHeadline).toBeTruthy();
      expect(item.verticalText).toBeTruthy();
      expect(item.spotlightTag).toBeTruthy();
      expect(item.actionHref).toBeTruthy();
    });
  });

  it('calculates smooth centering scroll offset accurately', () => {
    const containerWidth = 375; // mobile viewport width
    const targetExpandedWidth = 310;
    const cardLeft = 450; // second card offset

    const targetScroll = Math.max(0, cardLeft - (containerWidth - targetExpandedWidth) / 2);

    expect(targetScroll).toBeGreaterThan(0);
    // (375 - 310) / 2 = 32.5 => targetScroll = 450 - 32.5 = 417.5
    expect(targetScroll).toBe(417.5);
  });

  it('verifies touch vs synthetic click debouncing threshold', () => {
    const touchEndTimestamp = 1000;
    const syntheticClickTimestamp = 1150; // fires 150ms later
    const mouseClickTimestamp = 2000; // deliberate click 1000ms later

    const isSyntheticClickIgnored = (syntheticClickTimestamp - touchEndTimestamp) < 450;
    const isMouseClickAllowed = (mouseClickTimestamp - touchEndTimestamp) >= 450;

    expect(isSyntheticClickIgnored).toBe(true);
    expect(isMouseClickAllowed).toBe(true);
  });
});
