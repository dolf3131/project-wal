import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Link as LinkIcon } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { TransitionLink } from "@/components/transition-link";

export function Navbar() {
  const navItems = [
    { name: "RESEARCH", href: "/research" },
    { name: "EXPERIENCE", href: "/experience" },
    { name: "PROJECTS", href: "/projects" },
    { name: "PUBLICATIONS", href: "/publications" },
    { name: "MATERIALS", href: "/materials" },
  ];

  const walrusPublicUrl = siteConfig.walrus?.isEnabled
    ? siteConfig.walrus.publicUrl
    : undefined;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <TransitionLink href="/" className="font-mono font-bold text-sm tracking-tight text-primary">
            {"// JEONGBIN.WAL_"}
          </TransitionLink>
          {siteConfig.walrus?.isEnabled && (
            <span className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 border border-primary/40 bg-primary/10 text-[10px] font-mono tracking-widest text-primary uppercase">
              <LinkIcon className="h-3 w-3" />
              Walrus Mainnet
            </span>
          )}
        </div>

        <nav className="hidden md:flex items-center">
          {navItems.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <TransitionLink
                href={item.href}
                className="font-mono text-xs font-medium tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/10 px-2 py-1 transition-all uppercase"
              >
                {item.name}
              </TransitionLink>
              {index < navItems.length - 1 && (
                <span className="text-[10px] text-border mx-1 leading-none">◆</span>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-none border border-transparent hover:border-primary/30" asChild>
            <a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-none border border-transparent hover:border-primary/30" asChild>
            <a href={`mailto:${siteConfig.contact.email}`} aria-label="Email">
              <Mail className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-none border border-transparent hover:border-primary/30" asChild>
            <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </Button>
          {walrusPublicUrl && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10 rounded-none border border-transparent hover:border-primary/30" asChild>
              <a href={walrusPublicUrl} target="_blank" rel="noopener noreferrer" aria-label="Walrus Site">
                <LinkIcon className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
