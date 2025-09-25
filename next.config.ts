import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'owcpqjfhmhfkfvptqvwd.supabase.co',
        pathname: '/storage/v1/**',
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;
