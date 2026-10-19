import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductByIdOrSlug } from '@/data/products';
import { ProductDetailView } from '@/components/product/ProductDetailView';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
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
  const product = getProductByIdOrSlug(id);
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
  const product = getProductByIdOrSlug(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
