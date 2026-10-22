'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { MonarchLoader } from '@/components/common/MonarchLoader';

export interface LoadingContextType {
  /** Whether a global loading overlay is currently visible */
  isLoading: boolean;
  /** Active status headline */
  message: string;
  /** Optional secondary subtitle */
  subtitle?: string;
  /** Start a global loading session with custom status text */
  startLoading: (message?: string, subtitle?: string) => void;
  /** Stop the global loading session */
  stopLoading: () => void;
  /** Convenience helper to wrap any async operation with the loader */
  withLoading: <T>(task: () => Promise<T>, message?: string, subtitle?: string) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('Curating Royal Silk...');
  const [subtitle, setSubtitle] = useState<string | undefined>('A Legacy Woven in Elegance');

  const pathname = usePathname();
  const prevPathnameRef = useRef<string>(pathname);

  // When pathname changes (route navigation completes), safely dismiss any pending programmatic loader
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      setIsLoading(false);
    }
  }, [pathname]);

  const startLoading = useCallback((msg?: string, sub?: string) => {
    if (msg) setMessage(msg);
    if (sub !== undefined) setSubtitle(sub);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  const withLoading = useCallback(
    async <T,>(task: () => Promise<T>, msg?: string, sub?: string): Promise<T> => {
      startLoading(msg, sub);
      try {
        return await task();
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        message,
        subtitle,
        startLoading,
        stopLoading,
        withLoading,
      }}
    >
      {children}

      {/* Global Programmatic Modal Loader */}
      {isLoading && (
        <MonarchLoader
          isLoading={isLoading}
          variant="fullscreen"
          message={message}
          subtitle={subtitle}
          minDisplayTime={300}
          showSkip={false}
        />
      )}
    </LoadingContext.Provider>
  );
};
