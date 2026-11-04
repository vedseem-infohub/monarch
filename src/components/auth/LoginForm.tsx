'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { DEMO_PATRON } from '@/data/auth';
import { ForgotPasswordModal } from './ForgotPasswordModal';

export interface LoginFormProps {
  onSwitchToSignup?: () => void;
  redirectTo?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, redirectTo }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = redirectTo || searchParams.get('redirect') || '/account';

  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleFillDemo = () => {
    setEmail(DEMO_PATRON.email);
    setPassword(DEMO_PATRON.password);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await login(email, password, rememberMe);

    if (!result.success) {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
      setIsSubmitting(false);
      return;
    }

    setIsSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      router.push(destination);
    }, 800);
  };

  return (
    <div className="w-full">
      {/* Demo Credentials Quick-Fill Helper Banner */}
      {/* <div className="mb-6 p-3.5 rounded-2xl bg-[#1A0A0E] border border-monarch-gold/30 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-monarch-maroon/80 border border-monarch-gold/40 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
          </div>
          <div className="text-left">
            <span className="block text-[10px] font-nav uppercase tracking-wider text-monarch-gold-light font-medium">
              Royal Sovereign Demo Patron
            </span>
            <span className="text-[11px] text-monarch-beige/70 font-sans">
              radhika@monarch-client.com
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleFillDemo}
          className="shrink-0 px-3 py-1.5 rounded-full bg-monarch-maroon/70 hover:bg-monarch-maroon text-monarch-gold-light hover:text-white border border-monarch-gold/40 text-[10px] font-nav uppercase tracking-wider transition-all"
        >
          Auto-Fill
        </button>
      </div> */}

      {/* Error Banner */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-2xl bg-red-950/70 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs font-sans animate-fadeIn"
        >
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-red-300 font-nav uppercase text-[10px] tracking-wider block">
              Access Restricted
            </span>
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Success Banner */}
      {isSuccess && (
        <div
          role="status"
          className="mb-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 flex items-center gap-3 text-emerald-200 text-xs font-sans animate-fadeIn"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Sovereign Identity Verified. Admitting to Royal Salon...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-xs font-nav uppercase tracking-wider text-monarch-charcoal/80 mb-2 font-medium"
          >
            Patron Email / Member ID
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-monarch-charcoal/40" />
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. radhika@monarch-client.com"
              className="w-full pl-11 pr-4 py-3.5 bg-white text-monarch-charcoal text-xs font-sans rounded-xl border border-monarch-beige hover:border-monarch-gold/70 focus:outline-none focus:border-monarch-gold focus:ring-1 focus:ring-monarch-gold transition-colors shadow-sm placeholder:text-monarch-charcoal/30"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="login-password"
              className="block text-xs font-nav uppercase tracking-wider text-monarch-charcoal/80 font-medium"
            >
              Security Key / Passcode
            </label>
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-[11px] font-nav uppercase tracking-wider text-monarch-maroon hover:text-monarch-gold-dark hover:underline transition-colors"
            >
              Forgot Passcode?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-monarch-charcoal/40" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-11 pr-11 py-3.5 bg-white text-monarch-charcoal text-xs font-sans rounded-xl border border-monarch-beige hover:border-monarch-gold/70 focus:outline-none focus:border-monarch-gold focus:ring-1 focus:ring-monarch-gold transition-colors shadow-sm placeholder:text-monarch-charcoal/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide security key' : 'Show security key'}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-monarch-charcoal/40 hover:text-monarch-maroon transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-monarch-maroon focus:ring-monarch-gold border-monarch-beige"
            />
            <span className="text-xs text-monarch-charcoal/70 font-sans">
              Remember my patron session on this device
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="w-full py-4 px-6 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory text-xs font-nav uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-2.5 shadow-[0_8px_24px_rgba(90,23,37,0.3)] transition-all duration-300 disabled:opacity-60 border border-monarch-gold/40 group"
          >
            <span>{isSubmitting ? 'Authenticating with Vault...' : 'Enter Royal Sanctuary'}</span>
            <ArrowRight className="w-4 h-4 text-monarch-gold transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Security Assurance Badge */}
        <div className="pt-3 flex items-center justify-center gap-2 text-[11px] text-monarch-charcoal/60 font-sans">
          <ShieldCheck className="w-4 h-4 text-monarch-gold-dark" />
          <span>256-bit Sovereign SSL &amp; Blockchain Authenticity Protocol</span>
        </div>

        {/* Switch to Signup Link */}
        {onSwitchToSignup && (
          <div className="pt-4 border-t border-monarch-beige/60 text-center">
            <p className="text-xs text-monarch-charcoal/70 font-sans">
              Not yet registered in the Royal Registry?{' '}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="font-nav uppercase tracking-wider text-monarch-maroon font-semibold hover:text-monarch-gold-dark hover:underline ml-1"
              >
                Request Patron Membership
              </button>
            </p>
          </div>
        )}
      </form>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        defaultEmail={email}
      />
    </div>
  );
};

