import { ATTENTION_PRODUCTS } from '@/data/worthYourAttention';

describe('AttentionAccordionCard Component Logic', () => {
  it('contains valid data for collapsed vertical text and expanded story view', () => {
    const firstProduct = ATTENTION_PRODUCTS[0];
    expect(firstProduct.verticalText).toBe('CURRENT OFFERS');
    expect(firstProduct.attentionHeadline).toBe('Occasionwear, reduced');
    expect(firstProduct.actionHref).toBeTruthy();
  });
});
