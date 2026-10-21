'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/types';

interface QuickViewContextType {
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isQuickViewOpen: boolean;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const QuickViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  return (
    <QuickViewContext.Provider
      value={{
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isQuickViewOpen: quickViewProduct !== null,
      }}
    >
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (!context) {
    return {
      quickViewProduct: null,
      openQuickView: () => {},
      closeQuickView: () => {},
      isQuickViewOpen: false,
    };
  }
  return context;
};
