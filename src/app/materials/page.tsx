import { materialsConfig } from "@/data/materials-config";
import { Button } from "@/components/ui/button";
import { FileText, Code, ExternalLink, Download } from "lucide-react";

export default function MaterialsPage() {
    const getIcon = (category: string) => {
        switch (category) {
            case "PDF":
                return <FileText className="h-5 w-5 text-red-500" />;
            case "Code":
                return <Code className="h-5 w-5 text-blue-500" />;
            case "Link":
                return <ExternalLink className="h-5 w-5 text-green-500" />;
            default:
                return <FileText className="h-5 w-5" />;
        }
    };

    return (
        <div className="pt-14 bg-cmds-grid min-h-screen">
            <section className="py-24 px-6 z-10 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-xs font-mono tracking-[0.2em] text-primary uppercase mb-3">
                            Resources
                        </p>
                        <h2 className="text-2xl md:text-3xl font-semibold text-foreground text-balance">
                            Lectures & Materials
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-4">
                            A comprehensive list of downloaded materials, code samples, and research resources. Links direct to the unified internal viewer.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        {materialsConfig.materials.map((item) => (
                            <div
                                key={item.id}
                                className="group relative flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md hover:bg-card/50 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <div className="flex items-start gap-5 flex-1">
                                    <div className="p-3.5 rounded-2xl bg-muted/30 group-hover:bg-primary/10 transition-colors duration-500">
                                        {getIcon(item.category)}
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex flex-wrap items-center gap-2.5">
                                            <h3 className="text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors">
                                                {item.title}
                                            </h3>
                                            <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                                {item.category}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground/60 font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                            Posted: {new Date(item.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="rounded-full px-8 h-11 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 font-medium tracking-wide group/btn"
                                    >
                                        <a
                                            href={item.url}
                                            target={item.url.startsWith('http') ? "_blank" : undefined} 
                                            rel={item.url.startsWith('http') ? "noopener noreferrer" : undefined}
                                            className="flex items-center gap-2.5"
                                        >
                                            <Download className="h-4 w-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                                            <span>Access</span>
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
