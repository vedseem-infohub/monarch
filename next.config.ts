import type { NextConfig } from "next";
import path from "path";

const rootDir = __dirname.includes('.worktrees') ? path.resolve(__dirname, '../..') : __dirname;

const nextConfig: NextConfig = {
  experimental: {
    turbopackPluginRuntimeStrategy: 'workerThreads',
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  turbopack: {
    root: rootDir,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
