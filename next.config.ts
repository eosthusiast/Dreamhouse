import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Dreamhouse",
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
