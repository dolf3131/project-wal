import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const DEFAULT_ASSET_HOST = "https://jeongbin.pages.dev";

function normalizeAssetHost(value?: string) {
  return value?.replace(/\/+$/, "");
}

export default function nextConfig(phase: string): NextConfig {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const assetPrefix = isDev
    ? undefined
    : normalizeAssetHost(process.env.NEXT_PUBLIC_ASSET_HOST || DEFAULT_ASSET_HOST);

  return {
    output: "export",
    reactCompiler: true,
    assetPrefix,
    images: {
      unoptimized: true,
    },
  };
}
