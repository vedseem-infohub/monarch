import React from 'react';
import { PRODUCTS } from '@/data/products';
import { CollectionBrowser } from '@/components/collection/CollectionBrowser';

export const metadata = {
  title: 'All Collections — MONARCH Haute Couture',
  description: 'Explore the complete archive of handcrafted Indian royal ethnic wear, bridal lehengas, banarasi sarees, and bespoke sherwanis.',
};

export default function CollectionsPage() {
  return (
    <CollectionBrowser
      initialProducts={PRODUCTS}
      collectionTitle="Complete Archival Collections"
      collectionDescription="A celebration of Indian royalty, master weavers, and intricate metallic bullion needlecraft. Explore handcrafted bridal, festive, and imperial formal wear."
    />
  );
}
