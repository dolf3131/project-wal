import rawSiteConfig from "./site-config.json";

type WalrusNetwork = "testnet" | "mainnet";

interface SiteConfig {
  name: string;
  title: string;
  description: string;
  contact: {
    email: string;
    github: string;
    linkedin: string;
  };
  repoUrl: string;
  pinnedProjects: string[];
  walrus: {
    isEnabled: boolean;
    network: WalrusNetwork;
    siteName: string;
    siteObjectId: string;
    base36Url: string;
    publicUrl: string;
    epochs: number;
    permanent: boolean;
  };
}

export const siteConfig: SiteConfig = {
  ...rawSiteConfig,
  walrus: {
    ...rawSiteConfig.walrus,
    network: rawSiteConfig.walrus.network as WalrusNetwork,
  },
};
