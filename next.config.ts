import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.exit18equipment.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
