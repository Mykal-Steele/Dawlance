import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for `docker run` / IBM Code Engine — produces a self-contained
  // Node.js server in .next/standalone instead of requiring the full repo.
  output: "standalone",

  // Anchor Turbopack's workspace root to where `next dev` is invoked.
  // Without this, Turbopack walks up the directory tree and picks up a
  // lock file or package.json from a parent directory as the workspace root,
  // which breaks module resolution (e.g. tailwindcss can't be found).
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "places.googleapis.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
