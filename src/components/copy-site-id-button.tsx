"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopySiteIdButtonProps {
  siteObjectId: string;
}

export function CopySiteIdButton({ siteObjectId }: CopySiteIdButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySiteId = async () => {
    try {
      await navigator.clipboard.writeText(siteObjectId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      onClick={handleCopySiteId}
      className="text-primary/60 hover:text-primary transition-colors shrink-0"
      aria-label="Copy site ID"
      type="button"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
