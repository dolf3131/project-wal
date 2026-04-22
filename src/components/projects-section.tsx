import { ArrowUpRight, Blocks, Database, Github, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { curatedProjects } from "@/data/projects";
import { siteConfig } from "@/data/site-config";

export function ProjectsSection() {
  const featuredProject =
    curatedProjects.find((project) => project.featured) ?? curatedProjects[0];
  const otherProjects = curatedProjects.filter(
    (project) => project.slug !== featuredProject.slug,
  );

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <span className="section-kicker">Selected Work</span>
            <div className="space-y-3">
              <h2 className="section-heading">Curated projects, not just repository cards.</h2>
              <p className="section-copy">
                The goal here is to show what each project was actually trying to
                prove, build, or communicate. GitHub is still available, but the
                story comes first.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {siteConfig.walrus.isEnabled && (
              <Badge
                variant="outline"
                className="h-11 rounded-full border-primary/30 bg-primary/10 px-4 text-[11px] font-mono uppercase tracking-[0.28em] text-primary"
              >
                <Database className="mr-2 h-3.5 w-3.5" />
                WALRUS MAINNET
              </Badge>
            )}
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-full border-primary/25 bg-card/70 px-5 text-sm text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              <a
                href={siteConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Browse GitHub
              </a>
            </Button>
          </div>
        </div>

        <article className="surface-panel soft-ring mb-6 overflow-hidden rounded-[2rem] border border-primary/20">
          <div className="grid gap-8 px-6 py-7 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-medium text-primary">
                  {featuredProject.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground"
                >
                  {featuredProject.period}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] text-cyan-100"
                >
                  {featuredProject.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {featuredProject.title}
                </h3>
                <p className="max-w-2xl text-base leading-8 text-slate-200/90">
                  {featuredProject.summary}
                </p>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                  {featuredProject.impact}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {featuredProject.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {featuredProject.links.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="outline"
                    className="h-11 rounded-full border-primary/25 bg-background/40 px-5 text-sm text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/35 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-100">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Why this project matters
                </div>
                <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
                  {featuredProject.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.5rem] border border-primary/15 bg-primary/10 p-5">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                  <Blocks className="h-4 w-4" />
                  Presentation principle
                </div>
                <p className="text-sm leading-7 text-sky-100/80">
                  Each project card now foregrounds intent, technical choices, and
                  outcome. GitHub stays as a verification path, not the whole
                  presentation layer.
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="grid gap-5 md:grid-cols-2">
          {otherProjects.map((project) => (
            <article
              key={project.slug}
              className="surface-panel soft-ring flex h-full flex-col rounded-[1.75rem] border border-white/8 px-6 py-6"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-medium text-primary">
                  {project.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground"
                >
                  {project.period}
                </Badge>
              </div>

              <div className="mb-4 space-y-3">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm leading-7 text-slate-100/90">
                  {project.summary}
                </p>
                <p className="text-sm leading-7 text-muted-foreground">
                  {project.impact}
                </p>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-100"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mb-6 flex-1">
                <ul className="space-y-2.5 text-sm leading-7 text-muted-foreground">
                  {project.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant="outline"
                    className="h-10 rounded-full border-primary/25 bg-background/35 px-4 text-sm text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
