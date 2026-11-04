'use client';

import React from 'react';
import { Lock, Sparkles } from 'lucide-react';

export interface AuthTabsProps {
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

export const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div
      role="tablist"
      aria-label="Authentication Options"
      className="inline-flex w-full p-1.5 rounded-full bg-[#1A0A0E]/80 border border-monarch-gold/30 backdrop-blur-md shadow-inner"
    >
      <button
        type="button"
        role="tab"
        id="login-tab"
        aria-selected={activeTab === 'login'}
        aria-controls="login-panel"
        onClick={() => onTabChange('login')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-nav uppercase tracking-[0.2em] transition-all duration-300 ${
          activeTab === 'login'
            ? 'bg-monarch-maroon text-monarch-gold font-semibold shadow-[0_4px_16px_rgba(90,23,37,0.6)] border border-monarch-gold/40'
            : 'text-monarch-beige/80 hover:text-monarch-ivory hover:bg-white/5'
        }`}
      >
        <Lock className={`w-3.5 h-3.5 transition-transform duration-300 ${activeTab === 'login' ? 'text-monarch-gold scale-110' : 'text-monarch-beige/60'}`} />
        <span>Privy Sign In</span>
      </button>

      <button
        type="button"
        role="tab"
        id="signup-tab"
        aria-selected={activeTab === 'signup'}
        aria-controls="signup-panel"
        onClick={() => onTabChange('signup')}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-nav uppercase tracking-[0.2em] transition-all duration-300 ${
          activeTab === 'signup'
            ? 'bg-monarch-maroon text-monarch-gold font-semibold shadow-[0_4px_16px_rgba(90,23,37,0.6)] border border-monarch-gold/40'
            : 'text-monarch-beige/80 hover:text-monarch-ivory hover:bg-white/5'
        }`}
      >
        <Sparkles className={`w-3.5 h-3.5 transition-transform duration-300 ${activeTab === 'signup' ? 'text-monarch-gold scale-110' : 'text-monarch-beige/60'}`} />
        <span>Patron Registry</span>
      </button>
    </div>
  );
};

