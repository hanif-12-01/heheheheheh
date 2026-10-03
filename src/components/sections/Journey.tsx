"use client";

import React, { useState } from "react";
import Image from "next/image";
import { JOURNEY_LEVELS } from "@/data/journey";
import { journeyAssets, uiAssets } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelButton } from "@/components/pixel/PixelButton";
import { cn } from "@/lib/utils";
import {
  Check,
  Flag,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Award,
  Star,
  Compass,
  BookOpen,
  Trophy,
  Rocket,
  Building2,
  ChevronRight,
} from "lucide-react";

/**
 * Category variant mapping for restrained PixelBadge styling.
 */
const CATEGORY_VARIANT_MAP: Record<
  string,
  "primary" | "secondary" | "achievement" | "accent" | "blue"
> = {
  leadership: "primary",
  organization: "secondary",
  competition: "achievement",
  achievement: "achievement",
  research: "accent",
  technology: "blue",
  "public-speaking": "primary",
  community: "secondary",
  startup: "achievement",
};

/**
 * Individual Landmark Renderer for each university semester.
 * Preserves normalized world assets and custom paired/composite compositions.
 */
function JourneyLandmark({ semester }: { semester: number }) {
  switch (semester) {
    case 1:
      return (
        <div className="relative flex items-center justify-center py-2 px-1">
          <Image
            src={journeyAssets.backpack.src}
            alt={journeyAssets.backpack.alt}
            width={journeyAssets.backpack.recommendedDisplaySize.width}
            height={journeyAssets.backpack.recommendedDisplaySize.height}
            className="w-auto h-28 sm:h-36 lg:h-40 max-w-full object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.6)] select-none pointer-events-none transition-transform duration-200 group-hover:scale-105"
            style={{ imageRendering: "pixelated" }}
            loading="lazy"
          />
        </div>
      );

    case 2:
      return (
        <div className="relative flex items-center justify-center py-2 px-1">
          <Image
            src={journeyAssets.organizationBuilding.src}
            alt={journeyAssets.organizationBuilding.alt}
            width={journeyAssets.organizationBuilding.recommendedDisplaySize.width}
            height={journeyAssets.organizationBuilding.recommendedDisplaySize.height}
            className="w-auto h-28 sm:h-36 lg:h-40 max-w-full object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.6)] select-none pointer-events-none transition-transform duration-200 group-hover:scale-105"
            style={{ imageRendering: "pixelated" }}
            loading="lazy"
          />
        </div>
      );

    case 3:
      return (
        <div className="relative flex items-center justify-center gap-1 sm:gap-3 py-2 px-1">
          {/* Primary Asset: Open Study Book */}
          <div className="relative z-10 shrink-0">
            <Image
              src={journeyAssets.book.src}
              alt={journeyAssets.book.alt}
              width={journeyAssets.book.recommendedDisplaySize.width}
              height={journeyAssets.book.recommendedDisplaySize.height}
              className="w-auto h-20 sm:h-24 lg:h-28 object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.6)] select-none pointer-events-none"
              style={{ imageRendering: "pixelated" }}
              loading="lazy"
            />
          </div>
          {/* Supporting Asset: Speaker Microphone */}
          <div className="relative -ml-3 sm:-ml-5 z-20 self-end mb-1 shrink-0">
            <Image
              src={journeyAssets.microphone.src}
              alt={journeyAssets.microphone.alt}
              width={journeyAssets.microphone.recommendedDisplaySize.width}
              height={journeyAssets.microphone.recommendedDisplaySize.height}
              className="w-auto h-16 sm:h-20 lg:h-24 object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.6)] select-none pointer-events-none"
              style={{ imageRendering: "pixelated" }}
              loading="lazy"
            />
          </div>
        </div>
      );

    case 4:
      return (
        <div className="relative flex items-end justify-center gap-1 sm:gap-2 py-2 px-1">
          {/* Secondary: Research Document (Flanking Left) */}
          <div className="relative z-10 mb-1 shrink-0">
            <Image
              src={journeyAssets.researchDocument.src}
              alt={journeyAssets.researchDocument.alt}
              width={journeyAssets.researchDocument.recommendedDisplaySize.width}
              height={journeyAssets.researchDocument.recommendedDisplaySize.height}
              className="w-auto h-14 sm:h-18 lg:h-22 object-contain drop-shadow-[3px_3px_0px_rgba(0,0,0,0.6)] select-none pointer-events-none opacity-90"
              style={{ imageRendering: "pixelated" }}
              loading="lazy"
            />
          </div>

          {/* Primary Focal Point: Golden Trophy (Center Foreground) */}
          <div className="relative z-20 shrink-0">
            <Image
              src={journeyAssets.trophy.src}
              alt={journeyAssets.trophy.alt}
              width={journeyAssets.trophy.recommendedDisplaySize.width}
              height={journeyAssets.trophy.recommendedDisplaySize.height}
              className="w-auto h-24 sm:h-32 lg:h-36 object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.7)] select-none pointer-events-none"
              style={{ imageRendering: "pixelated" }}
              loading="lazy"
            />
          </div>

          {/* Secondary: Research Flask (Flanking Right) */}
          <div className="relative z-10 mb-1 shrink-0">
            <Image
              src={journeyAssets.researchFlask.src}
              alt={journeyAssets.researchFlask.alt}
              width={journeyAssets.researchFlask.recommendedDisplaySize.width}
              height={journeyAssets.researchFlask.recommendedDisplaySize.height}
              className="w-auto h-14 sm:h-18 lg:h-22 object-contain drop-shadow-[3px_3px_0px_rgba(0,0,0,0.6)] select-none pointer-events-none opacity-90"
              style={{ imageRendering: "pixelated" }}
              loading="lazy"
            />
          </div>
        </div>
      );

    case 5:
      return (
        <div className="relative flex items-center justify-center py-2 px-1">
          <div className="animate-rocket-float">
            <Image
              src={journeyAssets.rocket.src}
              alt={journeyAssets.rocket.alt}
              width={journeyAssets.rocket.recommendedDisplaySize.width}
              height={journeyAssets.rocket.recommendedDisplaySize.height}
              className="w-auto h-28 sm:h-36 lg:h-44 max-w-full object-contain drop-shadow-[0_0_14px_rgba(93,228,199,0.35)] select-none pointer-events-none"
              style={{ imageRendering: "pixelated" }}
              loading="lazy"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function Journey() {
  // Default selected milestone: Semester 5 (current level)
  const [selectedSemester, setSelectedSemester] = useState<number>(5);

  const handleSelectSemester = (sem: number) => {
    setSelectedSemester(sem);
  };

  return (
    <section
      id="journey"
      aria-label="The Journey"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      {/* Section Header */}
      <PixelSectionTitle
        number="05"
        title="THE JOURNEY // ADVENTURE MAP"
        subtitle="Five semesters of exploration, leadership, research, competition, and building."
        badge="ACADEMIC PROGRESSION"
      />

      {/* ADVENTURE MAP WAYPOINT BAR (Quick Jump Ribbon) */}
      <nav
        aria-label="Semester Milestones Navigator"
        className="mb-12 p-3 sm:p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="font-mono text-xs font-bold text-[var(--color-text)] tracking-wider">
              MAP WAYPOINTS
            </span>
            <span className="text-[var(--color-muted)] font-mono text-xs">{"//"}</span>
            <span className="text-[11px] font-mono text-[var(--color-muted)]">
              SELECT CHECKPOINT TO INSPECT
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="inline-block w-2 h-2 bg-[var(--color-primary)]" />
            <span className="text-[var(--color-muted)]">4 Completed</span>
            <span className="text-[var(--color-border)]">|</span>
            <span className="inline-block w-2 h-2 bg-[var(--color-achievement)] animate-pulse" />
            <span className="text-[var(--color-achievement)] font-semibold">Sem 5 Current</span>
          </div>
        </div>

        {/* Waypoint Buttons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3">
          {JOURNEY_LEVELS.map((level) => {
            const isSelected = selectedSemester === level.semester;
            const isCurrent = level.status === "current";

            return (
              <button
                key={level.semester}
                type="button"
                onClick={() => handleSelectSemester(level.semester)}
                aria-current={isSelected ? "step" : undefined}
                className={cn(
                  "flex items-center gap-2 px-2.5 py-2 border font-mono text-xs text-left transition-all duration-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
                  isSelected
                    ? isCurrent
                      ? "bg-[var(--color-achievement)]/15 border-[var(--color-achievement)] text-[var(--color-text)] shadow-[2px_2px_0px_0px_var(--color-achievement)]"
                      : "bg-[var(--color-primary)]/15 border-[var(--color-primary)] text-[var(--color-text)] shadow-[2px_2px_0px_0px_var(--color-primary)]"
                    : "bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-primary)]/50 hover:text-[var(--color-text)]"
                )}
              >
                {/* Checkpoint Node Indicator */}
                <span
                  className={cn(
                    "w-5 h-5 flex items-center justify-center shrink-0 border text-[10px] font-bold font-mono",
                    isCurrent
                      ? "border-[var(--color-achievement)] text-[var(--color-achievement)] bg-[var(--color-achievement)]/10"
                      : "border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/10"
                  )}
                >
                  {isCurrent ? <Flag className="w-3 h-3" /> : `0${level.semester}`}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold truncate text-[11px]">
                      SEM 0{level.semester}
                    </span>
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 bg-[var(--color-achievement)] rounded-full animate-pulse shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--color-muted)] truncate block">
                    {level.semester === 1 && "Exploration"}
                    {level.semester === 2 && "Responsibility"}
                    {level.semester === 3 && "Education"}
                    {level.semester === 4 && "Competition"}
                    {level.semester === 5 && "Current Build"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* CHRONOLOGICAL PROGRESSION TRACK */}
      <ol
        className="relative space-y-12 sm:space-y-16 lg:space-y-20 list-none p-0 m-0"
        aria-label="Semester Timeline Progress"
      >
        {/* Mobile vertical line connector */}
        <div
          className="absolute left-4 sm:left-6 top-4 bottom-4 w-0.5 border-l-2 border-dashed border-[var(--color-border)] lg:hidden"
          aria-hidden="true"
        />

        {JOURNEY_LEVELS.map((level, idx) => {
          const isSelected = selectedSemester === level.semester;
          const isCurrent = level.status === "current";
          const isLevel4 = level.semester === 4;
          const isOdd = idx % 2 === 0; // 0, 2, 4 -> Sem 1, 3, 5 (Left on desktop)

          return (
            <li
              key={level.semester}
              id={`semester-step-${level.semester}`}
              className={cn(
                "relative group",
                // Mobile layout: indented from left rail
                "pl-12 sm:pl-16 lg:pl-0",
                // Desktop zig-zag layout: alternating left / right
                "lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start"
              )}
            >
              {/* Checkpoint Badge on Mobile Line */}
              <div
                className={cn(
                  "lg:hidden absolute left-1.5 sm:left-3.5 top-5 -translate-x-1/2 w-8 h-8 border-2 flex items-center justify-center font-mono font-bold text-xs z-10 select-none",
                  isCurrent
                    ? "bg-[var(--color-background)] border-[var(--color-achievement)] text-[var(--color-achievement)] shadow-[0_0_10px_var(--color-achievement)]"
                    : isSelected
                    ? "bg-[var(--color-primary)] text-[#0B1020] border-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]"
                    : "bg-[var(--color-surface)] text-[var(--color-muted)] border-[var(--color-border)]"
                )}
                aria-hidden="true"
              >
                {isCurrent ? <Flag className="w-3.5 h-3.5" /> : `0${level.semester}`}
              </div>

              {/* Desktop Zig-Zag Station Wrapper */}
              <div
                className={cn(
                  "w-full",
                  // Placement across 12 cols
                  isOdd
                    ? "lg:col-span-8 lg:col-start-1" // Sem 1, 3, 5: Left side
                    : "lg:col-span-8 lg:col-start-5" // Sem 2, 4: Right side
                )}
              >
                {/* Milestone Station Container */}
                <div
                  className={cn(
                    "relative border-2 transition-all duration-150 p-4 sm:p-6",
                    isSelected
                      ? isCurrent
                        ? "bg-[var(--color-surface)] border-[var(--color-achievement)] shadow-[6px_6px_0px_0px_rgba(255,209,102,0.25)]"
                        : "bg-[var(--color-surface)] border-[var(--color-primary)] shadow-[6px_6px_0px_0px_rgba(93,228,199,0.25)]"
                      : "bg-[var(--color-surface)]/90 border-[var(--color-border)] hover:border-[var(--color-border)]/90 hover:bg-[var(--color-surface)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
                  )}
                >
                  {/* Subtle pixel corner notches */}
                  <div className="absolute -top-[2px] -left-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
                  <div className="absolute -top-[2px] -right-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
                  <div className="absolute -bottom-[2px] -left-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
                  <div className="absolute -bottom-[2px] -right-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />

                  {/* Level Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-2.5">
                      {/* Desktop Checkpoint Pill */}
                      <span
                        className={cn(
                          "hidden lg:inline-flex items-center justify-center w-7 h-7 border font-mono text-xs font-bold",
                          isCurrent
                            ? "bg-[var(--color-achievement)]/20 border-[var(--color-achievement)] text-[var(--color-achievement)]"
                            : "bg-[var(--color-primary)]/20 border-[var(--color-primary)] text-[var(--color-primary)]"
                        )}
                      >
                        {isCurrent ? <Flag className="w-3.5 h-3.5" /> : `0${level.semester}`}
                      </span>

                      <div>
                        <span className="font-mono text-xs font-black text-[var(--color-primary)] tracking-wider">
                          LEVEL 0{level.semester}
                        </span>
                        <span className="text-[var(--color-muted)] font-mono text-xs mx-1.5">
                          {"//"}
                        </span>
                        <span className="font-mono text-xs text-[var(--color-muted)] font-semibold uppercase">
                          Semester {level.semester}
                        </span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center gap-2">
                      {isCurrent ? (
                        <PixelBadge variant="achievement" size="sm">
                          <span className="w-1.5 h-1.5 bg-[var(--color-achievement)] animate-pulse rounded-full" />
                          CURRENT LEVEL // IN PROGRESS
                        </PixelBadge>
                      ) : (
                        <PixelBadge variant="primary" size="sm">
                          <Check className="w-3 h-3 inline mr-1" />
                          COMPLETED
                        </PixelBadge>
                      )}

                      {isLevel4 && (
                        <PixelBadge variant="achievement" size="sm" className="hidden sm:inline-flex">
                          <Award className="w-3 h-3 inline mr-1" />
                          KEY COMPETITION ARC
                        </PixelBadge>
                      )}
                    </div>
                  </div>

                  {/* Station Body: Landmark + Level Narrative */}
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    {/* Landmark Artwork Frame */}
                    <div className="sm:col-span-5 flex justify-center order-first">
                      <div className="p-3 bg-[var(--color-background)]/80 border border-[var(--color-border)] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)] w-full flex items-center justify-center min-h-[140px] sm:min-h-[160px]">
                        <JourneyLandmark semester={level.semester} />
                      </div>
                    </div>

                    {/* Level Meta and Narrative */}
                    <div className="sm:col-span-7 space-y-2">
                      <h3 className="font-mono text-lg sm:text-xl font-bold text-[var(--color-text)] tracking-tight">
                        {level.title}
                      </h3>
                      {level.subtitle && (
                        <p className="font-mono text-xs text-[var(--color-blue)]">
                          {level.subtitle}
                        </p>
                      )}
                      {level.summary && (
                        <p className="text-xs sm:text-sm text-[var(--color-muted)] font-sans leading-relaxed pt-1">
                          {level.summary}
                        </p>
                      )}

                      {/* Milestone Count & Inspect Toggle Button */}
                      <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-[11px] text-[var(--color-muted)]">
                          [{level.activities.length} Documented Milestones]
                        </span>

                        <button
                          type="button"
                          onClick={() => handleSelectSemester(level.semester)}
                          aria-expanded={isSelected}
                          aria-controls={`semester-panel-${level.semester}`}
                          aria-current={isSelected ? "step" : undefined}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 border font-mono text-xs font-semibold uppercase transition-all duration-75 select-none",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
                            isSelected
                              ? "bg-[var(--color-surface-secondary)] border-[var(--color-primary)] text-[var(--color-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]"
                              : "bg-[var(--color-background)] hover:bg-[var(--color-surface-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]"
                          )}
                        >
                          {isSelected ? (
                            <>
                              <span>Active Dossier</span>
                              <ChevronUp className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                            </>
                          ) : (
                            <>
                              <span>Inspect Milestones ({level.activities.length})</span>
                              <ChevronDown className="w-3.5 h-3.5 text-[var(--color-muted)]" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ACTIVE SEMESTER DETAIL PANEL (Revealed when selected) */}
                  {isSelected && (
                    <div
                      id={`semester-panel-${level.semester}`}
                      role="region"
                      aria-label={`Detailed milestones for Semester ${level.semester}`}
                      className="mt-4 pt-4 border-t-2 border-[var(--color-border)] space-y-4 animate-in fade-in duration-200"
                    >
                      {/* Dossier Header Banner */}
                      <div className="p-3 bg-[var(--color-background)] border border-[var(--color-border)] flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-[var(--color-primary)]" />
                          <span className="font-mono text-xs font-bold text-[var(--color-text)] tracking-wider">
                            LEVEL 0{level.semester} EVIDENCE DOSSIER
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[var(--color-primary)] font-medium">
                          SHOWING ALL {level.activities.length} DOCUMENTED RECORDS
                        </span>
                      </div>

                      {/* Activities & Milestones List */}
                      <ul
                        className="space-y-2.5 list-none p-0 m-0"
                        aria-label={`Activities list for Semester ${level.semester}`}
                      >
                        {level.activities.map((act, actIdx) => (
                          <li
                            key={actIdx}
                            className={cn(
                              "p-3 border text-xs font-sans transition-colors relative",
                              act.highlight
                                ? isCurrent
                                  ? "bg-[var(--color-surface-secondary)] border-l-4 border-l-[var(--color-achievement)] border-t-[var(--color-border)] border-r-[var(--color-border)] border-b-[var(--color-border)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                                  : "bg-[var(--color-surface-secondary)] border-l-4 border-l-[var(--color-primary)] border-t-[var(--color-border)] border-r-[var(--color-border)] border-b-[var(--color-border)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                                : "bg-[var(--color-background)] border-[var(--color-border)]"
                            )}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div className="flex items-start gap-2">
                                {act.highlight && (
                                  <Star
                                    className={cn(
                                      "w-3.5 h-3.5 shrink-0 mt-0.5",
                                      isCurrent
                                        ? "text-[var(--color-achievement)] fill-[var(--color-achievement)]/20"
                                        : "text-[var(--color-primary)] fill-[var(--color-primary)]/20"
                                    )}
                                    aria-label="Highlighted milestone"
                                  />
                                )}
                                <span
                                  className={cn(
                                    "font-mono font-medium leading-snug",
                                    act.highlight
                                      ? "text-[var(--color-text)] font-bold text-sm"
                                      : "text-[var(--color-text)]"
                                  )}
                                >
                                  {act.title}
                                </span>
                              </div>

                              <PixelBadge
                                variant={CATEGORY_VARIANT_MAP[act.category] || "secondary"}
                                size="sm"
                                className="shrink-0 self-start sm:self-auto"
                              >
                                {act.category}
                              </PixelBadge>
                            </div>

                            {act.description && (
                              <p className="mt-1.5 text-[11px] sm:text-xs text-[var(--color-muted)] font-sans leading-relaxed pl-0 sm:pl-5">
                                {act.description}
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>

                      {/* Dossier Bottom Controls: Step Through Semesters */}
                      <div className="pt-3 border-t border-[var(--color-border)]/60 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          {level.semester > 1 ? (
                            <button
                              type="button"
                              onClick={() => handleSelectSemester(level.semester - 1)}
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] py-1 px-2"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                              <span>Previous: Semester {level.semester - 1}</span>
                            </button>
                          ) : (
                            <span className="font-mono text-[11px] text-[var(--color-muted)]">
                              [First University Semester]
                            </span>
                          )}
                        </div>

                        <div>
                          {level.semester < 5 ? (
                            <button
                              type="button"
                              onClick={() => handleSelectSemester(level.semester + 1)}
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-primary)] hover:brightness-125 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] py-1 px-2 font-semibold"
                            >
                              <span>Next: Semester {level.semester + 1}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--color-achievement)] font-bold">
                              <Rocket className="w-3.5 h-3.5" />
                              CURRENT HORIZON (SEM 5)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Desktop Connecting Trail Indicator between stations */}
              {idx < JOURNEY_LEVELS.length - 1 && (
                <div
                  className="hidden lg:flex col-span-12 items-center justify-center my-4 py-2 select-none pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="flex items-center gap-3 text-[var(--color-border)] font-mono text-xs">
                    <span className="w-16 border-t-2 border-dashed border-[var(--color-border)]" />
                    <span className="px-2 py-0.5 border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] text-[10px] uppercase font-bold tracking-widest">
                      TRANSITION TO SEMESTER 0{level.semester + 1}
                    </span>
                    <ChevronDown className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="w-16 border-t-2 border-dashed border-[var(--color-border)]" />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
