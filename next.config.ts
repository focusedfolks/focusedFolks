import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the Next.js Issues badge (and its native "Close" tooltip) in development.
  // Error overlays still show when something actually breaks.
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
