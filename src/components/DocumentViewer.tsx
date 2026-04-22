"use client";

import React, { useState, useEffect, type ComponentPropsWithoutRef } from 'react';
import { FileDown, Eye, BookOpen, Terminal, Cpu, Zap, Maximize2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { withAssetHost } from "@/lib/asset-url";

type MarkdownCodeProps = ComponentPropsWithoutRef<"code"> & {
  node?: unknown;
};

interface DocumentViewerProps {
  title: string;
  pdfUrl?: string;
  markdownContent?: string | null; 
}

export function DocumentViewer({ title, pdfUrl, markdownContent }: DocumentViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  const resolvedPdfUrl = pdfUrl ? withAssetHost(pdfUrl) : "";

  useEffect(() => {
    const logs = [
      ">> INITIALIZING_RENDER_KNL [OK]",
      ">> MOUNTING_ACADEMIC_VOLUME [OK]",
      `>> TARGET_ID: ${title.split(' / ')[0]}`,
      ">> FETCHING_REMOTE_ASSETS..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setSystemLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [title]);

  const pdfEmbedUrl = resolvedPdfUrl
    ? `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(resolvedPdfUrl)}`
    : '';

  return (
    <div className="flex flex-col w-full mx-auto space-y-4 font-mono select-none animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Premium Header: Cyber Deck Style */}
      <div className="relative group overflow-hidden bg-card/20 backdrop-blur-xl border border-primary/20 p-6 rounded-t-xl transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_rgba(var(--primary),0.2)]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-colors" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500/50" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <span className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              <div className="h-[1px] w-8 bg-primary/30" />
              <p className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                SYSTEM_LOG_v2.04
              </p>
            </div>
            
            <h1 className="text-xl md:text-2xl font-black tracking-tighter text-foreground uppercase leading-none">
              {title.split(' / ').map((part, i) => (
                <span key={i} className={i === 0 ? "text-foreground" : "text-primary/60"}>
                  {i > 0 && " / "}{part}
                </span>
              ))}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-[10px]">
              <div className="flex items-center gap-1.5 px-2 py-0.5 border border-border bg-muted/20">
                <Cpu className="w-3 h-3 text-primary/70" />
                <span className="uppercase">Core_Render: PDF.JS</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 border border-border bg-muted/20">
                <Zap className="w-3 h-3 text-yellow-500/70" />
                <span className="uppercase">Uptime: 99.9%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            {resolvedPdfUrl && (
               <Button asChild variant="ghost" className="flex-1 md:flex-none h-11 px-6 rounded-none border border-border/50 hover:border-primary hover:bg-primary/5 text-xs font-bold uppercase transition-all group">
                  <a href={resolvedPdfUrl} download className="flex items-center gap-3">
                    <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    <span>Download_Artifact</span>
                  </a>
               </Button>
            )}
            <Button variant="ghost" className="h-11 w-11 p-0 rounded-none border border-border/50 hover:bg-primary/5 transition-all">
                <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mode Control Bar */}
      <div className="flex items-center justify-between border-y border-border/50 bg-muted/10 px-4 py-2">
        <div className="flex gap-2">
          <div className="flex items-center gap-3 px-5 py-2.5 text-[11px] font-black uppercase transition-all bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <Eye className="w-3.5 h-3.5" />
            <span className="tracking-widest">ACTIVE_VIEW: FULL_SHELL</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 scale-75">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] text-primary/80 font-black tracking-widest uppercase">Live_Sync</span>
            </div>
            <Maximize2 className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative w-full h-[82vh] border border-border/50 bg-black/40 backdrop-blur-3xl overflow-hidden group/canvas">
        
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Boot Sequence Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 bg-background flex flex-col items-center justify-center p-12 overflow-hidden">
            <div className="w-[400px] max-w-full space-y-4">
              <div className="h-1 bg-muted w-full overflow-hidden">
                <div className="h-full bg-primary animate-[shimmer_2s_infinite]" style={{ width: '40%' }} />
              </div>
              <div className="space-y-1">
                {systemLogs.map((log, idx) => (
                  <p key={idx} className="text-[10px] font-mono text-primary/70 animate-in fade-in slide-in-from-left-2">{log}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {resolvedPdfUrl ? (
          <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <iframe
              src={pdfEmbedUrl}
              className="w-full h-full border-none filter invert-[0.05] hue-rotate-[10deg]"
              title="Academic System Viewer"
              allowFullScreen
            />
            {/* Screen Glitch Effect (Subtle) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
          </div>
        ) : (
          <div className={`h-full overflow-y-auto px-6 py-12 md:px-24 md:py-20 lg:px-32 lg:py-24 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {markdownContent ? (
              <article className="prose prose-invert prose-zinc max-w-none font-sans selection:bg-primary/40 selection:text-white">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  components={{
                    h1: ({...props}) => <h1 className="text-3xl font-black uppercase tracking-tight text-white mb-8 border-l-4 border-primary pl-6" {...props} />,
                    h2: ({...props}) => <h2 className="text-xl font-bold uppercase tracking-wide text-primary/90 mt-12 mb-6" {...props} />,
                    p: ({...props}) => <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-6" {...props} />,
                    code: ({ className, children, ...props }: MarkdownCodeProps) => {
                      const match = /language-(\w+)/.exec(className || '');
                      const isInline = !match;
                      return (
                        <code className={`${isInline ? 'bg-muted/50 px-1.5 py-0.5 rounded' : 'block bg-muted/30 p-4 border-l-2 border-primary/30 my-6'} text-primary-foreground font-mono text-sm`} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </article>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <div className="relative">
                    <BookOpen className="w-16 h-16 text-primary/10 animate-pulse" />
                    <RotateCcw className="absolute inset-0 w-16 h-16 text-primary/5 animate-spin-slow" />
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-black tracking-[0.3em] text-primary/60 uppercase">
                      {" >> "} STATUS_STALLED: CONTENT_POLLING
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase opacity-50 font-mono tracking-widest">
                      Awaiting_Source_Verification_Sequence
                    </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Control Footer */}
      <div className="flex items-center justify-between px-2 text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">
        <p>© ANTIGRAVITY_H-FIDELITY_SUBSYSTEM</p>
        <p>MEM_POOL: 0x82DF / BUF: CLEAR</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
