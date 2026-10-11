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
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  if (category === 'women') {
    return { title: 'Women’s Haute Couture — MONARCH' };
  }
  if (category === 'men') {
    return { title: 'Men’s Imperial Regalia — MONARCH' };
  }
  if (category === 'wedding-edit') {
    return { title: 'The Wedding Edit 2026 — MONARCH' };
  }
  const matched = ALL_CATEGORIES.find((c) => c.slug === category);
  return {
    title: matched ? `${matched.name} — MONARCH` : 'Collection — MONARCH',
    description: matched?.description || 'Luxury Indian Ethnic Wear',
  };
}

export default async function CategoryCollectionPage({ params }: PageProps) {
  const { category } = await params;

  let filteredProducts: Product[] = [];
  let title = 'Royal Collection';
  let description = '';
  let activeSlug = category;
  let genderFilter: 'women' | 'men' | undefined = undefined;

  if (category === 'women') {
    filteredProducts = PRODUCTS.filter((p) => p.gender === 'women');
    title = "Women's Royal Haute Couture";
    description =
      'Explore bridal lehengas, pure Banarasi katan silk sarees, kalidar anarkalis, and celebratory festive ensembles handcrafted with authentic gold zari.';
    activeSlug = 'all';
    genderFilter = 'women';
  } else if (category === 'men') {
    filteredProducts = PRODUCTS.filter((p) => p.gender === 'men');
    title = "Men's Imperial Regalia";
    description =
      'Discover raw mulberry silk sherwanis, structured prince bandhgalas, and heritage hand-brocaded silk Nehru jackets.';
    activeSlug = 'all';
    genderFilter = 'men';
  } else if (category === 'wedding-edit') {
    filteredProducts = PRODUCTS.filter((p) =>
      p.occasion.some((o) => ['Bridal', 'Wedding', 'Groom Wear', 'Royal Gala'].includes(o))
    );
    title = 'The Wedding Edit 2026';
    description =
      'Heirloom bridal lehengas and commanding groom sherwanis curated for palace weddings, sacred pheras, and unforgettable beginnings.';
    activeSlug = 'all';
  } else if (category === 'all') {
    filteredProducts = PRODUCTS;
    title = 'The Complete Vault';
    description = 'All handcrafted royal ensembles across women and men collections.';
    activeSlug = 'all';
  } else {
    const matchedCategory = ALL_CATEGORIES.find((c) => c.slug === category);
    if (!matchedCategory) {
      // Fallback: search if any product has this category directly
      filteredProducts = PRODUCTS.filter((p) => p.category === category);
      if (filteredProducts.length === 0) {
        notFound();
      }
      title = filteredProducts[0]?.categoryName || 'Collection';
    } else {
      title = matchedCategory.name;
      description = matchedCategory.description;
      filteredProducts = PRODUCTS.filter((p) => p.category === category);
    }
  }

  return (
    <CollectionBrowser
      initialProducts={filteredProducts.length > 0 ? filteredProducts : PRODUCTS}
      collectionTitle={title}
      collectionDescription={description}
      activeCategorySlug={activeSlug}
      genderFilter={genderFilter}
    />
  );
}
