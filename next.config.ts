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
  async headers() {
    if (isGitHubPages) return [];
    return [
      {
        source: "/api/order",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "https://meloa-chocolate.github.io" },
          { key: "Access-Control-Allow-Methods", value: "POST, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

export default nextConfig;
