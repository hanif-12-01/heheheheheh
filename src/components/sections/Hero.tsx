"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { MEDIA_CONFIG } from "@/lib/mediaConfig";
import { PROFILE_DATA } from "@/data/profile";
import { PixelButton } from "@/components/pixel/PixelButton";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { usePixelPet } from "@/hooks/usePixelPet";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FileText, Sparkles, Terminal, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
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

      // Transition smoothly to idle pose after greeting only if still in Hero section
      const idleTimer = setTimeout(() => {
        const heroEl = document.getElementById("hero");
        if (heroEl) {
          const rect = heroEl.getBoundingClientRect();
          if (rect.bottom > window.innerHeight * 0.3) {
            setState("idle");
          }
        }
      }, 4500);

      return () => {
        clearTimeout(speechTimer);
        clearTimeout(idleTimer);
      };
    }
  }, [mode, setState, setDialogue]);

  const isRecruiter = mode === "recruiter";

  return (
    <section
      id="hero"
      aria-label={isRecruiter ? "Candidate Overview" : "Spawn Point"}
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[var(--color-border)] pixel-grid-pattern overflow-hidden"
    >
      {/* Background Ambience: Subtle radial glow behind stage & CRT scanlines (CSS-only, Section 13) */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none select-none -z-10"
        aria-hidden="true"
      />
      {!isRecruiter && (
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
          {/* Eyebrow: Level + Spawn Point / Candidate Overview */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <PixelBadge variant="primary" size="sm">
              <span
                className={cn(
                  "w-2 h-2 bg-[var(--color-primary)] inline-block mr-1",
                  !prefersReducedMotion && "animate-pulse"
                )}
                aria-hidden="true"
              />
              {isRecruiter
                ? "CANDIDATE OVERVIEW // INFORMATICS"
                : `SPAWN POINT // LVL ${PROFILE_DATA.currentLevel}`}
            </PixelBadge>

            <span className="font-mono text-xs text-[var(--color-muted)] flex items-center gap-1.5">
              {isRecruiter ? (
                <>
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" aria-hidden="true" />
                  <span>SEMESTER 5 · IN PROGRESS</span>
                </>
              ) : (
                <>
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
                  <span>HELLO, WORLD!</span>
                </>
              )}
            </span>
          </div>

          {/* Primary Name Heading (H1) & Role Line */}
          <div className="space-y-3 w-full">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-mono tracking-tight text-[var(--color-text)] leading-[1.1] break-words">
              M. HANIF <span className="text-[var(--color-primary)]">AL FAIZ</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl font-mono text-[var(--color-blue)] font-semibold flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{isRecruiter ? "Informatics Undergraduate" : "Informatics Student"}</span>
              <span className="text-[var(--color-muted)] hidden sm:inline" aria-hidden="true">·</span>
              <span>{isRecruiter ? "Software Developer" : "Technology Builder"}</span>
              <span className="text-[var(--color-muted)] hidden sm:inline" aria-hidden="true">·</span>
              <span className="text-[var(--color-achievement)]">
                {isRecruiter ? "AI & Civic Tech Explorer" : "AI & Smart City Explorer"}
              </span>
            </p>
          </div>

          {/* Concise Positioning Statement */}
          <p className="text-sm sm:text-base text-[var(--color-muted)] font-sans max-w-2xl leading-relaxed">
            {isRecruiter ? (
              <>
                Informatics undergraduate at{" "}
                <span className="text-[var(--color-text)] font-medium">{PROFILE_DATA.university}</span> with experience
                developing software prototypes, spatial intelligence layers, and decision-support applications.
                Focused on software engineering, intelligent systems, and civic technology.
              </>
            ) : (
              <>
                Undergraduate Informatics student at{" "}
                <span className="text-[var(--color-text)] font-medium">{PROFILE_DATA.university}</span>.
                Actively building practical decision-support software, researching intelligent algorithms,
                and competing in national technology innovation challenges.
              </>
            )}
          </p>

          {/* Information Badges (Max 3) */}
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

          {/* Action CTAs (Section 9, 12: View Projects, Download CV, View GitHub) */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
            {isRecruiter ? (
              <>
                {/* Primary Recruiter CTA: View Selected Projects */}
                <PixelButton asChild variant="primary" size="md" className="w-full sm:w-auto">
                  <a href="#projects">
                    <span>View Selected Projects</span>
                    <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </a>
                </PixelButton>

                {/* Secondary Recruiter CTA: Download CV */}
                <PixelButton asChild variant="secondary" size="md" className="w-full sm:w-auto">
                  <a
                    href="/cv/M-Hanif-Al-Faiz-CV.pdf"
                    download="M-Hanif-Al-Faiz-CV.pdf"
                    aria-label="Download M. Hanif Al Faiz CV as PDF"
                  >
                    <FileText className="w-4 h-4 mr-1 text-[var(--color-primary)]" aria-hidden="true" />
                    <span>Download CV · PDF</span>
                  </a>
                </PixelButton>

                {/* Tertiary Recruiter CTA: View GitHub Profile */}
                <PixelButton asChild variant="ghost" size="md" className="w-full sm:w-auto border border-[var(--color-border)] hover:border-[var(--color-primary)]">
                  <a
                    href={SITE_CONFIG.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open M. Hanif Al Faiz GitHub profile (opens in new tab)"
                  >
                    <GithubIcon className="w-4 h-4 mr-1 text-[var(--color-text)]" aria-hidden="true" />
                    <span>GitHub Profile ↗</span>
                  </a>
                </PixelButton>
              </>
            ) : (
              <>
                {/* Primary Pixel CTA: Explore My Journey */}
                <PixelButton asChild variant="primary" size="md" className="w-full sm:w-auto">
                  <a href="#journey">
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
                  </a>
                </PixelButton>

                {/* Secondary Pixel CTA: View My Projects */}
                <PixelButton asChild variant="secondary" size="md" className="w-full sm:w-auto">
                  <a href="#projects">
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
                  </a>
                </PixelButton>

                {/* Third Action: Download CV (Active verified CV download) */}
                <PixelButton asChild variant="ghost" size="md" className="w-full sm:w-auto border border-[var(--color-border)] hover:border-[var(--color-primary)]">
                  <a
                    href="/cv/M-Hanif-Al-Faiz-CV.pdf"
                    download="M-Hanif-Al-Faiz-CV.pdf"
                    aria-label="Download M. Hanif Al Faiz CV as PDF"
                  >
                    <FileText className="w-4 h-4 mr-1 text-[var(--color-primary)]" aria-hidden="true" />
                    <span>Download CV · PDF</span>
                  </a>
                </PixelButton>
              </>
            )}
          </div>

          {/* Current Status Footnote */}
          <div className="pt-2 text-xs font-mono text-[var(--color-muted)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" aria-hidden="true" />
            <span>
              {isRecruiter
                ? "STATUS: UNDERGRADUATE INFORMATICS · ENROLLED"
                : "STATUS: BUILDING & EXPLORING"}
            </span>
            <span className="text-[var(--color-border)]" aria-hidden="true">/</span>
            <span className="text-[var(--color-primary)]">
              {isRecruiter ? "CLASS OF 2027" : "ACTIVE SPRINTS"}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Profile Photo Stage & Pixel Frame (~42%, Section 7, 8, 9, 11) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
          <div className="w-full max-w-sm sm:max-w-md border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-[6px_6px_0px_0px_#0B1020] sm:shadow-[8px_8px_0px_0px_#0B1020] p-3 sm:p-4 flex flex-col items-center relative">
            {/* Terminal Window Header Bar */}
            <div className="w-full flex items-center justify-between pb-2.5 mb-3 border-b border-[var(--color-border)] text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span className="text-[var(--color-text)] font-bold tracking-wider">
                  {isRecruiter ? "CANDIDATE PROFILE" : "PORTRAIT_STAGE.EXE"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.5 text-[9px] bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded font-mono font-bold">
                  {isRecruiter ? "● VERIFIED RECORD" : "● ACTIVE"}
                </span>
              </div>
            </div>

            {/* Profile Photo Stage (Genuine Photograph if provided, otherwise Section 11 Placeholder Frame) */}
            {MEDIA_CONFIG.portrait?.src ? (
              <div
                className="relative w-full aspect-[4/5] bg-[var(--color-background)] border-2 border-[var(--color-border)] overflow-hidden"
                role="img"
                aria-label={MEDIA_CONFIG.portrait.alt || `Portrait photograph of ${PROFILE_DATA.name}`}
              >
                <Image
                  src={MEDIA_CONFIG.portrait.src}
                  alt={MEDIA_CONFIG.portrait.alt || `Portrait photograph of ${PROFILE_DATA.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 384px"
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle corner reticles for retro HUD framing */}
                <div className="absolute top-2 left-2 text-[var(--color-primary)] font-mono text-sm leading-none drop-shadow pointer-events-none select-none" aria-hidden="true">
                  ┌
                </div>
                <div className="absolute top-2 right-2 text-[var(--color-primary)] font-mono text-sm leading-none drop-shadow pointer-events-none select-none" aria-hidden="true">
                  ┐
                </div>
                <div className="absolute bottom-2 left-2 text-[var(--color-primary)] font-mono text-sm leading-none drop-shadow pointer-events-none select-none" aria-hidden="true">
                  └
                </div>
                <div className="absolute bottom-2 right-2 text-[var(--color-primary)] font-mono text-sm leading-none drop-shadow pointer-events-none select-none" aria-hidden="true">
                  ┘
                </div>
                {/* Verified badge tag */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-[#0B1020]/85 border border-[var(--color-border)] font-mono text-[9px] text-[var(--color-primary)] flex items-center gap-1 pointer-events-none select-none">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" aria-hidden="true" />
                  <span>{isRecruiter ? "VERIFIED PORTRAIT" : "AVATAR // VERIFIED"}</span>
                </div>
              </div>
            ) : (
              <div
                className="relative w-full aspect-[4/5] bg-[var(--color-background)] border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-between p-6 text-center select-none overflow-hidden"
                role="img"
                aria-label="Portrait placeholder for M. Hanif Al Faiz. Official photograph coming soon."
              >
                {/* Corner Reticle Viewfinders */}
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
                  <span>{isRecruiter ? "STATUS: ENROLLED" : "STAGE: 4:5"}</span>
                  <span className="text-[var(--color-primary)] font-bold">
                    {isRecruiter ? "INFORMATICS" : "HANIF_ID#01"}
                  </span>
                  <span>{isRecruiter ? "GPA: 3.66" : "REC_READY"}</span>
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
                      {isRecruiter ? "PORTRAIT COMING SOON" : "PROFILE PHOTOGRAPH"}
                    </span>
                    <span className="block font-mono text-[10px] sm:text-xs text-[var(--color-muted)]">
                      {isRecruiter ? "OFFICIAL PHOTOGRAPH PENDING" : "COMING SOON IN RELEASE 1.0"}
                    </span>
                  </div>
                </div>

                {/* Viewfinder Bottom Tag */}
                <div className="w-full pt-2 border-t border-[var(--color-border)]/50 text-[10px] font-mono text-[var(--color-muted)] flex items-center justify-between">
                  <span>{PROFILE_DATA.university.toUpperCase()}</span>
                  <span className="text-[var(--color-achievement)] font-bold">GPA: {PROFILE_DATA.gpa.split(" ")[0]}</span>
                </div>
              </div>
            )}

            {/* Frame Metadata Footer Bar */}
            <div className="w-full mt-3 pt-2.5 border-t border-[var(--color-border)] flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[var(--color-muted)]">
              <span className="truncate">
                {isRecruiter ? "TELKOM UNIV PURWOKERTO" : "PURWOKERTO // ID"}
              </span>
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
