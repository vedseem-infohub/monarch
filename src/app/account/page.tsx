'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Package,
  ArrowRight,
  LogOut,
  User as UserIcon,
  ShoppingBag,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { FORMAT_CURRENCY } from '@/data/products';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, fillDemoUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  const pastOrders = [
    {
      id: 'MNRCH-2026-8942',
      date: 'October 12, 2026',
      status: 'Master Tailoring in Progress',
      total: 285000,
      item: 'Gulnaar Embroidered Zardozi Lehenga',
      color: 'Royal Crimson',
      size: 'Custom Bespoke',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'MNRCH-2026-7120',
      date: 'September 28, 2026',
      status: 'Delivered via Sovereign Express',
      total: 135000,
      item: 'Badshah Royal Navy Bandhgala',
      color: 'Midnight Navy',
      size: '42 (L)',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&auto=format&fit=crop',
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-32 pb-24 flex items-center justify-center px-4">
        <div className="max-w-xl w-full mx-auto bg-[#240E14] text-monarch-ivory rounded-3xl p-8 sm:p-12 border border-monarch-gold/40 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-monarch-maroon border-2 border-monarch-gold flex items-center justify-center text-monarch-gold text-2xl font-serif mx-auto">
            M
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-nav uppercase tracking-[0.3em] text-monarch-gold-light">
              Royal Sovereign Sanctuary
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-monarch-ivory font-medium">
              Patron Identification Required
            </h1>
            <p className="text-xs sm:text-sm text-monarch-beige/80 font-sans max-w-md mx-auto leading-relaxed">
              To review your ethnic wear orders, delivery dispatches, and dedicated patron dossier, please enter your royal credentials.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-monarch-ivory font-nav text-xs uppercase tracking-widest font-semibold border border-monarch-gold/50 transition-all shadow-md"
            >
              Privy Sign In
            </Link>
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-monarch-gold font-nav text-xs uppercase tracking-widest font-semibold border border-monarch-gold/40 transition-all"
            >
              Patron Registration
            </Link>
          </div>

          <div className="pt-4 border-t border-monarch-gold/20">
            <button
              onClick={fillDemoUser}
              className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-monarch-gold-light hover:text-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
              <span>Continue with Demo Patron Profile</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-[#240E14] text-monarch-ivory rounded-2xl p-6 sm:p-10 border border-monarch-gold/40 shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-monarch-maroon border-2 border-monarch-gold flex items-center justify-center text-monarch-gold text-2xl font-serif">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
            </div>
            <div>
              <span className="text-[10px] font-nav uppercase tracking-[0.3em] text-monarch-gold-light">
                {user?.status || 'Royal Sovereign Patron'}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-monarch-ivory mt-0.5">
                {user?.name || 'Maharani Radhika Devi'}
              </h1>
              <p className="text-xs text-monarch-beige/70 font-sans mt-0.5">
                Member ID: {user?.memberId || 'MONARCH-VIP-0042'} · Exclusive Ethnic Wear Patron
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-monarch-burgundy/80 px-4 py-2 rounded-xl border border-monarch-gold/30 text-xs">
              <Sparkles className="w-4 h-4 text-monarch-gold" />
              <div>
                <span className="block text-monarch-gold-light font-nav uppercase text-[10px]">
                  Couture Concierge
                </span>
                <span className="text-monarch-ivory font-serif">Master Ananya Sen</span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                router.push('/login');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-monarch-beige hover:text-white border border-white/10 text-xs font-nav uppercase tracking-wider transition-all"
              title="Sign Out of Privy Account"
            >
              <LogOut className="w-3.5 h-3.5 text-monarch-gold" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-3 border-b border-monarch-beige pb-4 mb-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2.5 rounded-full text-xs font-nav uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-monarch-maroon text-monarch-ivory font-semibold shadow'
                : 'bg-white text-monarch-charcoal border border-monarch-beige hover:border-monarch-gold'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>My Orders &amp; Dispatches ({pastOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2.5 rounded-full text-xs font-nav uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-monarch-maroon text-monarch-ivory font-semibold shadow'
                : 'bg-white text-monarch-charcoal border border-monarch-beige hover:border-monarch-gold'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Patron Profile &amp; Address</span>
          </button>
        </div>

        {/* Tab 1: Past Commissions & Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2">
              <h2 className="font-serif text-2xl text-monarch-charcoal font-normal">
                Recent Ethnic Wear Orders
              </h2>
              <Link
                href="/collections/all"
                className="text-xs font-nav uppercase tracking-wider text-monarch-maroon hover:underline flex items-center gap-1"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {pastOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-monarch-beige/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden bg-monarch-charcoal shrink-0 border border-monarch-beige">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={order.image}
                      alt={order.item}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-nav uppercase tracking-widest text-monarch-gold-dark font-semibold">
                      {order.id} · {order.date}
                    </span>
                    <h4 className="font-serif text-lg text-monarch-charcoal font-medium">
                      {order.item}
                    </h4>
                    <p className="text-xs text-monarch-charcoal/70 font-sans">
                      Color: {order.color} · Size: {order.size}
                    </p>
                    <span className="inline-block mt-2 text-xs font-serif font-bold text-monarch-maroon">
                      {FORMAT_CURRENCY(order.total)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-monarch-beige/40">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monarch-maroon/10 text-monarch-maroon text-xs font-nav font-medium">
                    <Package className="w-3.5 h-3.5" />
                    <span>{order.status}</span>
                  </span>
                  <span className="text-xs text-monarch-charcoal/60 font-sans">
                    Insured White-Glove Courier Delivery
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Patron Profile & Shipping Information */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-monarch-beige/80 shadow-md max-w-3xl space-y-8">
            <div className="border-b border-monarch-beige pb-4">
              <span className="text-xs font-nav uppercase tracking-[0.25em] text-monarch-maroon font-semibold block mb-1">
                Sovereign Dossier
              </span>
              <h3 className="font-serif text-2xl text-monarch-charcoal font-medium">
                Patron Profile &amp; Shipping Preferences
              </h3>
              <p className="text-xs text-monarch-charcoal/70 font-sans mt-1">
                Your registered delivery destination and personal sizing preferences for luxury ethnic wear orders.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/5 space-y-1">
                <span className="text-[10px] font-nav uppercase tracking-wider text-monarch-maroon font-semibold flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-monarch-gold" />
                  Full Name
                </span>
                <p className="font-serif text-base text-[#1C1715] font-medium">
                  {user?.name || 'Maharani Radhika Devi'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/5 space-y-1">
                <span className="text-[10px] font-nav uppercase tracking-wider text-monarch-maroon font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-monarch-gold" />
                  Email Address
                </span>
                <p className="text-xs text-[#1C1715] font-sans">
                  {user?.email || 'radhika@monarch-client.com'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/5 space-y-1">
                <span className="text-[10px] font-nav uppercase tracking-wider text-monarch-maroon font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-monarch-gold" />
                  Contact Telephone
                </span>
                <p className="text-xs text-[#1C1715] font-sans">
                  {user?.phone || '+91 98200 12345'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-black/5 space-y-1">
                <span className="text-[10px] font-nav uppercase tracking-wider text-monarch-maroon font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-monarch-gold" />
                  Patron Privilege Tier
                </span>
                <p className="text-xs text-[#1C1715] font-sans font-medium">
                  {user?.status || 'Imperial Sovereign'}{' '}
                  <span className="text-[#C7A15B]">(Complimentary Insured Delivery)</span>
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-black/5 space-y-2">
              <span className="text-[10px] font-nav uppercase tracking-wider text-monarch-maroon font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-monarch-gold" />
                Primary Shipping Destination
              </span>
              <p className="text-xs text-[#1C1715] font-sans leading-relaxed">
                Villa 14, Royal Palm Estates, Mehrauli-Gurgaon Road, New Delhi, 110030, India
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-monarch-beige pt-4">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-white text-xs font-nav uppercase tracking-wider font-semibold transition-all shadow-md"
              >
                <span>Continue Shopping Ethnic Wear</span>
                <ArrowRight className="w-4 h-4 text-monarch-gold" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
