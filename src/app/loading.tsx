'use client';

import React from 'react';
import { MonarchLoader } from '@/components/common/MonarchLoader';

/**
 * Universal Route Transition & Streaming Boundary for Next.js App Router.
 * Automatically triggered by Next.js during route navigation and server component streaming.
 * Uses the authentic MONARCH luxury royal velvet brand loader UI.
 */
export default function Loading() {
  return (
    <MonarchLoader
      variant="fullscreen"
      message="Curating Royal Silk..."
      subtitle="A Legacy Woven in Elegance"
      minDisplayTime={350}
      showSkip={false}
    />
  );
}
