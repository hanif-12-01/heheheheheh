"use client";

import React from "react";
import Image from "next/image";
import { PROFILE_DATA } from "@/data/profile";
import { journeyAssets, uiAssets } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { BookOpen, Sparkles, Target, Compass, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function About() {
  const { mode } = usePortfolioMode();

  const philosophyPillars = [
    {
      id: "build-to-solve",
      title: "BUILD TO SOLVE",
      icon: <Target className="w-4 h-4 text-[var(--color-primary)]" />,
      accentColor: "var(--color-primary)",
      description:
        "Technology should serve practical community needs, not merely accumulate technical debt.",
      tag: "PRACTICALITY",
    },
    {
      id: "continuous-rd",
      title: "CONTINUOUS R&D",
      icon: <Compass className="w-4 h-4 text-[var(--color-blue)]" />,
      accentColor: "var(--color-blue)",
      description:
        "Active involvement in faculty research, student creativity initiatives, and national hackathons.",
      tag: "INNOVATION",
    },
    {
      id: "shared-leadership",
      title: "SHARED LEADERSHIP",
      icon: <Sparkles className="w-4 h-4 text-[var(--color-achievement)]" />,
      accentColor: "var(--color-achievement)",
      description:
        "Belief in strong team coordination, transparent governance, and peer mentorship.",
      tag: "COLLABORATION",
    },
  ];

  const currentFocusItems = [
    "Advancing WattWise AI startup energy solutions",
    "Refining Purwokerto GIS spatial intelligence layers",
    "Studying Semester 5 informatics coursework & research",
    "Coordinating academic seminars & community visits",
  ];

  return (
    <section
      id="about"
      aria-label="About Hanif"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)] select-none"
    >
      <PixelSectionTitle
        number="03"
        title="ABOUT HANIF // ORIGIN & MINDSET"
        subtitle="Bridging academic informatics, civic engineering, and real-world system development."
        badge="THE LORE"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Narrative Biography & Philosophy Pillars (~62%) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Narrative Window/Card */}
          <PixelCard className="space-y-5 p-6 sm:p-7">
            {/* Window Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] font-bold">
                  BIOGRAPHY // ORIGIN STORY
                </span>
              </div>
              <PixelBadge variant="outline" size="sm">
                READING MODE
              </PixelBadge>
            </div>

            {/* Extended Narrative Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[var(--color-text)] font-sans leading-relaxed">
              {PROFILE_DATA.bioExtended.map((paragraph, index) => (
                <p key={index} className="text-[var(--color-text)]/90">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Inset Terminal Callout */}
            <div className="p-3.5 bg-[var(--color-background)] border border-[var(--color-border)] flex items-start gap-2.5 font-mono text-xs text-[var(--color-muted)]">
              <Terminal className="w-4 h-4 text-[var(--color-primary)] shrink-0 mt-0.5" />
              <span>
                &ldquo;Rather than treating code as isolated syntax, I treat every project as an interactive system built to provide tangible decision support.&rdquo;
              </span>
            </div>
          </PixelCard>

          {/* Philosophy Pillars: Stepped Manifesto Blocks */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider pl-1">
              <span>CORE PRINCIPLES</span>
              <span className="text-[var(--color-border)]">{"//"}</span>
              <span className="text-[var(--color-primary)] font-bold">HOW I THINK &amp; WORK</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {philosophyPillars.map((pillar) => (
                <div
                  key={pillar.id}
                  className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] hover:border-[var(--color-text)] transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)] flex flex-col justify-between space-y-2 relative"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: pillar.accentColor }}
                  />

                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--color-text)]">
                        {pillar.icon}
                        <span>{pillar.title}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--color-border)]/50">
                    <span className="text-[9px] font-mono text-[var(--color-muted)] tracking-wider">
                      [{pillar.tag}]
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Visual Panel with Study Book & Current Focus (~38%) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-6 w-full">
          {/* Study Book Visual Stage Panel */}
          <div className="p-5 bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] flex flex-col items-center text-center relative overflow-hidden">
            {/* Panel Header */}
            <div className="w-full flex items-center justify-between pb-2 mb-3 border-b border-[var(--color-border)] text-[10px] font-mono text-[var(--color-muted)]">
              <span>ACADEMIC STUDY // PROP</span>
              <span className="text-[var(--color-primary)] font-bold">LVL 03 ARTIFACT</span>
            </div>

            {/* Semester 3 Open Book Production Pixel Asset */}
            <div className="py-2 flex items-center justify-center">
              <div className="relative w-36 sm:w-44 h-24 sm:h-28 flex items-center justify-center group">
                <Image
                  src={journeyAssets.book.src}
                  alt={journeyAssets.book.alt}
                  width={140}
                  height={98}
                  className="w-auto h-full max-h-24 sm:max-h-28 object-contain transition-transform duration-200 group-hover:scale-105"
                  style={{ imageRendering: "pixelated" }}
                  unoptimized
                />
              </div>
            </div>

            <div className="space-y-1 mt-2">
              <span className="font-mono text-xs font-bold text-[var(--color-text)] block tracking-wider">
                CONTINUOUS STUDY &amp; RESEARCH
              </span>
              <p className="text-[11px] font-mono text-[var(--color-muted)] leading-relaxed">
                Semester 3 Open Book &mdash; Symbolizing active academic inquiry, theoretical foundations, and knowledge sharing.
              </p>
            </div>
          </div>

          {/* Current Focus Panel (Compact, max 4 items) */}
          <PixelCard variant="primary" className="space-y-3.5 p-5">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-mono text-xs uppercase font-bold text-[var(--color-primary)] tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[var(--color-primary)] inline-block animate-pulse" />
                <span>CURRENT FOCUS (2026)</span>
              </h3>
              <span className="text-[9px] font-mono px-1 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-muted)]">
                ACTIVE
              </span>
            </div>

            <ul className="space-y-2 text-xs font-mono text-[var(--color-text)]">
              {currentFocusItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-[var(--color-primary)] font-bold shrink-0">&gt;</span>
                  <span className="text-[var(--color-text)]/90">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-[var(--color-border)]/50 text-[10px] font-mono text-[var(--color-muted)] flex items-center justify-between">
              <span>ACTIVE SPRINTS</span>
              <span className="text-[var(--color-primary)]">SEMESTER 5</span>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
}

