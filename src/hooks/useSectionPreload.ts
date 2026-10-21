'use client';
import { useEffect, useRef } from 'react';
import { preloadAndDecodeImage } from '@/components/home/shared/SectionImagePreloader';

/**
 * Hook that preloads a section's images when the attached element enters the viewport.
 *
 * Usage:
 * ```tsx
 * const ref = useSectionPreload(imageUrls);
 * return <section ref={ref as React.RefObject<HTMLElement>}>…</section>
 * ```
 *
 * @param imageUrls  List of absolute URL strings to preload
 * @param options    Optional IntersectionObserver rootMargin override
 */
export function useSectionPreload(
  imageUrls: string[],
  options?: { rootMargin?: string }
) {
  const ref = useRef<HTMLElement | null>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current || loaded.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loaded.current) {
          loaded.current = true;
          imageUrls.forEach((url) => preloadAndDecodeImage(url));
          observer.disconnect();
        }
      },
      { rootMargin: options?.rootMargin ?? '400px 0px', threshold: 0 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [imageUrls, options?.rootMargin]);

  return ref;
}
