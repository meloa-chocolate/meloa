import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/meloa" : "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isGitHubPages,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isGitHubPages,
  },
  poweredByHeader: false,
};

export default nextConfig;
