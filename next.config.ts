import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // The admin uploadImage action already caps files at 5MB — this just
      // raises the framework's default 1MB action-body limit to match, so
      // the request itself doesn't get rejected before that check runs.
      bodySizeLimit: "8mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/manage-my-property",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "assets.guesty.com",
      },
      ...(supabaseHostname
        ? [
            {
              protocol: "https" as const,
              hostname: supabaseHostname,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
