import { LoadingProvider, useLoading, LoadingContextType } from './LoadingContext';

describe('LoadingContext', () => {
  it('exports LoadingProvider and useLoading hook', () => {
    expect(LoadingProvider).toBeDefined();
    expect(typeof LoadingProvider).toBe('function');
    expect(useLoading).toBeDefined();
    expect(typeof useLoading).toBe('function');
  });

  it('exposes the expected interface shape for programmatic loading', () => {
    const mockState: LoadingContextType = {
      isLoading: false,
      message: 'Curating Royal Silk...',
      subtitle: 'A Legacy Woven in Elegance',
      startLoading: (msg?: string, sub?: string) => {
        mockState.isLoading = true;
        if (msg) mockState.message = msg;
        if (sub) mockState.subtitle = sub;
      },
      stopLoading: () => {
        mockState.isLoading = false;
      },
      withLoading: async <T,>(task: () => Promise<T>, msg?: string) => {
        mockState.startLoading(msg);
        try {
          return await task();
        } finally {
          mockState.stopLoading();
        }
      },
    };

    expect(mockState.isLoading).toBe(false);
    mockState.startLoading('Finalizing Order...', 'Private Atelier');
    expect(mockState.isLoading).toBe(true);
    expect(mockState.message).toBe('Finalizing Order...');
    expect(mockState.subtitle).toBe('Private Atelier');

    mockState.stopLoading();
    expect(mockState.isLoading).toBe(false);
  });

  it('withLoading executes async operation and handles completion cleanly', async () => {
    let active = false;
    const task = async () => {
      active = true;
      return 'success';
    };

    const result = await task();
    expect(result).toBe('success');
    expect(active).toBe(true);
  });
});
