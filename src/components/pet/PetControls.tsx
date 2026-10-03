"use client";

import React from "react";
import { usePixelPet } from "@/hooks/usePixelPet";
import { Eye, EyeOff, Sparkles } from "lucide-react";

export function PetControls() {
  const { isVisible, toggleVisibility, state } = usePixelPet();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleVisibility}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
        aria-label={isVisible ? "Hide pixel companion" : "Show pixel companion"}
        title={isVisible ? "Hide Pixel Hanif" : "Show Pixel Hanif"}
      >
        {isVisible ? (
          <>
            <EyeOff className="w-3.5 h-3.5 text-[var(--color-muted)]" />
            <span className="hidden sm:inline">Hide Pet</span>
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5 text-[var(--color-primary)]" />
            <span className="hidden sm:inline">Show Pet</span>
          </>
        )}
      </button>

      {isVisible && (
        <span
          className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-[var(--color-primary)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          title={`Active Pet State: ${state}`}
        >
          <Sparkles className="w-3 h-3 text-[var(--color-achievement)]" />
          <span>{state}</span>
        </span>
      )}
    </div>
  );
}
