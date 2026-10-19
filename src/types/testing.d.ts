/**
 * Ambient type definitions for test runners (Jest / Vitest)
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare function describe(name: string, fn: () => void): void;
declare function it(name: string, fn: () => void | Promise<void>): void;
declare function test(name: string, fn: () => void | Promise<void>): void;
declare function expect(actual: any): {
  toBe(expected: any): void;
  toBeDefined(): void;
  toBeTruthy(): void;
  toBeGreaterThan(expected: number): void;
  toBeGreaterThanOrEqual(expected: number): void;
  toContain(expected: string): void;
  toMatch(pattern: RegExp | string): void;
  toEqual(expected: any): void;
  [key: string]: any;
};
