"use client";

import React from "react";
import Image from "next/image";
import { useLocalize } from "@/i18n/useTranslations";
import { usePixelPet } from "@/hooks/usePixelPet";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { Eye, EyeOff } from "lucide-react";

export function PetControls() {
  const localize = useLocalize();
  const { isVisible, toggleVisibility, state } = usePixelPet();
  const { mode } = usePortfolioMode();

  // In recruiter mode, pet-only controls do not occupy unnecessary space
  if (mode === "recruiter") {
    return null;
  }

  return localize(
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleVisibility}
        aria-pressed={isVisible}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono uppercase bg-[var(--color-surface)] hover:bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
        aria-label="Toggle pixel companion visibility"
        title={isVisible ? "Hide Pixel Hanif" : "Show Pixel Hanif"}
      >
        {isVisible ? (
          <>
            <EyeOff className="w-3.5 h-3.5 text-[var(--color-muted)]" aria-hidden="true" />
            <span className="hidden sm:inline">Hide Pet</span>
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
            <span className="hidden sm:inline">Show Pet</span>
          </>
        )}
      </button>

      {isVisible && (
        <span
          className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-[var(--color-primary)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          title={`Active Pet State: ${state}`}
        >
          <Image src="/pixel/ui/ui-sparkle.webp" alt="" width={12} height={12} unoptimized aria-hidden="true" style={{ imageRendering: "pixelated" }} />
          <span>{state}</span>
        </span>
      )}
    </div>
  );
}
