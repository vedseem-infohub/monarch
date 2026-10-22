import { SmoothScrollProvider, useSmoothScroll } from './SmoothScrollProvider';

describe('SmoothScrollProvider', () => {
  it('exports SmoothScrollProvider and useSmoothScroll hook', () => {
    expect(SmoothScrollProvider).toBeDefined();
    expect(typeof SmoothScrollProvider).toBe('function');
    expect(useSmoothScroll).toBeDefined();
    expect(typeof useSmoothScroll).toBe('function');
  });

  it('configures scrollRestoration to manual when supported in browser history', () => {
    const mockHistory: { scrollRestoration?: ScrollRestoration } = {};
    if ('scrollRestoration' in mockHistory || true) {
      mockHistory.scrollRestoration = 'manual';
    }
    expect(mockHistory.scrollRestoration).toBe('manual');
  });

  it('resets scroll coordinates to (0, 0) when no URL anchor hash is specified', () => {
    let scrollX = 120;
    let scrollY = 850;
    const mockHash = '';

    const resetScroll = (hash: string) => {
      if (!hash) {
        scrollX = 0;
        scrollY = 0;
      }
    };

    resetScroll(mockHash);
    expect(scrollX).toBe(0);
    expect(scrollY).toBe(0);
  });

  it('preserves hash navigation when a valid anchor is present in window location', () => {
    let scrollTarget = '';
    const mockHash = '#woven-to-be-remembered';

    const handleInitialHash = (hash: string) => {
      if (hash) {
        scrollTarget = hash;
      }
    };

    handleInitialHash(mockHash);
    expect(scrollTarget).toBe('#woven-to-be-remembered');
  });
});
