"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { PetControls } from "@/components/pet/PetControls";
import { PixelButton } from "@/components/pixel/PixelButton";
import { Menu, X, Briefcase, Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

function getNavLabel(label: string, mode: string): string {
  if (mode !== "recruiter") return label;
  switch (label) {
    case "Spawn":
      return "Overview";
    case "Journey":
      return "Experience";
    case "Trophy Room":
      return "Achievements";
    case "Project Lab":
      return "Projects";
    default:
      return label;
  }
}

export function Navbar() {
  const { mode, toggleMode } = usePortfolioMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on Escape key press and return focus to toggle button (WCAG 2.2 AA)
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--color-background)]/90 backdrop-blur-md border-b-2 border-[var(--color-border)] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        >
          <div className="w-8 h-8 bg-[var(--color-primary)] text-[#0B1020] font-mono font-black flex items-center justify-center text-sm shadow-[2px_2px_0px_0px_#0B1020] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
            H_
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-sm sm:text-base font-bold tracking-wider text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
              {SITE_CONFIG.identity}
            </span>
            <span className="text-[10px] font-mono text-[var(--color-muted)] leading-none hidden sm:block">
              {SITE_CONFIG.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-0.5 xl:gap-2 text-[11px] xl:text-xs font-mono"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-1.5 xl:px-2.5 py-1 text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface)] transition-colors border border-transparent hover:border-[var(--color-border)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] whitespace-nowrap"
            >
              {getNavLabel(item.label, mode)}
            </a>
          ))}
        </nav>

        {/* Action Controls: Mode Switcher & Pet Toggle & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mode Switcher */}
          <button
            id="mode-toggle-btn"
            onClick={toggleMode}
            type="button"
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase border transition-all duration-75 select-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]",
              mode === "pixel"
                ? "bg-[var(--color-surface)] border-[var(--color-primary)] text-[var(--color-primary)]"
                : "bg-[var(--color-surface-secondary)] border-[var(--color-border)] text-[var(--color-text)]"
            )}
            title={mode === "pixel" ? "Switch to Recruiter Mode" : "Switch to Pixel Mode"}
            aria-label={`Switch portfolio mode. Current mode: ${mode}`}
          >
            {mode === "pixel" ? (
              <>
                <Gamepad2 className="w-3.5 h-3.5 text-[var(--color-achievement)]" aria-hidden="true" />
                <span className="hidden sm:inline">Pixel</span>
              </>
            ) : (
              <>
                <Briefcase className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                <span className="hidden sm:inline">Recruiter</span>
              </>
            )}
          </button>

          {/* Pet Toggle Control (Pixel Mode Only per Section 32) */}
          {mode === "pixel" && (
            <div className="hidden sm:block">
              <PetControls />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-menu"
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[var(--color-surface)] border-b-2 border-[var(--color-border)] px-4 py-4 space-y-2 font-mono text-sm animate-in slide-in-from-top-2 duration-100"
        >
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
              >
                {getNavLabel(item.label, mode)}
              </a>
            ))}
          </div>
          {mode === "pixel" && (
            <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs text-[var(--color-muted)] font-mono">Companion:</span>
              <PetControls />
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
