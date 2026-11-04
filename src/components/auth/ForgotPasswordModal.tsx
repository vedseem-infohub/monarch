'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  defaultEmail = '',
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [method, setMethod] = useState<'email' | 'whatsapp'>('email');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (defaultEmail) {
      setEmail(defaultEmail);
    }
  }, [defaultEmail]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please provide a valid royal patron email address.');
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-[#240E14] text-monarch-ivory rounded-3xl p-6 sm:p-10 border border-monarch-gold/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Subtle decorative gold glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-monarch-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-monarch-maroon/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-monarch-beige/70 hover:text-monarch-gold hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-monarch-maroon/60 border border-monarch-gold/50 flex items-center justify-center text-monarch-gold">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-nav uppercase tracking-[0.3em] text-monarch-gold-light">
              Privy Security Protocol
            </span>
            <h3 id="forgot-password-title" className="font-serif text-2xl sm:text-3xl text-monarch-ivory font-medium">
              Recovery Dossier Dispatched
            </h3>
            <p className="text-xs text-monarch-beige/80 font-sans max-w-sm mx-auto leading-relaxed">
              A private sovereign access token and reset link have been transmitted to{' '}
              <span className="text-monarch-gold font-medium">{email}</span>. Valid for the next 15 minutes.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-monarch-ivory text-xs font-nav uppercase tracking-widest font-semibold border border-monarch-gold/50 transition-all shadow-lg"
              >
                Return to Sign In
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-monarch-maroon/50 border border-monarch-gold/30 text-monarch-gold text-[10px] font-nav uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Patron Identity Restoration</span>
              </div>
              <h3 id="forgot-password-title" className="font-serif text-2xl sm:text-3xl text-monarch-ivory font-medium">
                Reset Sovereign Passcode
              </h3>
              <p className="text-xs text-monarch-beige/70 font-sans">
                Enter your registered patron email or member ID to receive an encrypted reset link.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-sans">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="recovery-email"
                  className="block text-[11px] font-nav uppercase tracking-wider text-monarch-gold-light mb-1.5"
                >
                  Registered Patron Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-monarch-beige/50" />
                  <input
                    id="recovery-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. radhika@monarch-client.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#1A0A0E] text-monarch-ivory text-xs font-sans rounded-xl border border-monarch-gold/30 placeholder:text-monarch-beige/35 focus:outline-none focus:border-monarch-gold focus:ring-1 focus:ring-monarch-gold transition-colors"
                  />
                </div>
              </div>

              <div>
                <span className="block text-[11px] font-nav uppercase tracking-wider text-monarch-beige/70 mb-2">
                  Delivery Channel
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setMethod('email')}
                    className={`py-2.5 px-3 rounded-xl border text-center font-nav uppercase tracking-wider text-[11px] transition-all ${
                      method === 'email'
                        ? 'border-monarch-gold bg-monarch-maroon/60 text-monarch-gold font-semibold shadow'
                        : 'border-white/10 bg-[#1A0A0E] text-monarch-beige/70 hover:border-monarch-gold/40'
                    }`}
                  >
                    Encrypted Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('whatsapp')}
                    className={`py-2.5 px-3 rounded-xl border text-center font-nav uppercase tracking-wider text-[11px] transition-all ${
                      method === 'whatsapp'
                        ? 'border-monarch-gold bg-monarch-maroon/60 text-monarch-gold font-semibold shadow'
                        : 'border-white/10 bg-[#1A0A0E] text-monarch-beige/70 hover:border-monarch-gold/40'
                    }`}
                  >
                    VIP WhatsApp
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex-1 py-3 px-6 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-monarch-ivory text-xs font-nav uppercase tracking-widest font-semibold border border-monarch-gold/50 flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Verifying Dossier...' : 'Send Recovery Token'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-monarch-gold" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto py-3 px-5 rounded-full bg-white/5 hover:bg-white/10 text-monarch-beige text-xs font-nav uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

