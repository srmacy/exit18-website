import type { NextConfig } from "next";

const crossOriginPublicAssetHeaders = [
  { key: "Access-Control-Allow-Origin", value: "*" },
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

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
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: crossOriginPublicAssetHeaders,
      },
      {
        source: "/favicon.png",
        headers: crossOriginPublicAssetHeaders,
      },
      {
        source: "/icon.png",
        headers: crossOriginPublicAssetHeaders,
      },
    ];
  },
};

export default nextConfig;
