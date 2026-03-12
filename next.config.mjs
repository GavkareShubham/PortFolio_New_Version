/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable turbopack — avoids .next/cache corruption on Windows
  // when clearing the cache dir while the dev server is running.
  experimental: {},
  webpack(config, { dev }) {
    if (dev) {
      // Use memory cache in dev so deleting .next mid-run can't corrupt pack files
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
