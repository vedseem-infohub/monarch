import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ALL_CATEGORIES } from '@/data/categories';
import { CollectionBrowser } from '@/components/collection/CollectionBrowser';
import { Product } from '@/types';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams?: Promise<{
    category?: string;
    occasion?: string;
    fabric?: string;
    gender?: 'women' | 'men';
    sort?: string;
  }>;
}

export async function generateStaticParams() {
  const categories = [
    'all',
    'women',
    'men',
    'wedding-edit',
    ...ALL_CATEGORIES.map((c) => c.slug),
  ];
  return Array.from(new Set(categories)).map((category) => ({ category }));
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { category } = await params;
  const search = searchParams ? await searchParams : {};

  if (category === 'women') {
    return { title: 'Women’s Haute Couture — MONARCH' };
  }
  if (category === 'men') {
    return { title: 'Men’s Imperial Regalia — MONARCH' };
  }
  if (category === 'wedding-edit' || search.occasion === 'wedding') {
    return { title: 'The Wedding Edit 2026 — MONARCH' };
  }
  const matched = ALL_CATEGORIES.find((c) => c.slug === (category === 'all' && search.category ? search.category : category));
  return {
    title: matched ? `${matched.name} — MONARCH` : 'Collection — MONARCH',
    description: matched?.description || 'Luxury Indian Ethnic Wear',
  };
}

export default async function CategoryCollectionPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const search = searchParams ? await searchParams : {};
  const queryCategory = search.category;
  const queryOccasion = search.occasion;
  const queryFabric = search.fabric;
  const queryGender = search.gender;

  let title = 'Royal Collection';
  let description = '';
  let activeSlug = category;
  let genderFilter: 'women' | 'men' | undefined = queryGender;
  let initialOccasion = queryOccasion;
  let initialFabric = queryFabric;

  // Check if category is a Silk Mood
  const SILK_KEY_MAP: Record<string, string> = {
    'kanjivaram-silk': 'kanjivaram',
    'chanderi-silk': 'chanderi',
    'tussar-silk': 'tussar',
    'paithani-silk': 'paithani',
    'banarasi-silk': 'banarasi',
    'organza-tissue': 'organza',
  };

  if (category === 'women') {
    title = "Women's Royal Haute Couture";
    description =
      'Explore bridal lehengas, pure Banarasi katan silk sarees, kalidar anarkalis, and celebratory festive ensembles handcrafted with authentic gold zari.';
    activeSlug = 'all';
    genderFilter = 'women';
  } else if (category === 'men') {
    title = "Men's Imperial Regalia";
    description =
      'Discover raw mulberry silk sherwanis, structured prince bandhgalas, and heritage hand-brocaded silk Nehru jackets.';
    activeSlug = 'all';
    genderFilter = 'men';
  } else if (category === 'wedding-edit' || queryOccasion?.toLowerCase() === 'wedding') {
    title = 'The Wedding Edit 2026';
    description =
      'Heirloom bridal lehengas and commanding groom sherwanis curated for palace weddings, sacred pheras, and unforgettable beginnings.';
    activeSlug = 'all';
    initialOccasion = 'Wedding';
  } else if (SILK_KEY_MAP[category]) {
    const silkKeyword = SILK_KEY_MAP[category];
    const matchedCategory = ALL_CATEGORIES.find((c) => c.slug === category);
    title = matchedCategory ? matchedCategory.name : `${silkKeyword.toUpperCase()} Silk Mood`;
    description = matchedCategory?.description || `Exquisite handwoven ${silkKeyword} silks from royal ateliers.`;
    activeSlug = 'all';
    initialFabric = silkKeyword;
  } else if (category === 'all') {
    if (queryCategory && queryCategory !== 'all') {
      const matchedCategory = ALL_CATEGORIES.find((c) => c.slug === queryCategory);
      if (matchedCategory) {
        title = matchedCategory.name;
        description = matchedCategory.description;
      }
      activeSlug = queryCategory;
    } else {
      title = 'The Complete Vault';
      description = 'All handcrafted royal ensembles across women and men collections.';
      activeSlug = 'all';
    }
  } else {
    const matchedCategory = ALL_CATEGORIES.find((c) => c.slug === category);
    if (!matchedCategory) {
      const hasProducts = PRODUCTS.some((p) => p.category === category);
      if (!hasProducts) {
        notFound();
      }
      title = 'Collection';
    } else {
      title = matchedCategory.name;
      description = matchedCategory.description;
    }
  }

  return (
    <CollectionBrowser
      initialProducts={PRODUCTS}
      collectionTitle={title}
      collectionDescription={description}
      activeCategorySlug={activeSlug}
      genderFilter={genderFilter}
      initialOccasion={initialOccasion}
      initialFabric={initialFabric}
    />
  );
}
