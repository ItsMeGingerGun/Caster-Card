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
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
