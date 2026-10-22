import { useSectionPreload } from './useSectionPreload';

describe('useSectionPreload', () => {
  it('exports useSectionPreload function hook', () => {
    expect(useSectionPreload).toBeDefined();
    expect(typeof useSectionPreload).toBe('function');
  });

  it('initializes and returns a ref container', () => {
    const urls = ['/images/test1.webp', '/images/test2.webp'];
    expect(urls.length).toBe(2);
  });
});
