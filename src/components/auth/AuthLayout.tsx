'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { AuthTabs } from './AuthTabs';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { AuthVisualBanner } from './AuthVisualBanner';

export interface AuthLayoutProps {
  initialMode: 'login' | 'signup';
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ initialMode }) => {
  const pathname = usePathname();
  const defaultMode = pathname.includes('signup') ? 'signup' : initialMode;
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);

  const handleTabChange = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    // Smoothly update URL without refreshing
    const targetPath = newMode === 'signup' ? '/signup' : '/login';
    if (pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F0E5] text-monarch-charcoal pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 selection:bg-monarch-maroon selection:text-monarch-gold-light">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] text-monarch-maroon hover:text-monarch-gold-dark transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Sanctuary</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-nav uppercase tracking-widest text-monarch-gold-dark">
            <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
            <span>Royal Sovereign Portal</span>
          </div>
        </div>

        {/* Master Auth Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Visual Banner */}
          <div className="lg:col-span-5 flex flex-col">
            <AuthVisualBanner mode={mode} />
          </div>

          {/* Right Column: Authentication Card & Form Panel */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 lg:p-12 border border-monarch-gold/30 shadow-[0_12px_40px_rgba(33,29,26,0.06)] relative overflow-hidden">
              {/* Subtle royal background watermark */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-monarch-gold/5 rounded-full blur-3xl pointer-events-none" />

              {/* Title & Subtitle */}
              <div className="mb-8 space-y-2">
                <span className="inline-block text-[10px] font-nav uppercase tracking-[0.3em] text-monarch-gold-dark font-semibold">
                  {mode === 'login' ? 'Private Client Authentication' : 'Exclusive Registry Invitation'}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-monarch-maroon tracking-tight">
                  {mode === 'login' ? 'Privy Sign In' : 'Join the Sovereign Registry'}
                </h1>
                <p className="text-xs sm:text-sm font-sans text-monarch-charcoal/70 leading-relaxed max-w-xl">
                  {mode === 'login'
                    ? 'Enter your patron credentials to access bespoke orders, reserved silk dossiers, and your dedicated royal stylist.'
                    : 'Experience sacred handloom weaves, hallmarked 24K zari certification, and VIP bridal salon privileges.'}
                </p>
              </div>

              {/* Pill Tab Switcher */}
              <div className="mb-8 max-w-md">
                <AuthTabs activeTab={mode} onTabChange={handleTabChange} />
              </div>

              {/* Active Tab Panel */}
              <div
                role="tabpanel"
                id={mode === 'login' ? 'login-panel' : 'signup-panel'}
                aria-labelledby={mode === 'login' ? 'login-tab' : 'signup-tab'}
                className="transition-opacity duration-300"
              >
                {mode === 'login' ? (
                  <LoginForm onSwitchToSignup={() => handleTabChange('signup')} />
                ) : (
                  <SignupForm onSwitchToLogin={() => handleTabChange('login')} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
