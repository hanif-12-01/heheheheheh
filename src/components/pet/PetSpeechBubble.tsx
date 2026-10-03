"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PetSpeechBubbleProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export function PetSpeechBubble({ message, onDismiss, className }: PetSpeechBubbleProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      onClick={onDismiss}
      className={cn(
        "relative px-3 py-2 bg-[var(--color-surface)] text-[var(--color-text)] border-2 border-[var(--color-primary)] shadow-[4px_4px_0px_0px_#0B1020] text-xs font-mono select-none cursor-pointer max-w-[220px] transition-all animate-in fade-in slide-in-from-bottom-2 duration-150",
        className
      )}
    >
      <p className="leading-snug">{message}</p>
      {/* Pixel Pointer / Downward notch */}
      <div className="absolute -bottom-[8px] right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[var(--color-primary)]" />
      <div className="absolute -bottom-[5px] right-[25px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[var(--color-surface)]" />
    </div>
  );
}
