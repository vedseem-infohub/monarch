import React from 'react';
import { PRODUCTS } from '@/data/products';
import { CollectionBrowser } from '@/components/collection/CollectionBrowser';
import { api } from '@/services/api';

export const metadata = {
  title: 'All Collections — MONARCH Haute Couture',
  description: 'Explore the complete archive of handcrafted Indian royal ethnic wear, bridal lehengas, banarasi sarees, and bespoke sherwanis.',
};

interface CollectionsPageProps {
  searchParams?: Promise<{
    category?: string;
    occasion?: string;
    fabric?: string;
    gender?: 'women' | 'men';
  }>;
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const search = searchParams ? await searchParams : {};
  let products = PRODUCTS;
  try {
    const liveProducts = await api.products.getAll();
    if (Array.isArray(liveProducts) && liveProducts.length > 0) {
      const liveIds = new Set(liveProducts.map((p) => p.id));
      const remainingInitial = PRODUCTS.filter((p) => !liveIds.has(p.id));
      products = [...liveProducts, ...remainingInitial];
    }
  } catch {
    // Backend offline, fallback to built-in archive
  }

  return (
    <CollectionBrowser
      initialProducts={products}
      collectionTitle="Complete Archival Collections"
      collectionDescription="A celebration of Indian royalty, master weavers, and intricate metallic bullion needlecraft. Explore handcrafted bridal, festive, and imperial formal wear."
      activeCategorySlug={search.category || 'all'}
      genderFilter={search.gender}
      initialOccasion={search.occasion}
      initialFabric={search.fabric}
    />
  );
}
