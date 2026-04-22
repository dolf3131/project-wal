"use client";

import dynamic from "next/dynamic";

const HomeBlackholeCanvas = dynamic(
  () => import("@/components/home-blackhole-canvas").then((mod) => mod.HomeBlackholeCanvas),
  {
    ssr: false,
  },
);

export function HeroBackgroundShell() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 opacity-95">
        <HomeBlackholeCanvas />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:52px_52px] opacity-[0.04]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.028),transparent_22%),radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.16)_62%,rgba(0,0,0,0.48)_100%)]" />
    </div>
  );
}
