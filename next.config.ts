import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Avoid root inference when another lockfile exists higher up.
    root: __dirname,
  },
};

export default nextConfig;
