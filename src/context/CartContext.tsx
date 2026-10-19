'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, Product, PromoCode, CustomMeasurements } from '@/types';
import { PROMO_CODES } from '@/data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity?: number,
    customMeasurements?: CustomMeasurements,
    openCart?: boolean
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  totalAmount: number;
  freeShippingThreshold: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'monarch_cart_v1';
const PROMO_KEY = 'monarch_promo_v1';
const FREE_SHIPPING_THRESHOLD = 50000;
const STANDARD_SHIPPING_FEE = 2500;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedPromo = localStorage.getItem(PROMO_KEY);
      if (savedPromo) {
        const found = PROMO_CODES.find((p) => p.code === savedPromo);
        if (found) setAppliedPromo(found);
      }
    } catch (e) {
      console.warn('Error reading cart from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      if (appliedPromo) {
        localStorage.setItem(PROMO_KEY, appliedPromo.code);
      } else {
        localStorage.removeItem(PROMO_KEY);
      }
    } catch (e) {
      console.warn('Error saving cart to localStorage', e);
    }
  }, [cart, appliedPromo, isInitialized]);

  const addToCart = (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity = 1,
    customMeasurements?: CustomMeasurements,
    openCart = true
  ) => {
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity, customMeasurements }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          selectedColor,
          selectedSize,
          quantity,
          customMeasurements,
        },
      ];
    });
    if (openCart) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid courtesy promo code.' };
    }
    if (found.minOrderValue && subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `This privilege code requires a minimum order of ₹${found.minOrderValue.toLocaleString('en-IN')}.`,
      };
    }
    setAppliedPromo(found);
    return {
      success: true,
      message: `${found.code} applied! Enjoy your royal courtesy discount.`,
    };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.minOrderValue && subtotal < appliedPromo.minOrderValue) {
      return 0;
    }
    if (appliedPromo.discountType === 'percentage') {
      return Math.round((subtotal * appliedPromo.discountValue) / 100);
    }
    return Math.min(subtotal, appliedPromo.discountValue);
  }, [subtotal, appliedPromo]);

  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  }, [subtotal, cart.length]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + shippingCost);
  }, [subtotal, discountAmount, shippingCost]);

  const totalCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedPromo,
        applyPromo,
        removePromo,
        subtotal,
        discountAmount,
        shippingCost,
        totalAmount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
