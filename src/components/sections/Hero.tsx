"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { PROFILE_DATA } from "@/data/profile";
import { PixelButton } from "@/components/pixel/PixelButton";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { usePixelPet } from "@/hooks/usePixelPet";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FileText, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  const { setState, setDialogue } = usePixelPet();
  const { mode } = usePortfolioMode();
  const prefersReducedMotion = useReducedMotion();
  const hasGreetedRef = useRef(false);

  // Initial greeting behavior for Pixel Hanif on first load in Hero (Section 10 & 11)
  useEffect(() => {
    if (!hasGreetedRef.current && mode === "pixel") {
      hasGreetedRef.current = true;
      setState("wave");

      // Display friendly welcome speech bubble on first visit
      const speechTimer = setTimeout(() => {
        setDialogue("Hey! I'm Hanif 👋 Welcome to my spawn point!");
      }, 700);

      // Transition smoothly to idle pose after greeting
      const idleTimer = setTimeout(() => {
        setState("idle");
      }, 4500);

      return () => {
        clearTimeout(speechTimer);
        clearTimeout(idleTimer);
      };
    }
  }, [mode, setState, setDialogue]);

  return (
    <section
      id="hero"
      aria-label="Spawn Point"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[var(--color-border)] pixel-grid-pattern overflow-hidden select-none"
    >
      {/* Background Ambience: Subtle radial glow behind stage & CRT scanlines (CSS-only, Section 13) */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none select-none -z-10"
        aria-hidden="true"
      />
      {mode === "pixel" && (
        <div
          className="absolute inset-0 pixel-scanlines opacity-30 pointer-events-none select-none -z-10"
          aria-hidden="true"
        />
      )}

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Eyebrow, Identity, Positioning, Focus Badges, CTAs (~58%) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          {/* Eyebrow: Level + Spawn Point */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <PixelBadge variant="primary" size="sm">
              <span
                className={cn(
                  "w-2 h-2 bg-[var(--color-primary)] inline-block mr-1",
                  !prefersReducedMotion && "animate-pulse"
                )}
                aria-hidden="true"
              />
              SPAWN POINT // LVL {PROFILE_DATA.currentLevel}
            </PixelBadge>

            <span className="font-mono text-xs text-[var(--color-muted)] flex items-center gap-1.5">
              <Image
                src="/pixel/ui/ui-sparkle.png"
                alt=""
                width={14}
                height={14}
                className="w-3.5 h-3.5 inline-block"
                style={{ imageRendering: "pixelated" }}
                aria-hidden="true"
                unoptimized
              />
              HELLO, WORLD!
            </span>
          </div>

          {/* Primary Name Heading (H1) & Role Line */}
          <div className="space-y-3 w-full">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-[var(--color-text)] leading-[1.1] break-words">
              M. HANIF <span className="text-[var(--color-primary)]">AL FAIZ</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-mono text-[var(--color-blue)] font-semibold flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Informatics Student</span>
              <span className="text-[var(--color-muted)] hidden sm:inline" aria-hidden="true">·</span>
              <span>Technology Builder</span>
              <span className="text-[var(--color-muted)] hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-[var(--color-achievement)]">AI &amp; Smart City Explorer</span>
            </p>
          </div>

          {/* Concise Positioning Statement (Section 3) */}
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-sans max-w-2xl leading-relaxed">
            Undergraduate Informatics student at{" "}
            <span className="text-[var(--color-text)] font-medium">{PROFILE_DATA.university}</span>.
            Actively building practical decision-support software, researching intelligent algorithms,
            and competing in national technology innovation challenges.
          </p>

          {/* Information Badges (Max 3, Section 16) */}
          <div className="flex flex-wrap gap-2 pt-1" aria-label="Core Technical Focus Areas">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
              <Image
                src="/pixel/ui/ui-star.png"
                alt=""
                width={14}
                height={14}
                className="w-3.5 h-3.5"
                style={{ imageRendering: "pixelated" }}
                aria-hidden="true"
                unoptimized
              />
              <span>AI &amp; Smart City</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
              <Image
                src="/pixel/ui/ui-code.png"
                alt=""
                width={14}
                height={14}
                className="w-3.5 h-3.5"
                style={{ imageRendering: "pixelated" }}
                aria-hidden="true"
                unoptimized
              />
              <span>Software Engineering</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
              <Image
                src="/pixel/ui/ui-checkpoint.png"
                alt=""
                width={14}
                height={14}
                className="w-3.5 h-3.5"
                style={{ imageRendering: "pixelated" }}
                aria-hidden="true"
                unoptimized
              />
              <span>Research &amp; Competitions</span>
            </div>
          </div>

          {/* Action CTAs (Section 4, 5, 6) */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
            {/* Primary CTA: Explore My Journey */}
            <a href="#journey" className="w-full sm:w-auto">
              <PixelButton variant="primary" size="md" className="w-full sm:w-auto">
                <span>Explore My Journey</span>
                <Image
                  src="/pixel/ui/ui-arrow-right.png"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4 ml-1"
                  style={{ imageRendering: "pixelated" }}
                  aria-hidden="true"
                  unoptimized
                />
              </PixelButton>
            </a>

            {/* Secondary CTA: View My Projects */}
            <a href="#projects" className="w-full sm:w-auto">
              <PixelButton variant="secondary" size="md" className="w-full sm:w-auto">
                <Image
                  src="/pixel/ui/ui-folder.png"
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4 mr-1"
                  style={{ imageRendering: "pixelated" }}
                  aria-hidden="true"
                  unoptimized
                />
                <span>View My Projects</span>
              </PixelButton>
            </a>

            {/* Third Action: Download CV (Handled safely per Section 6 — no fake href) */}
            <div className="relative group w-full sm:w-auto">
              <PixelButton
                type="button"
                variant="ghost"
                size="md"
                disabled
                aria-disabled="true"
                title="Curriculum Vitae file will be available in the upcoming release"
                className="w-full sm:w-auto border border-dashed border-[var(--color-border)] opacity-70 cursor-not-allowed hover:bg-transparent"
              >
                <FileText className="w-4 h-4 mr-1 text-[var(--color-muted)]" />
                <span>Download CV</span>
                <span className="ml-1 px-1.5 py-0.2 bg-[var(--color-surface)] border border-[var(--color-border)] text-[9px] text-[var(--color-primary)] font-bold">
                  Soon
                </span>
              </PixelButton>
            </div>
          </div>

          {/* Current Status Footnote (Section 17) */}
          <div className="pt-2 text-xs font-mono text-[var(--color-muted)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" aria-hidden="true" />
            <span>STATUS: BUILDING &amp; EXPLORING</span>
            <span className="text-[var(--color-border)]" aria-hidden="true">/</span>
            <span className="text-[var(--color-primary)]">ACTIVE SPRINTS</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Profile Photo Stage & Pixel Frame (~42%, Section 7, 8, 9) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-sm sm:max-w-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-[6px_6px_0px_0px_#0B1020] sm:shadow-[8px_8px_0px_0px_#0B1020] p-3 sm:p-4 flex flex-col items-center relative">
            {/* Terminal Window Header Bar */}
            <div className="w-full flex items-center justify-between pb-2.5 mb-3 border-b border-[var(--color-border)] text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span className="text-[var(--color-text)] font-bold tracking-wider">
                  PORTRAIT_STAGE.EXE
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded font-mono font-bold">
                  ● ACTIVE
                </span>
              </div>
            </div>

            {/* Profile Photo Placeholder Frame (Production-Ready drop-in stage, Section 8 & 9) */}
            <div
              className="relative w-full aspect-[4/5] bg-[var(--color-background)] border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-between p-6 text-center select-none overflow-hidden"
              role="img"
              aria-label="Profile photo placeholder for M. Hanif Al Faiz. Photograph coming soon."
            >
              {/* Corner Reticle Viewfinders (Photographic Aperture Bracket) */}
              <div className="absolute top-2 left-2 text-[var(--color-primary)] font-mono text-sm leading-none" aria-hidden="true">
                ┌
              </div>
              <div className="absolute top-2 right-2 text-[var(--color-primary)] font-mono text-sm leading-none" aria-hidden="true">
                ┐
              </div>
              <div className="absolute bottom-2 left-2 text-[var(--color-primary)] font-mono text-sm leading-none" aria-hidden="true">
                └
              </div>
              <div className="absolute bottom-2 right-2 text-[var(--color-primary)] font-mono text-sm leading-none" aria-hidden="true">
                ┘
              </div>

              {/* Viewfinder Top Scale Marker */}
              <div className="w-full flex justify-between items-center text-[9px] font-mono text-[var(--color-muted)] pt-1">
                <span>STAGE: 4:5</span>
                <span className="text-[var(--color-primary)] font-bold">HANIF_ID#01</span>
                <span>REC_READY</span>
              </div>

              {/* Center Silhouette Stage */}
              <div className="my-auto flex flex-col items-center justify-center space-y-3">
                {/* Stylized Avatar Placeholder Bezel */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--color-surface)] border-2 border-[var(--color-primary)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] flex items-center justify-center relative">
                  <div className="w-12 h-12 border border-[var(--color-border)] bg-[var(--color-surface-secondary)] flex items-center justify-center text-[var(--color-primary)] font-mono font-black text-xl">
                    H_
                  </div>
                  {/* Micro corner accent */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-achievement)]" aria-hidden="true" />
                </div>

                <div className="space-y-1">
                  <span className="block font-mono text-xs sm:text-sm font-bold text-[var(--color-text)] tracking-wider">
                    PROFILE PHOTOGRAPH
                  </span>
                  <span className="block font-mono text-[10px] sm:text-xs text-[var(--color-muted)]">
                    COMING SOON IN RELEASE 1.0
                  </span>
                </div>
              </div>

              {/* Viewfinder Bottom Tag */}
              <div className="w-full pt-2 border-t border-[var(--color-border)]/50 text-[10px] font-mono text-[var(--color-muted)] flex items-center justify-between">
                <span>{PROFILE_DATA.university.toUpperCase()}</span>
                <span className="text-[var(--color-achievement)] font-bold">GPA: {PROFILE_DATA.gpa.split(" ")[0]}</span>
              </div>
            </div>

            {/* Frame Metadata Footer Bar */}
            <div className="w-full mt-3 pt-2.5 border-t border-[var(--color-border)] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--color-muted)]">
              <span className="truncate">PURWOKERTO // ID</span>
              <span className="text-[var(--color-primary)] font-bold shrink-0">
                CLASS OF {PROFILE_DATA.expectedGraduation}
              </span>
            </div>

            {/* Outer Decorative Pixel Dots */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-[var(--color-primary)]" aria-hidden="true" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-primary)]" aria-hidden="true" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[var(--color-primary)]" aria-hidden="true" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[var(--color-primary)]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
