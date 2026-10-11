'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { FORMAT_CURRENCY } from '@/data/products';
import { ALL_CATEGORIES } from '@/data/categories';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  Grid3X3,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface CollectionBrowserProps {
  initialProducts: Product[];
  collectionTitle: string;
  collectionDescription?: string;
  activeCategorySlug?: string;
  genderFilter?: 'women' | 'men';
}

export const CollectionBrowser: React.FC<CollectionBrowserProps> = ({
  initialProducts,
  collectionTitle,
  collectionDescription,
  activeCategorySlug,
  genderFilter,
}) => {
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategorySlug || 'all');
  const [selectedGender, setSelectedGender] = useState<string>(genderFilter || 'all');
  const [priceMax, setPriceMax] = useState<number>(350000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract available filter options dynamically from initial products
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'Custom Bespoke'];
  const availableColors = [
    { name: 'Royal Crimson', hex: '#5A1725' },
    { name: 'Deep Burgundy', hex: '#291116' },
    { name: 'Warm Ivory', hex: '#F7F0E5' },
    { name: 'Antique Gold', hex: '#C7A15B' },
    { name: 'Emerald Green', hex: '#1C3A27' },
    { name: 'Midnight Navy', hex: '#161E2E' },
    { name: 'Charcoal Black', hex: '#211D1A' },
  ];
  const availableOccasions = ['Bridal', 'Wedding', 'Sangeet', 'Reception', 'Festive', 'Royal Gala'];
  const availableFabrics = [
    'Pure Certified Banarasi Katan Silk',
    'Micro-Velvet & Tissue Organza',
    'Pure Mulberry Raw Silk',
    'Handwoven Chanderi Silk',
    'Pure Silk Metallic Tissue',
    'Pure Silk Organza',
    'Superfine Merino Wool and Mulberry Silk',
  ];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const toggleOccasion = (occ: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) =>
      prev.includes(fabric) ? prev.filter((f) => f !== fabric) : [...prev, fabric]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory(activeCategorySlug || 'all');
    setSelectedGender(genderFilter || 'all');
    setPriceMax(350000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedOccasions([]);
    setSelectedFabrics([]);
    setSortBy('featured');
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Gender filter
    if (selectedGender !== 'all') {
      result = result.filter((p) => p.gender === selectedGender);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price range
    result = result.filter((p) => p.price <= priceMax);

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.some((ss) => s.toLowerCase().includes(ss.toLowerCase())))
      );
    }

    // Colors
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    // Occasions
    if (selectedOccasions.length > 0) {
      result = result.filter((p) =>
        p.occasion.some((o) => selectedOccasions.includes(o))
      );
    }

    // Fabrics
    if (selectedFabrics.length > 0) {
      result = result.filter((p) =>
        selectedFabrics.some((f) => p.fabric.toLowerCase().includes(f.toLowerCase()))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0));
    }

    return result;
  }, [
    initialProducts,
    selectedGender,
    selectedCategory,
    priceMax,
    selectedSizes,
    selectedColors,
    selectedOccasions,
    selectedFabrics,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory !== 'all' && selectedCategory !== activeCategorySlug ? 1 : 0) +
    (selectedGender !== 'all' && selectedGender !== genderFilter ? 1 : 0) +
    (priceMax < 350000 ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    selectedOccasions.length +
    selectedFabrics.length;

  return (
    <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-monarch-charcoal/60 mb-6">
          <Link href="/" className="hover:text-monarch-maroon transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections/all" className="hover:text-monarch-maroon transition-colors">
            Collections
          </Link>
          {activeCategorySlug && (
            <>
              <span>/</span>
              <span className="text-monarch-maroon font-semibold">{collectionTitle}</span>
            </>
          )}
        </nav>

        {/* Collection Hero Header */}
        <div className="mb-10 pb-6 border-b border-monarch-gold/30">
          <span className="text-xs font-nav uppercase tracking-[0.3em] text-monarch-maroon block mb-2 font-semibold">
            Archival Haute Couture
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-monarch-charcoal font-medium">
            {collectionTitle}
          </h1>
          {collectionDescription && (
            <p className="text-xs sm:text-sm text-monarch-charcoal/80 font-sans max-w-2xl mt-2 leading-relaxed">
              {collectionDescription}
            </p>
          )}
          <p className="text-xs font-nav text-monarch-gold-dark mt-3">
            Showing {filteredProducts.length} curated {filteredProducts.length === 1 ? 'ensemble' : 'ensembles'}
          </p>
        </div>

        {/* Control Bar: Filter Toggle, Active Tags, Grid Switcher, Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white/70 backdrop-blur-md p-4 rounded-xl border border-monarch-beige/60">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-monarch-maroon text-monarch-ivory text-xs font-nav uppercase tracking-wider shadow"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Clear Filters Reset */}
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 text-xs text-monarch-maroon hover:underline font-nav uppercase tracking-wider"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            {/* Grid Switcher (Desktop) */}
            <div className="hidden md:flex items-center gap-1 bg-monarch-ivory p-1 rounded-lg border border-monarch-beige">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded transition-colors ${
                  gridCols === 3 ? 'bg-monarch-maroon text-monarch-ivory' : 'text-monarch-charcoal/60'
                }`}
                title="3 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded transition-colors ${
                  gridCols === 4 ? 'bg-monarch-maroon text-monarch-ivory' : 'text-monarch-charcoal/60'
                }`}
                title="4 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs font-nav">
              <span className="text-monarch-charcoal/70 uppercase tracking-wider hidden sm:inline">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-monarch-beige text-monarch-charcoal py-2 px-3 rounded-lg focus:outline-none focus:border-monarch-gold text-xs font-nav"
              >
                <option value="featured">Featured Royal Edit</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-2xl border border-monarch-beige/60 shadow-sm sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-monarch-beige/40">
              <h3 className="font-serif text-lg font-medium text-monarch-charcoal flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-monarch-gold-dark" />
                Refine Selection
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-monarch-maroon hover:underline font-nav"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-2">
                Wardrobe
              </label>
              <div className="flex gap-2">
                {['all', 'women', 'men'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGender(g)}
                    className={`flex-1 py-1.5 text-xs font-nav rounded-lg border capitalize transition-all ${
                      selectedGender === g
                        ? 'bg-monarch-maroon text-monarch-ivory border-monarch-maroon font-medium'
                        : 'bg-monarch-ivory text-monarch-charcoal border-monarch-beige hover:border-monarch-gold'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-2">
                Category
              </label>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left text-xs py-1 px-2 rounded font-sans transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-monarch-maroon/10 text-monarch-maroon font-semibold'
                      : 'text-monarch-charcoal/80 hover:text-monarch-maroon'
                  }`}
                >
                  All Categories
                </button>
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left text-xs py-1 px-2 rounded font-sans transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-monarch-maroon/10 text-monarch-maroon font-semibold'
                        : 'text-monarch-charcoal/80 hover:text-monarch-maroon'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold">
                  Max Price
                </label>
                <span className="font-serif text-xs text-monarch-maroon font-semibold">
                  {FORMAT_CURRENCY(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="350000"
                step="10000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-monarch-maroon cursor-pointer"
              />
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`py-1 px-2.5 text-xs font-nav rounded border transition-all ${
                      selectedSizes.includes(size)
                        ? 'bg-monarch-maroon text-monarch-ivory border-monarch-maroon'
                        : 'bg-monarch-ivory text-monarch-charcoal border-monarch-beige hover:border-monarch-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        isSelected
                          ? 'ring-2 ring-monarch-maroon scale-110 border-white'
                          : 'border-black/20 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-2">
                Occasion
              </label>
              <div className="space-y-1.5">
                {availableOccasions.map((occ) => (
                  <label key={occ} className="flex items-center gap-2 text-xs font-sans text-monarch-charcoal cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedOccasions.includes(occ)}
                      onChange={() => toggleOccasion(occ)}
                      className="accent-monarch-maroon rounded"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-monarch-beige/60 space-y-4">
                <div className="w-16 h-16 rounded-full border border-monarch-gold/40 flex items-center justify-center text-monarch-maroon mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-monarch-charcoal">
                  No Royal Ensembles Match Selected Filters
                </h3>
                <p className="text-xs text-monarch-charcoal/70 max-w-sm mx-auto font-sans">
                  Try widening your price range, clearing specific colors, or resetting filters to explore all pieces.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-monarch-maroon text-monarch-ivory text-xs font-nav uppercase tracking-wider shadow hover:bg-monarch-maroon-dark transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  gridCols === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'
                } gap-6`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 w-4/5 max-w-md bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-monarch-beige">
                <h3 className="font-serif text-xl font-medium text-monarch-charcoal">
                  Filter Vault
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-monarch-charcoal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-6">
                {/* Gender */}
                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-2">
                    Wardrobe
                  </label>
                  <div className="flex gap-2">
                    {['all', 'women', 'men'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`flex-1 py-1.5 text-xs font-nav rounded-lg border capitalize ${
                          selectedGender === g
                            ? 'bg-monarch-maroon text-monarch-ivory border-monarch-maroon'
                            : 'bg-monarch-ivory text-monarch-charcoal border-monarch-beige'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold">
                      Max Price
                    </label>
                    <span className="font-serif text-xs font-semibold text-monarch-maroon">
                      {FORMAT_CURRENCY(priceMax)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="350000"
                    step="10000"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-monarch-maroon"
                  />
                </div>

                {/* Occasions */}
                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-2">
                    Occasions
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableOccasions.map((occ) => (
                      <label key={occ} className="flex items-center gap-2 text-xs font-sans">
                        <input
                          type="checkbox"
                          checked={selectedOccasions.includes(occ)}
                          onChange={() => toggleOccasion(occ)}
                          className="accent-monarch-maroon"
                        />
                        <span>{occ}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-monarch-beige flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 rounded-full border border-monarch-beige text-xs font-nav uppercase tracking-wider"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-full bg-monarch-maroon text-monarch-ivory text-xs font-nav uppercase tracking-wider shadow"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
