import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { publications } from "@/data/publications";
import { siteConfig } from "@/data/site-config";

const MY_NAME = siteConfig.name;

export function PublicationsSection() {
  return (
    <section id="publications" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 space-y-4">
          <span className="section-kicker">Publications</span>
          <h2 className="section-heading">Writing that connects code and research claims.</h2>
        </div>

        <div className="space-y-5">
          {publications.map((publication, index) => (
            <article
              key={`${publication.title}-${index}`}
              className="surface-panel soft-ring rounded-[1.75rem] border border-white/8 p-6"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-medium text-primary">
                  {publication.type}
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground"
                >
                  {publication.date}
                </Badge>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-slate-100">
                {publication.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {publication.authors.map((author, authorIndex) => (
                  <span key={`${publication.title}-${author}`}>
                    {author.includes(MY_NAME) ? (
                      <span className="font-semibold text-slate-100">{author}</span>
                    ) : (
                      author
                    )}
                    {authorIndex < publication.authors.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p className="mt-2 text-sm font-medium text-primary">{publication.venue}</p>

              {(publication.link || publication.code) && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {publication.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 rounded-full border-primary/25 bg-background/35 px-4 text-sm text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href={publication.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Paper
                      </a>
                    </Button>
                  )}
                  {publication.code && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 rounded-full border-primary/25 bg-background/35 px-4 text-sm text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                      asChild
                    >
                      <a href={publication.code} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
