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
      },
      {
        source: '/og-image.png',
        destination: '/public/og-image.png',
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
