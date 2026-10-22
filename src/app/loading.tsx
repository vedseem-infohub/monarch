'use client';

import React from 'react';
import { MonarchLoader } from '@/components/common/MonarchLoader';

/**
 * Universal Route Transition & Streaming Boundary for Next.js App Router.
 * Automatically triggered by Next.js during route navigation and server component streaming.
 */
export default function Loading() {
  return (
    <MonarchLoader
      variant="fullscreen"
      message="Curating Royal Silk..."
      subtitle="A Legacy Woven in Elegance"
      minDisplayTime={300}
      showSkip={false}
    />
  );
}
