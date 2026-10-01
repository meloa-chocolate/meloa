import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/meloa" : "";

const corsConfig = isGitHubPages
  ? {}
  : {
      async headers() {
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
  ...corsConfig,
};

export default nextConfig;
