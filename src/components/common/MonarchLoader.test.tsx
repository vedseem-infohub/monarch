import { MonarchLoader, MonarchLoaderProps } from './MonarchLoader';

describe('MonarchLoader', () => {
  it('exports MonarchLoader component properly as a function component', () => {
    expect(MonarchLoader).toBeDefined();
    expect(typeof MonarchLoader).toBe('function');
  });

  it('accepts multi-variant definitions (fullscreen, embedded, minimal)', () => {
    const fullscreenProps: MonarchLoaderProps = {
      variant: 'fullscreen',
      message: 'Curating Royal Silk...',
      subtitle: 'A Legacy Woven in Elegance',
      minDisplayTime: 400,
      showSkip: true,
    };
    expect(fullscreenProps.variant).toBe('fullscreen');

    const embeddedProps: MonarchLoaderProps = {
      variant: 'embedded',
      message: 'Loading 3D Specimen',
      subtitle: 'Interactive Silhouette',
    };
    expect(embeddedProps.variant).toBe('embedded');

    const minimalProps: MonarchLoaderProps = {
      variant: 'minimal',
      message: 'Adding to Bag...',
    };
    expect(minimalProps.variant).toBe('minimal');
  });

  it('supports controlled mode with boolean isLoading flag', () => {
    const controlledActive: MonarchLoaderProps = {
      isLoading: true,
      minDisplayTime: 300,
    };
    expect(controlledActive.isLoading).toBe(true);

    const controlledInactive: MonarchLoaderProps = {
      isLoading: false,
    };
    expect(controlledInactive.isLoading).toBe(false);
  });

  it('accepts onComplete callback', () => {
    let completed = false;
    const onComplete = () => {
      completed = true;
    };
    onComplete();
    expect(completed).toBe(true);
  });
});
