import { AuthProvider, useAuth } from './AuthContext';
import { DEMO_PATRON } from '@/data/auth';

describe('AuthContext', () => {
  it('exports AuthProvider and useAuth hook', () => {
    expect(AuthProvider).toBeDefined();
    expect(typeof AuthProvider).toBe('function');
    expect(useAuth).toBeDefined();
    expect(typeof useAuth).toBe('function');
  });

  it('contains valid demo patron credentials in auth data', () => {
    expect(DEMO_PATRON.email).toBe('radhika@monarch-client.com');
    expect(DEMO_PATRON.name).toBe('Maharani Radhika Devi');
    expect(DEMO_PATRON.memberId).toBe('MONARCH-VIP-0042');
  });
});

