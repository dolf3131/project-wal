"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type TransitionMode = "boot" | "route";

type TransitionContextValue = {
  beginNavigation: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

const BOOT_MIN_DURATION_MS = 1100;
const ROUTE_MIN_DURATION_MS = 520;

function formatRouteLabel(href: string) {
  if (href === "/") {
    return "ROOT.PORTAL";
  }

  const normalized = href
    .split("?")[0]
    .split("#")[0]
    .split("/")
    .filter(Boolean)
    .join(".");

  return normalized.replace(/-/g, "_").toUpperCase();
}

function TransitionOverlay({
  active,
  mode,
  targetLabel,
}: {
  active: boolean;
  mode: TransitionMode;
  targetLabel: string;
}) {
  const [progress, setProgress] = useState(active ? 0 : 100);

  useEffect(() => {
    if (!active) {
      return;
    }

    const duration = mode === "boot" ? BOOT_MIN_DURATION_MS : ROUTE_MIN_DURATION_MS;
    const interval = 20; // 50fps
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(100, (currentStep / steps) * 100);
      setProgress(nextProgress);
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [active, mode]);

  const displayedProgress = active ? progress : 100;

  return (
    <div
      aria-hidden={!active}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] transition-opacity duration-500",
        active ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="absolute inset-0 bg-[#020812]/90 backdrop-blur-sm" />

      <div className="relative flex h-full items-center justify-center p-6">
        <div className="w-full max-w-lg overflow-hidden rounded-md border border-sky-500/30 bg-[#020812] shadow-[0_0_50px_-12px_rgba(56,189,248,0.25)]">
          <div className="flex items-center gap-2 border-b border-sky-500/20 bg-sky-500/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-sky-200/50">
              {mode === "boot" ? "SYSTEM.BOOT" : "SYSTEM.ROUTE"}
            </span>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-sky-300">
              <span>{mode === "boot" ? "INITIALIZING WALRUS PORTAL..." : `ROUTING TO ${targetLabel}...`}</span>
              <span className="opacity-80">{Math.round(displayedProgress)}%</span>
            </div>
            
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900/50 outline outline-1 outline-offset-2 outline-sky-500/30">
              <div 
                className="h-full bg-sky-400 transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(56,189,248,0.6)]"
                style={{ width: `${displayedProgress}%` }}
              />
            </div>
            
            <div className="mt-5 font-mono text-[10px] text-sky-200/40">
              $ walrus {mode === "boot" ? "portal init" : `route switch --target ${targetLabel.toLowerCase()}`}
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [active, setActive] = useState(true);
  const [mode, setMode] = useState<TransitionMode>("boot");
  const [targetLabel, setTargetLabel] = useState(formatRouteLabel(pathname));
  const lastPathnameRef = useRef(pathname);
  const routeStartRef = useRef<number | null>(null);
  const bootFinishedRef = useRef(false);

  useEffect(() => {
    const startedAt = performance.now();

    const finishBoot = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, BOOT_MIN_DURATION_MS - elapsed);

      window.setTimeout(() => {
        bootFinishedRef.current = true;
        setActive(false);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finishBoot();
      return;
    }

    window.addEventListener("load", finishBoot, { once: true });
    return () => window.removeEventListener("load", finishBoot);
  }, []);

  useEffect(() => {
    if (lastPathnameRef.current === pathname) {
      return;
    }

    lastPathnameRef.current = pathname;
    setTargetLabel(formatRouteLabel(pathname));

    if (routeStartRef.current === null) {
      return;
    }

    const elapsed = performance.now() - routeStartRef.current;
    const remaining = Math.max(0, ROUTE_MIN_DURATION_MS - elapsed);

    window.setTimeout(() => {
      routeStartRef.current = null;
      setActive(false);
    }, remaining);
  }, [pathname]);

  const beginNavigation = useCallback((href: string) => {
    if (!bootFinishedRef.current) {
      return;
    }

    routeStartRef.current = performance.now();
    setMode("route");
    setTargetLabel(formatRouteLabel(href));
    setActive(true);
  }, []);

  const value = useMemo(
    () => ({
      beginNavigation,
    }),
    [beginNavigation],
  );

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <TransitionOverlay
        key={`${mode}:${targetLabel}:${active ? "active" : "idle"}`}
        active={active}
        mode={mode}
        targetLabel={targetLabel}
      />
    </TransitionContext.Provider>
  );
}

export function useSiteTransition() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error("useSiteTransition must be used within SiteTransitionProvider.");
  }

  return context;
}
