import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductDetailView } from '@/components/product/ProductDetailView';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);
  if (!product) return { title: 'Product Not Found — MONARCH' };

  return {
    title: `${product.name} — MONARCH Royal Haute Couture`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
