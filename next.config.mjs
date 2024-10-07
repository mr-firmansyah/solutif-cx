/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.solutif.co.id',
      }
    ]
  },
};

export default nextConfig;
