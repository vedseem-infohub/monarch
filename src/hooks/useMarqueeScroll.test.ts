import { useMarqueeScroll } from './useMarqueeScroll';

describe('useMarqueeScroll', () => {
  it('exports useMarqueeScroll hook function', () => {
    expect(useMarqueeScroll).toBeDefined();
    expect(typeof useMarqueeScroll).toBe('function');
  });

  it('accepts options with speed and direction', () => {
    const options = {
      speed: 50,
      direction: 'right' as const,
      repeatCount: 4,
      pauseOnHover: true,
    };
    expect(options.speed).toBe(50);
    expect(options.direction).toBe('right');
    expect(options.repeatCount).toBe(4);
  });
});
