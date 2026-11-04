'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { formatINR } from '@/utils/formatters';

export interface FrameItem {
  id?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  craft?: string;
  tag?: string;
  eyebrow?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  href?: string;
  slug?: string;
  badge?: string;
  price?: number;
  originalPrice?: number;
  formattedPrice?: string;
  tagline?: string;
  displayOrder?: number;
  metadata?: Record<string, any>;
  isVisible?: boolean;
  occasionTitle?: string;
  occasionTag?: string;
  actionText?: string;
  actionHref?: string;
  [key: string]: any;
}

/**
 * Custom hook to dynamically hydrate storefront sections with frames managed
 * in the Monarch Admin Panel, with zero hydration mismatch and automatic fallback.
 */
export function useSectionFrames<T extends FrameItem>(
  sectionKey: string,
  fallbackFrames: T[]
): T[] {
  const [frames, setFrames] = useState<T[]>(fallbackFrames);

  useEffect(() => {
    let isMounted = true;

    async function loadFrames() {
      try {
        const remote = await api.frames.getAll(sectionKey);
        if (isMounted && Array.isArray(remote) && remote.length > 0) {
          const visible = remote
            .filter((f) => f.isVisible !== false)
            .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

          if (visible.length > 0) {
            // Map remote section frames gracefully to expected component shape
            const normalized = visible.map((f, i) => {
              const fallback = fallbackFrames[i] || ({} as any);
              const title = f.title || fallback.title || fallback.name || fallback.occasionTitle || '';
              const craft = f.subtitle || fallback.craft || fallback.subtitle || fallback.occasionTag || '';
              const tag = f.badge || fallback.tag || fallback.badge || fallback.occasionTag || '';
              const href = f.ctaLink || fallback.href || fallback.ctaLink || fallback.actionHref || `/collections/${f.slug || 'all'}`;
              const priceVal = f.price !== undefined ? f.price : fallback.price;

              return {
                ...fallback,
                id: f.id || fallback.id,
                title,
                name: title,
                occasionTitle: f.title || fallback.occasionTitle || title,
                occasionTag: f.subtitle || fallback.occasionTag || craft,
                subtitle: f.subtitle || fallback.subtitle,
                craft,
                tag,
                badge: f.badge || fallback.badge,
                eyebrow: f.eyebrow || fallback.eyebrow,
                description: f.description || fallback.description,
                image: f.image || fallback.image,
                ctaText: f.ctaText || fallback.ctaText || fallback.actionText,
                actionText: f.ctaText || fallback.actionText || fallback.ctaText,
                actionHref: href,
                ctaLink: href,
                href,
                slug: f.ctaLink?.replace(/^\/collections\//, '') || fallback.slug,
                price: priceVal,
                originalPrice: f.originalPrice ?? fallback.originalPrice,
                formattedPrice: priceVal !== undefined ? formatINR(priceVal) : fallback.formattedPrice,
                tagline: f.tagline || fallback.tagline,
                metadata: f.metadata || fallback.metadata,
              };
            });
            setFrames(normalized as unknown as T[]);
          }
        }
      } catch (err) {
        // Fall back gracefully to static fallback frames
      }
    }

    loadFrames();

    return () => {
      isMounted = false;
    };
  }, [sectionKey, fallbackFrames]);

  return frames;
}
