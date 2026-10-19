'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, FORMAT_CURRENCY } from '@/data/products';
import { Product } from '@/types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isGlossy?: boolean;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, isGlossy = false }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(trimmed) ||
        p.categoryName.toLowerCase().includes(trimmed) ||
        p.fabric.toLowerCase().includes(trimmed) ||
        p.embroidery.toLowerCase().includes(trimmed) ||
        p.occasion.some((o) => o.toLowerCase().includes(trimmed))
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const popularSearches = [
    'Bridal Lehenga',
    'Banarasi Silk Saree',
    'Raw Silk Sherwani',
    'Royal Bandhgala',
    'Gota Patti',
    'Zardozi',
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col text-monarch-ivory animate-fadeIn transition-colors duration-500 border-none ${
        isGlossy
          ? 'bg-gradient-to-b from-black/90 via-black/80 to-black/65 backdrop-blur-md'
          : 'bg-monarch-burgundy/95 backdrop-blur-xl'
      }`}
    >
      {/* Top Bar */}
      <div className="border-b border-monarch-gold/30 px-6 py-6 max-w-6xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3 text-monarch-gold">
          <span className="font-serif text-2xl tracking-widest text-monarch-ivory">MONARCH</span>
          <span className="text-xs tracking-widest font-nav uppercase text-monarch-gold/70">
            Royal Search
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-monarch-beige hover:text-monarch-ivory p-2 rounded-full border border-monarch-gold/30 hover:border-monarch-gold transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Input Field */}
      <div className="max-w-4xl mx-auto w-full px-6 pt-10 pb-6">
        <div className="relative border-b-2 border-monarch-gold/50 focus-within:border-monarch-gold transition-colors pb-3">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-monarch-gold" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bridal lehengas, sherwanis, banarasi sarees, fabrics..."
            className="w-full bg-transparent pl-10 pr-4 text-xl md:text-2xl font-serif text-monarch-ivory placeholder:text-monarch-beige/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-monarch-beige/60 hover:text-monarch-ivory"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Searches when query is empty */}
        {!query && (
          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-monarch-gold font-nav mb-4">
              Curated Searches
            </p>
            <div className="flex flex-wrap gap-2.5">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs md:text-sm font-sans bg-monarch-maroon/60 hover:bg-monarch-maroon text-monarch-beige hover:text-monarch-ivory px-4 py-2 rounded-full border border-monarch-gold/25 transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-16 max-w-6xl mx-auto w-full">
        {query && results.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-2xl text-monarch-beige">No royal ensembles match &ldquo;{query}&rdquo;</p>
            <p className="text-xs text-monarch-beige/60 mt-2 font-nav uppercase tracking-wider">
              Try searching by fabric like &ldquo;Silk&rdquo;, &ldquo;Velvet&rdquo;, or &ldquo;Zardozi&rdquo;
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-widest text-monarch-gold font-nav mb-6">
              Found {results.length} Royal {results.length === 1 ? 'Piece' : 'Pieces'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="group bg-monarch-maroon/30 rounded-xl overflow-hidden border border-monarch-gold/20 hover:border-monarch-gold/60 transition-all flex flex-col"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-monarch-charcoal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.badge && (
                      <span className="absolute top-2.5 left-2.5 text-[10px] font-nav uppercase tracking-wider bg-monarch-burgundy/90 text-monarch-gold-light px-2.5 py-1 rounded border border-monarch-gold/30">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-nav uppercase tracking-widest text-monarch-gold/80 mb-1">
                        {product.categoryName}
                      </p>
                      <h4 className="font-serif text-base text-monarch-ivory group-hover:text-monarch-gold-light transition-colors line-clamp-1">
                        {product.name}
                      </h4>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-serif text-sm font-semibold text-monarch-ivory">
                        {FORMAT_CURRENCY(product.price)}
                      </span>
                      <ArrowRight className="w-4 h-4 text-monarch-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
