import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductDetailView } from '@/components/product/ProductDetailView';
import { api } from '@/services/api';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function findLocalProduct(id: string) {
  if (!id) return undefined;
  const normalized = id.trim().toLowerCase();
  return PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === normalized ||
      (p.slug && p.slug.toLowerCase() === normalized)
  );
}

async function getProduct(id: string) {
  try {
    const live = await api.products.getByIdOrSlug(id);
    if (live && live.name) return live;
  } catch {
    // Backend offline or product not found on backend, check local archive
  }
  return findLocalProduct(id);
}

export async function generateStaticParams() {
  const ids = new Set<string>();
  PRODUCTS.forEach((product) => {
    if (product.id) ids.add(product.id);
    if (product.slug) ids.add(product.slug);
  });
  return Array.from(ids).map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: 'Product Not Found — MONARCH' };

  return {
    title: `${product.name} — MONARCH Royal Haute Couture`,
    description: product.description,
    openGraph: {
      images: [product.images?.[0] || ''],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
