const DEFAULT_ASSET_HOST = "https://jeongbin.pages.dev";

function normalizeAssetHost(value?: string) {
  if (!value) {
    return "";
  }

  return value.replace(/\/+$/, "");
}

export const assetHost = normalizeAssetHost(
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_ASSET_HOST || DEFAULT_ASSET_HOST
    : process.env.NEXT_PUBLIC_ASSET_HOST,
);

export function withAssetHost(resourcePath?: string | null) {
  if (!resourcePath) {
    return "";
  }

  if (/^https?:\/\//i.test(resourcePath)) {
    return resourcePath;
  }

  if (!resourcePath.startsWith("/")) {
    return resourcePath;
  }

  return assetHost ? `${assetHost}${resourcePath}` : resourcePath;
}
