/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove serverComponentsExternalPackages since we removed Redis
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Add webpack config to ignore node modules
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
