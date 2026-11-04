import { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';

export const metadata: Metadata = {
  title: 'Privy Sign In — MONARCH | Luxury Indian Ethnic Wear',
  description:
    'Sign in to your MONARCH royal patron suite. Access bespoke trousseau dossiers, private trunk shows, and dedicated couturier styling.',
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F0E5] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full border-2 border-monarch-gold border-t-transparent animate-spin" />
            <p className="text-xs font-nav uppercase tracking-widest text-monarch-gold-dark">
              Opening Royal Sanctuary...
            </p>
          </div>
        </div>
      }
    >
      <AuthLayout initialMode="login" />
    </Suspense>
  );
}

