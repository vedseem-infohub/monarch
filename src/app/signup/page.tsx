import { Suspense } from 'react';
import type { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';

export const metadata: Metadata = {
  title: 'Patron Registration — MONARCH | Luxury Indian Ethnic Wear',
  description:
    'Join the MONARCH Royal Patron Registry. Receive first access to sacred handloom weaves, hallmarked 24K zari certification, and VIP bridal salon privileges.',
};

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F0E5] flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full border-2 border-monarch-gold border-t-transparent animate-spin" />
            <p className="text-xs font-nav uppercase tracking-widest text-monarch-gold-dark">
              Preparing Royal Registry...
            </p>
          </div>
        </div>
      }
    >
      <AuthLayout initialMode="signup" />
    </Suspense>
  );
}

