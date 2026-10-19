'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { SearchOverlay } from './SearchOverlay';
import { CartDrawer } from './CartDrawer';
import { ProductQuickView } from '@/components/product/ProductQuickView';
import { WOMEN_CATEGORIES, MEN_CATEGORIES } from '@/data/categories';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'women' | 'men' | 'wedding' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<'women' | 'men' | null>(null);

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { totalCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header background logic:
  // When starting (at top): pure white blur gradient with increased frosted blur, zero border
  // When scrolling: smoothly transitions to default solid deep burgundy (#240E14) with zero border
  const isGlossy = !isScrolled;

  const headerBgClass = isGlossy
    ? 'bg-gradient-to-b from-white/30 via-white/15 to-transparent backdrop-blur-md border-none text-monarch-ivory py-4'
    : 'bg-[#240E14]/95 backdrop-blur-md border-none shadow-xl text-monarch-ivory py-3.5';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${headerBgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu Trigger & Main Desktop Nav */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-monarch-ivory hover:text-monarch-gold p-1"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <nav className="hidden lg:flex items-center space-x-7">
                {/* Women Mega Menu Trigger */}
                <div
                  onMouseEnter={() => setActiveMenu('women')}
                  className="relative group py-2"
                >
                  <Link
                    href="/collections/women"
                    className="font-nav text-xs tracking-widest uppercase hover:text-monarch-gold-light transition-colors flex items-center gap-1"
                  >
                    <span>Women</span>
                    <ChevronDown className="w-3 h-3 text-monarch-gold opacity-70 group-hover:rotate-180 transition-transform" />
                  </Link>
                </div>

                {/* Men Mega Menu Trigger */}
                <div
                  onMouseEnter={() => setActiveMenu('men')}
                  className="relative group py-2"
                >
                  <Link
                    href="/collections/men"
                    className="font-nav text-xs tracking-widest uppercase hover:text-monarch-gold-light transition-colors flex items-center gap-1"
                  >
                    <span>Men</span>
                    <ChevronDown className="w-3 h-3 text-monarch-gold opacity-70 group-hover:rotate-180 transition-transform" />
                  </Link>
                </div>

                {/* Wedding Edit Trigger */}
                <div
                  onMouseEnter={() => setActiveMenu('wedding')}
                  className="relative group py-2"
                >
                  <Link
                    href="/collections/wedding-edit"
                    className="font-nav text-xs tracking-widest uppercase hover:text-monarch-gold-light transition-colors flex items-center gap-1"
                  >
                    <span>Wedding Edit</span>
                    <ChevronDown className="w-3 h-3 text-monarch-gold opacity-70 group-hover:rotate-180 transition-transform" />
                  </Link>
                </div>

                <Link
                  href="/collections/all?filter=new"
                  onMouseEnter={() => setActiveMenu(null)}
                  className="font-nav text-xs tracking-widest uppercase hover:text-monarch-gold-light transition-colors"
                >
                  New Arrivals
                </Link>

                <Link
                  href="/collections/all"
                  onMouseEnter={() => setActiveMenu(null)}
                  className="font-nav text-xs tracking-widest uppercase hover:text-monarch-gold-light transition-colors"
                >
                  Collections
                </Link>

                <Link
                  href="/our-craft"
                  onMouseEnter={() => setActiveMenu(null)}
                  className="font-nav text-xs tracking-widest uppercase hover:text-monarch-gold-light transition-colors"
                >
                  Our Craft
                </Link>
              </nav>
            </div>

            {/* Center: Brand Wordmark */}
            <div className="flex flex-col items-center">
              <Link href="/" className="group text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-monarch-ivory group-hover:text-monarch-gold-light transition-colors uppercase font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)]">
                    MONARCH
                  </span>
                </div>
                <span className="hidden sm:block text-[10px] tracking-[0.35em] text-monarch-gold-light font-medium font-nav uppercase -mt-0.5 group-hover:text-white transition-colors [text-shadow:_0_1px_5px_rgba(0,0,0,0.95)]">
                  Haute Couture Heritage
                </span>
              </Link>
            </div>

            {/* Right: Actions (Search, Account, Wishlist, Cart) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-monarch-ivory hover:text-monarch-gold p-1.5 transition-colors"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/account"
                className="hidden sm:block text-monarch-ivory hover:text-monarch-gold p-1.5 transition-colors"
                aria-label="Royal concierge and account"
              >
                <User className="w-5 h-5" />
              </Link>

              <Link
                href="/wishlist"
                className="relative text-monarch-ivory hover:text-monarch-gold p-1.5 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-monarch-maroon text-monarch-gold border border-monarch-gold text-[9px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-monarch-ivory hover:text-monarch-gold p-1.5 transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-monarch-gold text-monarch-burgundy text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MegaMenu Dropdown */}
        <MegaMenu activeMenu={activeMenu} onClose={() => setActiveMenu(null)} isGlossy={isGlossy} />
      </header>

      {/* Full-Screen Search Modal */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} isGlossy={isGlossy} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Global Couture Quick View Drawer */}
      <ProductQuickView />

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div
            className={`absolute inset-y-0 left-0 w-4/5 max-w-sm text-monarch-ivory p-6 flex flex-col justify-between overflow-y-auto transition-colors duration-500 ${
              isGlossy
                ? 'bg-gradient-to-b from-black/85 via-black/75 to-black/60 backdrop-blur-md border-none'
                : 'bg-[#240E14] border-r border-monarch-gold/30'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-monarch-gold/25">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl tracking-widest text-monarch-ivory uppercase"
                >
                  MONARCH
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-monarch-beige hover:text-monarch-ivory p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {/* Women Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === 'women' ? null : 'women')
                    }
                    className="w-full flex items-center justify-between py-2 text-sm font-nav uppercase tracking-wider text-monarch-ivory"
                  >
                    <span>Women</span>
                    <ChevronDown
                      className={`w-4 h-4 text-monarch-gold transition-transform ${
                        mobileExpanded === 'women' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileExpanded === 'women' && (
                    <div className="pl-4 py-2 space-y-2 border-l border-monarch-gold/20 my-2">
                      {WOMEN_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/collections/${cat.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xs text-monarch-beige hover:text-monarch-gold py-1"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Men Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === 'men' ? null : 'men')
                    }
                    className="w-full flex items-center justify-between py-2 text-sm font-nav uppercase tracking-wider text-monarch-ivory"
                  >
                    <span>Men</span>
                    <ChevronDown
                      className={`w-4 h-4 text-monarch-gold transition-transform ${
                        mobileExpanded === 'men' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {mobileExpanded === 'men' && (
                    <div className="pl-4 py-2 space-y-2 border-l border-monarch-gold/20 my-2">
                      {MEN_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/collections/${cat.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-xs text-monarch-beige hover:text-monarch-gold py-1"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/collections/wedding-edit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-sm font-nav uppercase tracking-wider text-monarch-ivory hover:text-monarch-gold"
                >
                  Wedding Edit
                </Link>

                <Link
                  href="/collections/all?filter=new"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-sm font-nav uppercase tracking-wider text-monarch-ivory hover:text-monarch-gold"
                >
                  New Arrivals
                </Link>

                <Link
                  href="/collections/all"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-sm font-nav uppercase tracking-wider text-monarch-ivory hover:text-monarch-gold"
                >
                  All Collections
                </Link>

                <Link
                  href="/our-craft"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-sm font-nav uppercase tracking-wider text-monarch-ivory hover:text-monarch-gold"
                >
                  Our Craft
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-monarch-gold/25 space-y-3">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-monarch-gold"
              >
                <User className="w-4 h-4" />
                <span>Royal Concierge &amp; Account</span>
              </Link>
              <p className="text-[10px] text-monarch-beige/50 font-sans">
                A Legacy Woven in Elegance · MONARCH 2026
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
