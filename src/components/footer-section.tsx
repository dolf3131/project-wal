import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site-config";

const contactLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: siteConfig.contact.github,
    username: "@dolf3131",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: siteConfig.contact.linkedin,
    username: siteConfig.name,
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${siteConfig.contact.email}`,
    username: siteConfig.contact.email,
  },
];

export function FooterSection() {
  return (
    <footer className="py-24 px-6 border-t border-border bg-muted/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-mono tracking-[0.2em] text-primary uppercase mb-3">
            Get in touch
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 text-balance font-mono uppercase tracking-widest">
            {"Let's Connect"}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed font-mono">
            {"I'm always open to discussing research opportunities, collaborations, or interesting projects."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 px-5 py-3.5 border border-border bg-card hover:border-primary/40 transition-all w-full sm:w-auto"
            >
              <link.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground font-mono uppercase tracking-widest">
                  {link.label}
                </p>
                <p className="text-xs text-muted-foreground">{link.username}</p>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
        <div className="text-center font-mono space-y-2">
          <p className="text-xs text-muted-foreground">
            {`> `}Public deployment: <a href={siteConfig.walrus?.publicUrl || siteConfig.walrus?.base36Url} target="_blank" rel="noreferrer" className="text-primary hover:underline">{siteConfig.walrus?.publicUrl || siteConfig.walrus?.base36Url}</a>
          </p>
          <p className="text-xs text-muted-foreground">
            {`> `}Designed & built with React, Next.js, and Tailwind CSS
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {`\u00A9 ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
