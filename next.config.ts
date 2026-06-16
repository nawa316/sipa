import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'paqfhwbrvabxwqkdqhos.supabase.co',
      },
    ],
  },
};

export default nextConfig;
