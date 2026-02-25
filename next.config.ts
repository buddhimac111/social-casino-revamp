import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production optimizations
  reactStrictMode: true,

  // Power by header (set to false for security)
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mngstrogae.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lottogramblobstorage.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // Custom headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" }, // Best practice security
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        // Keep auth BFF routes in-app; proxy everything else to external API.
        source: "/api/:path((?!auth(?:/|$)).*)",
        // Locked at build time
        destination: `${process.env.EXTERNAL_API_URL}/:path`,
      },
    ];
  },
};

export default nextConfig;
