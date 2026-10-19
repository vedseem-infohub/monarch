/**
 * Centralized formatting utilities for Indian Rupee currency and numbers.
 */

export const formatINR = (amount: number): string => {
  return '₹ ' + amount.toLocaleString('en-IN');
};
