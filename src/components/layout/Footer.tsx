"use client";

import React from "react";
import Image from "next/image";
import { useLocalize } from "@/i18n/useTranslations";
import { CvActions } from "@/components/ui/CvActions";
import { SITE_CONFIG } from "@/lib/constants";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { ArrowUp } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";

export function Footer() {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();
  const currentYear = new Date().getFullYear();

  return localize(
    <footer className="w-full bg-[var(--color-surface)] border-t-2 border-[var(--color-border)] mt-20 py-10 px-4 sm:px-6 lg:px-8 select-none font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Column: Brand & Academic Identity */}
        <div className="space-y-1.5 max-w-md">
          <div className="flex items-center gap-2">
            <Image src="/pixel/ui/ui-code.webp" alt="" width={16} height={16} unoptimized aria-hidden="true" style={{ imageRendering: "pixelated" }} />
            <span className="font-bold text-sm tracking-wider text-[var(--color-text)]">
              {mode === "recruiter"
                ? "HANIF.EXE · The Grand Atelier"
                : `${SITE_CONFIG.identity} · Thanks for visiting.`}
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed">
            {SITE_CONFIG.name} &bull; Informatics Undergraduate &bull; {SITE_CONFIG.university}
          </p>
          <p className="text-[11px] text-[var(--color-muted)] font-mono">
            &quot;{SITE_CONFIG.tagline}&quot;
          </p>
        </div>

        {/* Right Column: Active GitHub Link & Respawn Top Action */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <CvActions className="world-action" />
          <a
            href={SITE_CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
            aria-label="Open M. Hanif Al Faiz on GitHub (opens in new tab)"
          >
            <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>GitHub ↗</span>
          </a>

          <a
            href="#main-content"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-primary)] hover:brightness-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
            aria-label={mode === "recruiter" ? "Return to top of page" : "Return to Spawn Point top of page"}
          >
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Back to top</span>
          </a>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="max-w-7xl mx-auto mt-6 pt-5 border-t border-[var(--color-border)]/50 text-[11px] text-[var(--color-muted)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p>&copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.</p>
        <p className="text-[10px] text-[var(--color-muted)]">
          {SITE_CONFIG.tagline}
        </p>
      </div>
    </footer>
  );
}
