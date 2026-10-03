import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { Terminal, ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--color-surface)] border-t-2 border-[var(--color-border)] mt-24 py-12 px-4 sm:px-6 lg:px-8 select-none font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="font-bold text-sm tracking-wider text-[var(--color-text)]">
              {SITE_CONFIG.identity} {"//"} SYS_STATUS: OPERATIONAL
            </span>
          </div>
          <p className="text-xs text-[var(--color-muted)] font-sans max-w-md">
            Built with Next.js, TypeScript, Tailwind CSS & modular pixel architecture.
            Designed for high performance, accessibility, and playful exploration.
          </p>
          <div className="text-[11px] text-[var(--color-muted)]">
            <span>{SITE_CONFIG.name}</span> • <span>{SITE_CONFIG.university}</span>
          </div>
        </div>

        {/* Right Column: Fast Jump & Version */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs">
          <span className="text-[var(--color-muted)]">
            BUILD: v0.1.0-phase1-arch
          </span>
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-primary)] hover:border-[var(--color-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>RESPAWN_TOP</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[var(--color-border)]/50 text-[11px] text-[var(--color-muted)] flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© {new Date().getFullYear()} M. Hanif Al Faiz. All rights reserved.</p>
        <p className="text-[10px] text-[var(--color-muted)]">
          Pixel RPG aesthetic crafted as personal branding.
        </p>
      </div>
    </footer>
  );
}
