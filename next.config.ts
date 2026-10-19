import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackPluginRuntimeStrategy: 'workerThreads',
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
