import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "sport-api.eunglyzhia.com" },
      { protocol: "https", hostname: "sport-hub.eunglyzhia.social" },
      { protocol: "https", hostname: "www.khmertimeskh.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "fakestoreapi.com" },
    ],
  },
};

export default nextConfig;
