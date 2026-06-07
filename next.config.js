/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // Set NEXT_PUBLIC_BASE_PATH=/sweden-bootcamp in CI for GitHub Pages project sites
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  webpack(config) {
    config.module.rules.push({ test: /\.geojson$/, type: 'json' })
    return config
  },
}

module.exports = nextConfig
