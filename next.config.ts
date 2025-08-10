import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ["files.edgestore.dev"]
  // }
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'files.edgestore.dev', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
