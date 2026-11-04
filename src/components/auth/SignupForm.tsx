'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export interface SignupFormProps {
  onSwitchToLogin?: () => void;
  redirectTo?: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, redirectTo }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = redirectTo || searchParams.get('redirect') || '/account';

  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    registryOptIn: true,
    termsAccepted: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const pw = formData.password;
    if (!pw) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pw.length >= 6) score += 1;
    if (pw.length >= 10) score += 1;
    if (/[A-Z]/.test(pw)) score += 1;
    if (/[0-9]/.test(pw)) score += 1;
    if (/[^A-Za-z0-9]/.test(pw)) score += 1;

    if (score <= 1) return { score: 1, label: 'Modest', color: 'bg-amber-600' };
    if (score <= 2) return { score: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (score <= 3) return { score: 3, label: 'Strong', color: 'bg-emerald-600' };
    return { score: 4, label: 'Sovereign', color: 'bg-monarch-gold' };
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please state your full name for the Royal Registry.');
      return;
    }

    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Security passcode must contain at least 6 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passcodes do not match. Please verify both entries.');
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage('Please acknowledge the House of Monarch Terms & Sanctuary Charter.');
      return;
    }

    setIsSubmitting(true);

    const result = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (!result.success) {
      setErrorMessage(result.error || 'Registration could not be completed.');
      setIsSubmitting(false);
      return;
    }

    setIsSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      router.push(destination);
    }, 1000);
  };

  return (
    <div className="w-full">
      {/* Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-2xl bg-red-950/70 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs font-sans animate-fadeIn"
        >
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-red-300 font-nav uppercase text-[10px] tracking-wider block">
              Registry Requirement
            </span>
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {isSuccess && (
        <div
          role="status"
          className="mb-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 flex items-center gap-3 text-emerald-200 text-xs font-sans animate-fadeIn"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Membership Enacted with Honor. Escorting to Your Royal Suite...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="signup-name"
            className="block text-xs font-nav uppercase tracking-wider text-monarch-charcoal/80 mb-1.5 font-medium"
          >
            Full Name &amp; Royal Honorific
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-monarch-charcoal/40" />
            <input
              id="signup-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Maharani Radhika Devi"
              className="w-full pl-11 pr-4 py-3 bg-white text-monarch-charcoal text-xs font-sans rounded-xl border border-monarch-beige hover:border-monarch-gold/70 focus:outline-none focus:border-monarch-gold focus:ring-1 focus:ring-monarch-gold transition-colors shadow-sm placeholder:text-monarch-charcoal/30"
            />
          </div>
        </div>

        {/* Email & Phone in 2-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="signup-email"
              className="block text-xs font-nav uppercase tracking-wider text-monarch-charcoal/80 mb-1.5 font-medium"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-monarch-charcoal/40" />
              <input
                id="signup-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="radhika@domain.com"
                className="w-full pl-11 pr-4 py-3 bg-white text-monarch-charcoal text-xs font-sans rounded-xl border border-monarch-beige hover:border-monarch-gold/70 focus:outline-none focus:border-monarch-gold focus:ring-1 focus:ring-monarch-gold transition-colors shadow-sm placeholder:text-monarch-charcoal/30"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-phone"
              className="block text-xs font-nav uppercase tracking-wider text-monarch-charcoal/80 mb-1.5 font-medium"
            >
              Contact / VIP Mobile
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-monarch-charcoal/40" />
              <input
                id="signup-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98200 12345"
                className="w-full pl-11 pr-4 py-3 bg-white text-monarch-charcoal text-xs font-sans rounded-xl border border-monarch-beige hover:border-monarch-gold/70 focus:outline-none focus:border-monarch-gold focus:ring-1 focus:ring-monarch-gold transition-colors shadow-sm placeholder:text-monarch-charcoal/30"
              />
            </div>
          </div>
        </div>

        {/* Password & Confirm Password Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="signup-password"
              className="block text-xs font-nav uppercase tracking-wider text-monarch-charcoal/80 mb-1.5 font-medium"
            >
              Passcode
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-monarch-charcoal/40" />
              <input
                id="signup-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 chars"
                className="w-full pl-11 pr-10 py-3 bg-white text-monarch-charcoal text-xs font-sans rounded-xl border border-monarch-beige hover:border-monarch-gold/70 focus:outline-none focus:border-monarch-gold focus:ring-1 focus:ring-monarch-gold transition-colors shadow-sm placeholder:text-monarch-charcoal/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-monarch-charcoal/40 hover:text-monarch-maroon"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="signup-confirm-password"
              className="block text-xs font-nav uppercase tracking-wider text-monarch-charcoal/80 mb-1.5 font-medium"
            >
              Confirm Passcode
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-monarch-charcoal/40" />
              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat passcode"
                className="w-full pl-11 pr-10 py-3 bg-white text-monarch-charcoal text-xs font-sans rounded-xl border border-monarch-beige hover:border-monarch-gold/70 focus:outline-none focus:border-monarch-gold focus:ring-1 focus:ring-monarch-gold transition-colors shadow-sm placeholder:text-monarch-charcoal/30"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide confirm passcode' : 'Show confirm passcode'}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-monarch-charcoal/40 hover:text-monarch-maroon"
              >
                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="p-2.5 rounded-xl bg-[#F7F0E5] border border-monarch-beige/80 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-nav uppercase tracking-wider">
              <span className="text-monarch-charcoal/70">Passcode Fortification</span>
              <span className="font-semibold text-monarch-maroon">{passwordStrength.label}</span>
            </div>
            <div className="h-1.5 w-full bg-monarch-beige/50 rounded-full overflow-hidden flex gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-full flex-1 rounded-full transition-colors duration-300 ${step <= passwordStrength.score ? passwordStrength.color : 'bg-transparent'
                    }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Trousseau Registry Opt-In */}
        <div className="pt-1 space-y-2.5">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="registryOptIn"
              checked={formData.registryOptIn}
              onChange={handleChange}
              className="mt-0.5 w-4 h-4 rounded text-monarch-maroon focus:ring-monarch-gold border-monarch-beige"
            />
            <span className="text-xs text-monarch-charcoal/80 font-sans leading-relaxed">
              Enroll in the <strong>Royal Bridal &amp; Loom Registry</strong> for private trunk shows,
              artisan provenance dossiers, and invitations to secret salon previews.
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="mt-0.5 w-4 h-4 rounded text-monarch-maroon focus:ring-monarch-gold border-monarch-beige"
            />
            <span className="text-xs text-monarch-charcoal/70 font-sans leading-relaxed">
              I accept the House of MONARCH{' '}
              <Link href="/terms" className="text-monarch-maroon underline hover:text-monarch-gold-dark">
                Charter of Sovereign Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-monarch-maroon underline hover:text-monarch-gold-dark">
                Client Privacy Policy
              </Link>
              .
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
            <Sparkles className="w-4 h-4 text-monarch-gold" />
            <span>{isSubmitting ? 'Inscribing in Sovereign Ledger...' : 'Enact Royal Membership'}</span>
            <ArrowRight className="w-4 h-4 text-monarch-gold transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Security Assurance */}
        <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-monarch-charcoal/60 font-sans">
          <ShieldCheck className="w-4 h-4 text-monarch-gold-dark" />
          <span>Strictly Private &amp; Confidential Sovereign Patronage</span>
        </div>

        {/* Switch to Login Link */}
        {onSwitchToLogin && (
          <div className="pt-4 border-t border-monarch-beige/60 text-center">
            <p className="text-xs text-monarch-charcoal/70 font-sans">
              Already hold a Sovereign Membership?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-nav uppercase tracking-wider text-monarch-maroon font-semibold hover:text-monarch-gold-dark hover:underline ml-1"
              >
                Sign In to Privy Suite
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

