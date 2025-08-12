/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@vercel/og'],
  },
  // Remove output: 'export' - causes issues with API routes
  // output: 'export', 
  
  // Remove basePath unless you specifically need it
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  
  // Add rewrites for Farcaster manifest and assets
  async rewrites() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: '/api/.well-known/farcaster.json',
      },
      {
        source: '/icon-192.png',
        destination: '/public/icon-192.png',
      },
      {
        source: '/icon-512.png',
        destination: '/public/icon-512.png',
      },
      {
        source: '/screenshot1.png',
        destination: '/public/screenshot1.png',
      }
    ]
  },
  
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      tls: false,
      dns: false,
      stream: false,
      crypto: false,
    };
    return config;
  },
};

module.exports = nextConfig;
