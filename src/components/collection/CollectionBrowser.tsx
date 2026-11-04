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
  initialOccasion?: string;
  initialFabric?: string;
}

export const CollectionBrowser: React.FC<CollectionBrowserProps> = ({
  initialProducts,
  collectionTitle,
  collectionDescription,
  activeCategorySlug,
  genderFilter,
  initialOccasion,
  initialFabric,
}) => {
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategorySlug || 'all');
  const [selectedGender, setSelectedGender] = useState<string>(genderFilter || 'all');
  const [priceMax, setPriceMax] = useState<number>(350000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    initialOccasion ? [initialOccasion] : []
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>(
    initialFabric ? [initialFabric] : []
  );
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync prop updates if navigation route or search parameters change
  React.useEffect(() => {
    if (activeCategorySlug) setSelectedCategory(activeCategorySlug);
  }, [activeCategorySlug]);

  React.useEffect(() => {
    if (genderFilter) setSelectedGender(genderFilter);
  }, [genderFilter]);

  React.useEffect(() => {
    if (initialOccasion) {
      setSelectedOccasions([initialOccasion]);
    }
  }, [initialOccasion]);

  React.useEffect(() => {
    if (initialFabric) {
      setSelectedFabrics([initialFabric]);
    }
  }, [initialFabric]);

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

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    wardrobe: true,
    category: false,
    price: true,
    size: false,
    color: false,
    occasion: false,
    fabric: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const displayedCategories = useMemo(() => {
    if (selectedGender === 'all') return ALL_CATEGORIES;
    return ALL_CATEGORIES.filter((c) => c.gender === selectedGender || c.gender === 'all');
  }, [selectedGender]);

  const dynamicColors = useMemo(() => {
    const colorMap = new Map<string, string>();
    availableColors.forEach((c) => colorMap.set(c.name.toLowerCase(), c.hex));
    initialProducts.forEach((p) => {
      if (p.colors && Array.isArray(p.colors)) {
        p.colors.forEach((c) => {
          if (c.name && c.hex && !colorMap.has(c.name.toLowerCase())) {
            colorMap.set(c.name.toLowerCase(), c.hex);
          }
        });
      }
    });
    return Array.from(colorMap.entries()).map(([name, hex]) => ({
      name: name.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      hex,
    }));
  }, [initialProducts]);

  const dynamicSizes = useMemo(() => {
    const sizeSet = new Set<string>(availableSizes);
    initialProducts.forEach((p) => {
      if (p.sizes && Array.isArray(p.sizes)) {
        p.sizes.forEach((s) => sizeSet.add(s));
      }
    });
    return Array.from(sizeSet);
  }, [initialProducts]);

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
    setSelectedOccasions((prev) => {
      const exists = prev.some((o) => o.toLowerCase() === occ.toLowerCase());
      return exists
        ? prev.filter((o) => o.toLowerCase() !== occ.toLowerCase())
        : [...prev, occ];
    });
  };

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) => {
      const exists = prev.some((f) => f.toLowerCase() === fabric.toLowerCase());
      return exists
        ? prev.filter((f) => f.toLowerCase() !== fabric.toLowerCase())
        : [...prev, fabric];
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('all');
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

    // Category filter (supports canonical categories and silk moods)
    if (selectedCategory !== 'all') {
      const isSilkCategory = [
        'kanjivaram-silk',
        'chanderi-silk',
        'tussar-silk',
        'paithani-silk',
        'banarasi-silk',
        'organza-tissue',
      ].includes(selectedCategory);

      if (isSilkCategory) {
        const silkKey = selectedCategory.replace('-silk', '').replace('-tissue', '');
        result = result.filter(
          (p) =>
            p.category === selectedCategory ||
            p.fabric.toLowerCase().includes(silkKey) ||
            p.name.toLowerCase().includes(silkKey) ||
            p.tagline.toLowerCase().includes(silkKey)
        );
      } else {
        result = result.filter((p) => p.category === selectedCategory);
      }
    }

    // Price range
    result = result.filter((p) => p.price <= priceMax);

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.some((ss) => s.toLowerCase().includes(ss.toLowerCase())))
      );
    }

    // Colors (case-insensitive partial match)
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) =>
          selectedColors.some((sc) =>
            c.name.toLowerCase().includes(sc.toLowerCase()) ||
            sc.toLowerCase().includes(c.name.toLowerCase())
          )
        )
      );
    }

    // Occasions (case-insensitive flexible match)
    if (selectedOccasions.length > 0) {
      result = result.filter((p) =>
        p.occasion.some((o) =>
          selectedOccasions.some((so) =>
            o.toLowerCase().includes(so.toLowerCase()) ||
            so.toLowerCase().includes(o.toLowerCase())
          )
        )
      );
    }

    // Fabrics (case-insensitive flexible match)
    if (selectedFabrics.length > 0) {
      result = result.filter((p) =>
        selectedFabrics.some((f) =>
          p.fabric.toLowerCase().includes(f.toLowerCase()) ||
          f.toLowerCase().includes(p.fabric.toLowerCase())
        )
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
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedGender !== 'all' ? 1 : 0) +
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
          <aside className="hidden lg:flex lg:col-span-3 bg-white rounded-2xl border border-monarch-beige/60 shadow-sm sticky top-24 lg:top-28 max-h-[calc(100vh-7.5rem)] flex-col overflow-hidden">
            {/* Pinned Sidebar Header */}
            <div className="p-5 pb-4 border-b border-monarch-beige/50 flex items-center justify-between shrink-0 bg-white">
              <h3 className="font-serif text-lg font-medium text-monarch-charcoal flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-monarch-gold-dark" />
                <span>Refine Selection</span>
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-monarch-maroon hover:underline font-nav flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            {/* Scrollable Filters Body */}
            <div className="p-5 space-y-5 overflow-y-auto overscroll-contain flex-1 divide-y divide-monarch-beige/40">
              {/* 1. Wardrobe (Gender) */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('wardrobe')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Wardrobe</span>
                    {selectedGender !== 'all' && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedGender}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.wardrobe ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.wardrobe && (
                  <div className="flex gap-2 pt-1 animate-in fade-in duration-200">
                    {['all', 'women', 'men'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`flex-1 py-1.5 text-xs font-nav rounded-lg border capitalize transition-all cursor-pointer ${
                          selectedGender === g
                            ? 'bg-monarch-maroon text-monarch-ivory border-monarch-maroon font-medium shadow-2xs'
                            : 'bg-monarch-ivory text-monarch-charcoal border-monarch-beige hover:border-monarch-gold'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Category */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('category')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Category</span>
                    {selectedCategory !== 'all' && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        Active
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.category ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.category && (
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 pt-1 animate-in fade-in duration-200">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded font-sans transition-colors cursor-pointer ${
                        selectedCategory === 'all'
                          ? 'bg-monarch-maroon/10 text-monarch-maroon font-semibold'
                          : 'text-monarch-charcoal/80 hover:text-monarch-maroon'
                      }`}
                    >
                      All Categories
                    </button>
                    {displayedCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left text-xs py-1.5 px-2.5 rounded font-sans transition-colors flex items-center justify-between cursor-pointer ${
                          selectedCategory === cat.slug
                            ? 'bg-monarch-maroon/10 text-monarch-maroon font-semibold'
                            : 'text-monarch-charcoal/80 hover:text-monarch-maroon'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.itemCount && (
                          <span className="text-[10px] text-monarch-charcoal/40 font-mono">
                            {cat.itemCount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Price Range */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('price')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Max Price</span>
                    {priceMax < 350000 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        Filtered
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-xs text-monarch-maroon font-semibold normal-case">
                      {FORMAT_CURRENCY(priceMax)}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openSections.price ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {openSections.price && (
                  <div className="pt-1 animate-in fade-in duration-200 space-y-2">
                    <input
                      type="range"
                      min="50000"
                      max="350000"
                      step="10000"
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="w-full accent-monarch-maroon cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-monarch-charcoal/60 font-mono">
                      <span>₹50,000</span>
                      <span>₹3,50,000</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Sizes */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('size')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Size</span>
                    {selectedSizes.length > 0 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedSizes.length}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.size ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.size && (
                  <div className="flex flex-wrap gap-1.5 pt-1 animate-in fade-in duration-200 max-h-48 overflow-y-auto pr-1">
                    {dynamicSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-1 px-2.5 text-xs font-nav rounded border transition-all cursor-pointer ${
                          selectedSizes.includes(size)
                            ? 'bg-monarch-maroon text-monarch-ivory border-monarch-maroon font-medium shadow-2xs'
                            : 'bg-monarch-ivory text-monarch-charcoal border-monarch-beige hover:border-monarch-gold'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Colors */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('color')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Colorway</span>
                    {selectedColors.length > 0 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedColors.length}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.color ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.color && (
                  <div className="flex flex-wrap gap-2 pt-1 animate-in fade-in duration-200 max-h-48 overflow-y-auto pr-1">
                    {dynamicColors.map((color) => {
                      const isSelected = selectedColors.includes(color.name);
                      return (
                        <button
                          key={color.name}
                          onClick={() => toggleColor(color.name)}
                          className={`w-6 h-6 rounded-full border transition-all relative cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-monarch-maroon scale-110 border-white shadow-xs'
                              : 'border-black/20 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 6. Occasions */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('occasion')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Occasion</span>
                    {selectedOccasions.length > 0 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedOccasions.length}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.occasion ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.occasion && (
                  <div className="space-y-1.5 pt-1 animate-in fade-in duration-200 max-h-48 overflow-y-auto pr-1">
                    {availableOccasions.map((occ) => (
                      <label
                        key={occ}
                        className="flex items-center gap-2 text-xs font-sans text-monarch-charcoal cursor-pointer hover:text-monarch-maroon transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedOccasions.some((o) => o.toLowerCase() === occ.toLowerCase())}
                          onChange={() => toggleOccasion(occ)}
                          className="accent-monarch-maroon rounded"
                        />
                        <span>{occ}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* 7. Fabrics & Heritage Weaves */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('fabric')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Heritage Weave / Fabric</span>
                    {selectedFabrics.length > 0 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedFabrics.length}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.fabric ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.fabric && (
                  <div className="space-y-1.5 pt-1 animate-in fade-in duration-200 max-h-48 overflow-y-auto pr-1">
                    {availableFabrics.map((fab) => (
                      <label
                        key={fab}
                        className="flex items-center gap-2 text-xs font-sans text-monarch-charcoal cursor-pointer hover:text-monarch-maroon transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFabrics.some((f) => f.toLowerCase() === fab.toLowerCase())}
                          onChange={() => toggleFabric(fab)}
                          className="accent-monarch-maroon rounded"
                        />
                        <span className="truncate" title={fab}>{fab}</span>
                      </label>
                    ))}
                  </div>
                )}
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
          <div className="fixed inset-y-0 right-0 w-full sm:w-4/5 max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-monarch-beige/60 shrink-0 bg-white">
              <h3 className="font-serif text-xl font-medium text-monarch-charcoal flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-monarch-gold-dark" />
                <span>Refine Selection</span>
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-monarch-charcoal hover:bg-monarch-beige/30 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Drawer Body */}
            <div className="p-6 space-y-5 overflow-y-auto overscroll-contain flex-1 divide-y divide-monarch-beige/40">
              {/* 1. Gender */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('wardrobe')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Wardrobe</span>
                    {selectedGender !== 'all' && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedGender}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.wardrobe ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.wardrobe && (
                  <div className="flex gap-2 pt-1 animate-in fade-in duration-200">
                    {['all', 'women', 'men'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGender(g)}
                        className={`flex-1 py-2 text-xs font-nav rounded-lg border capitalize transition-all cursor-pointer ${
                          selectedGender === g
                            ? 'bg-monarch-maroon text-monarch-ivory border-monarch-maroon font-medium shadow-2xs'
                            : 'bg-monarch-ivory text-monarch-charcoal border-monarch-beige hover:border-monarch-gold'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Category */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('category')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Category</span>
                    {selectedCategory !== 'all' && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        Active
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.category ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.category && (
                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1 pt-1 animate-in fade-in duration-200">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full text-left text-xs py-1.5 px-2.5 rounded font-sans transition-colors cursor-pointer ${
                        selectedCategory === 'all'
                          ? 'bg-monarch-maroon/10 text-monarch-maroon font-semibold'
                          : 'text-monarch-charcoal/80 hover:text-monarch-maroon'
                      }`}
                    >
                      All Categories
                    </button>
                    {displayedCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full text-left text-xs py-1.5 px-2.5 rounded font-sans transition-colors flex items-center justify-between cursor-pointer ${
                          selectedCategory === cat.slug
                            ? 'bg-monarch-maroon/10 text-monarch-maroon font-semibold'
                            : 'text-monarch-charcoal/80 hover:text-monarch-maroon'
                        }`}
                      >
                        <span>{cat.name}</span>
                        {cat.itemCount && (
                          <span className="text-[10px] text-monarch-charcoal/40 font-mono">
                            {cat.itemCount}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Price */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('price')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Max Price</span>
                    {priceMax < 350000 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        Filtered
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-xs font-semibold text-monarch-maroon">
                      {FORMAT_CURRENCY(priceMax)}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openSections.price ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {openSections.price && (
                  <div className="pt-1 animate-in fade-in duration-200 space-y-2">
                    <input
                      type="range"
                      min="50000"
                      max="350000"
                      step="10000"
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="w-full accent-monarch-maroon cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-monarch-charcoal/60 font-mono">
                      <span>₹50,000</span>
                      <span>₹3,50,000</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Sizes */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('size')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Size</span>
                    {selectedSizes.length > 0 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedSizes.length}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.size ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.size && (
                  <div className="flex flex-wrap gap-1.5 pt-1 animate-in fade-in duration-200 max-h-48 overflow-y-auto pr-1">
                    {dynamicSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-1.5 px-3 text-xs font-nav rounded border transition-all cursor-pointer ${
                          selectedSizes.includes(size)
                            ? 'bg-monarch-maroon text-monarch-ivory border-monarch-maroon font-medium'
                            : 'bg-monarch-ivory text-monarch-charcoal border-monarch-beige'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Colors */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('color')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Colorway</span>
                    {selectedColors.length > 0 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedColors.length}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.color ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.color && (
                  <div className="flex flex-wrap gap-2.5 pt-1 animate-in fade-in duration-200 max-h-48 overflow-y-auto pr-1">
                    {dynamicColors.map((color) => {
                      const isSelected = selectedColors.includes(color.name);
                      return (
                        <button
                          key={color.name}
                          onClick={() => toggleColor(color.name)}
                          className={`w-7 h-7 rounded-full border transition-all relative cursor-pointer ${
                            isSelected
                              ? 'ring-2 ring-monarch-maroon scale-110 border-white shadow-xs'
                              : 'border-black/20 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 6. Occasions */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('occasion')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Occasion</span>
                    {selectedOccasions.length > 0 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedOccasions.length}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.occasion ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.occasion && (
                  <div className="space-y-1.5 pt-1 animate-in fade-in duration-200 max-h-48 overflow-y-auto pr-1">
                    {availableOccasions.map((occ) => (
                      <label
                        key={occ}
                        className="flex items-center gap-2 text-xs font-sans text-monarch-charcoal cursor-pointer hover:text-monarch-maroon transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedOccasions.some((o) => o.toLowerCase() === occ.toLowerCase())}
                          onChange={() => toggleOccasion(occ)}
                          className="accent-monarch-maroon rounded"
                        />
                        <span>{occ}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* 7. Fabrics */}
              <div className="pt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('fabric')}
                  className="w-full flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold py-1 hover:text-monarch-maroon-dark transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <span>Heritage Weave / Fabric</span>
                    {selectedFabrics.length > 0 && (
                      <span className="text-[10px] bg-monarch-maroon text-monarch-ivory px-1.5 py-0.2 rounded-full normal-case font-medium">
                        {selectedFabrics.length}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      openSections.fabric ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSections.fabric && (
                  <div className="space-y-1.5 pt-1 animate-in fade-in duration-200 max-h-48 overflow-y-auto pr-1">
                    {availableFabrics.map((fab) => (
                      <label
                        key={fab}
                        className="flex items-center gap-2 text-xs font-sans text-monarch-charcoal cursor-pointer hover:text-monarch-maroon transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFabrics.some((f) => f.toLowerCase() === fab.toLowerCase())}
                          onChange={() => toggleFabric(fab)}
                          className="accent-monarch-maroon rounded"
                        />
                        <span className="truncate" title={fab}>{fab}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-monarch-beige/60 flex gap-3 shrink-0 bg-white">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-3 rounded-full border border-monarch-beige text-xs font-nav uppercase tracking-wider text-monarch-charcoal hover:bg-monarch-ivory transition-colors cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-full bg-monarch-maroon text-monarch-ivory text-xs font-nav uppercase tracking-wider shadow hover:bg-monarch-maroon-dark transition-colors cursor-pointer font-semibold"
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
