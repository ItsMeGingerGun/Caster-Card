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
  // Add output: 'export' for static deployment
  output: 'export',
  // Add basePath if deploying to subpath
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
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
