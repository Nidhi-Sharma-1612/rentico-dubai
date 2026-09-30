const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // The admin uploadImage action already caps files at 5MB — this just
      // raises the framework's default 1MB action-body limit to match, so
      // the request itself doesn't get rejected before that check runs.
      bodySizeLimit: "8mb",
    },
    // Defaults to os.cpus().length - 1, which on Hostinger's shared build
    // host reports ~40 cores — but the hosting plan itself is capped at 200
    // total processes shared across 5 websites. The build tries to spawn 40
    // worker processes for "Collecting page data", blows through the
    // account's actual process ceiling, and a worker that fails to spawn
    // leaves .next/server/pages-manifest.json missing (ENOENT) even though
    // webpack itself reported success. Capping this to a small fixed number
    // keeps the build inside what the account can actually support,
    // regardless of the host machine's real (irrelevant) core count.
    cpus: 2,
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
              protocol: "https",
              hostname: supabaseHostname,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
