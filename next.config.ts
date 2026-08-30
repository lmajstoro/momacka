import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Add CDN hosts here when getMedia() switches to a remote source, e.g.:
    // remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    remotePatterns: [],
  },
};

export default nextConfig;
