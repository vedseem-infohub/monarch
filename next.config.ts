import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    turbopackPluginRuntimeStrategy: 'workerThreads',
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  turbopack: {
    root: path.resolve(__dirname, '../..'),
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
