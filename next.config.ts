import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // If you use images from remote domains, set them explicitly:
  // images: {
  //   remotePatterns: [
  //     { protocol: "https", hostname: "example.com" },
  //   ],
  // },
};

export default nextConfig;