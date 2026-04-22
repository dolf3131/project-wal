import { Github, Linkedin, Mail, ChevronDown, Database, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site-config";
import { CopySiteIdButton } from "@/components/copy-site-id-button";
import { TransitionLink } from "@/components/transition-link";
import { HeroBackgroundShell } from "@/components/hero-background-shell";

export function HeroSection() {
  const walrus = siteConfig.walrus;
  const publicWalrusUrl = walrus?.publicUrl || "";

  return (
    <section className="min-h-[100svh] flex flex-col justify-center items-center px-6 py-24 relative overflow-hidden border-b border-border">
      <HeroBackgroundShell />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.03)_0%,rgba(2,6,23,0.14)_52%,rgba(2,6,23,0.52)_100%)]" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none text-[30vw] font-bold font-mono tracking-tighter">
        00
      </div>

      <div className="max-w-3xl text-center z-10 relative bg-background/24 p-8 border border-border/40 backdrop-blur-[2px] -mt-20 shadow-[0_0_90px_-40px_rgba(56,189,248,0.22)]">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-primary font-mono text-xs font-bold w-2 h-4 bg-primary animate-pulse" />
            <p className="text-xs font-mono tracking-[0.2em] text-primary uppercase">
              {"// INIT_SYSTEM: WALRUS"}
            </p>
          </div>
          <div className="hidden md:block text-border">|</div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 border border-primary/30 bg-primary/5 text-[10px] font-mono tracking-widest text-primary uppercase">
            <Database className="h-3 w-3" />
            Live on Mainnet
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance uppercase leading-tight font-sans">
          {siteConfig.title || "Quantum research, computational thinking, and Sui-native product building."}
        </h1>
        <div className="inline-block border border-border px-3 py-1 mb-6 bg-secondary/40">
          <p className="text-sm md:text-md text-foreground font-mono uppercase tracking-widest">
            {siteConfig.name}
          </p>
        </div>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8 font-mono">
          {`> `}{siteConfig.description}
        </p>

        {walrus && (
          <div className="mb-8 mx-auto w-full max-w-2xl border border-primary/20 bg-primary/8 px-4 py-4 text-left">
            <p className="text-[10px] font-mono tracking-[0.28em] text-primary uppercase">
              Walrus Infrastructure
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200/85">
              This portfolio uses Walrus mainnet as its decentralized publishing
              layer. The public site state and deployment metadata are anchored on
              Walrus, while heavier front-end assets are split out separately for
              faster delivery.
            </p>
          </div>
        )}

        {walrus && (
          <div className="mb-10 text-left w-full max-w-lg mx-auto border border-border bg-card/55 p-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-muted-foreground mb-2 pb-2 border-b border-border">
              <span className="flex items-center gap-2 text-primary">
                <LinkIcon className="h-3.5 w-3.5" /> WALRUS_DEPLOYMENT
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">ID:</span>
              <div className="flex items-center gap-2">
                <span className="text-foreground truncate max-w-[200px] sm:max-w-[300px]">{walrus.siteObjectId}</span>
                <CopySiteIdButton siteObjectId={walrus.siteObjectId || ""} />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">URL:</span>
              <a
                href={publicWalrusUrl || walrus.base36Url}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline truncate max-w-[200px] sm:max-w-[300px]"
              >
                {(publicWalrusUrl || walrus.base36Url)?.replace(/^https?:\/\//, "")}
              </a>
            </div>
            <p className="pt-2 mt-2 border-t border-border text-[11px] leading-relaxed text-muted-foreground">
              Walrus keeps the public deployment address and site metadata on a
              decentralized network rather than depending on a single hosting
              backend.
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            asChild
            variant="outline"
            className="rounded-none h-10 border-border hover:border-primary hover:bg-primary/20 hover:text-primary transition-all font-mono uppercase tracking-widest text-xs"
          >
            <TransitionLink href="/research">Explore Research</TransitionLink>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-none h-10 w-10 border-border hover:border-primary hover:bg-primary/20 hover:text-primary transition-all delay-75"
            asChild
          >
            <a
              href={siteConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-none h-10 w-10 border-border hover:border-primary hover:bg-primary/20 hover:text-primary transition-all delay-100"
            asChild
          >
            <a
              href={siteConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-none h-10 w-10 border-border hover:border-primary hover:bg-primary/20 hover:text-primary transition-all delay-150"
            asChild
          >
            <a href={`mailto:${siteConfig.contact.email}`} aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <TransitionLink
        href="/research"
        className="absolute bottom-10 animate-bounce text-muted-foreground hover:text-primary transition-colors z-10 bg-background/75 border border-border p-2"
        aria-label="Scroll to research section"
      >
        <ChevronDown className="h-5 w-5" />
      </TransitionLink>
    </section>
  );
}
