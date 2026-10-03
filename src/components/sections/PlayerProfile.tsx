"use client";

import React from "react";
import Image from "next/image";
import { PROFILE_DATA } from "@/data/profile";
import { uiAssets } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelWindow } from "@/components/pixel/PixelWindow";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Shield, Award, Terminal, Mic, GraduationCap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlayerProfile() {
  const { mode } = usePortfolioMode();
  const prefersReducedMotion = useReducedMotion();

  const statIcons: Record<string, React.ReactNode> = {
    competitions: <Award className="w-4 h-4 text-[var(--color-achievement)]" />,
    leadership: <Shield className="w-4 h-4 text-[var(--color-blue)]" />,
    research: <GraduationCap className="w-4 h-4 text-[var(--color-purple)]" />,
    software: <Terminal className="w-4 h-4 text-[var(--color-primary)]" />,
    "public-speaking": <Mic className="w-4 h-4 text-[#F43F5E]" />,
  };

  const statColors: Record<string, string> = {
    competitions: "var(--color-achievement)",
    leadership: "var(--color-blue)",
    research: "var(--color-purple)",
    software: "var(--color-primary)",
    "public-speaking": "#F43F5E",
  };

  // Academic progress calculations derived from PROFILE_DATA.currentLevel (Source of Truth)
  const totalSemesters = 8;
  const currentSemester = PROFILE_DATA.currentLevel; // Semester 5 is Current / In Progress
  const completedSemesters = currentSemester - 1; // 4 Semesters Completed (Semesters 1-4)
  const upcomingSemesters = totalSemesters - currentSemester; // 3 Semesters Upcoming (Semesters 6-8)

  return (
    <section
      id="profile"
      aria-label="Player Profile"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)] select-none"
    >
      <PixelSectionTitle
        number="02"
        title="PLAYER PROFILE & ATTRIBUTES"
        subtitle="Qualitative status indicators and academic milestones — verified by active contributions."
        badge="CHARACTER SHEET"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Character Sheet / Identity Panel (~38%) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 w-full">
          <PixelWindow
            title="CHARACTER_SHEET.TXT"
            statusBadge="● ACTIVE"
            className="w-full"
          >
            <div className="space-y-4 font-mono text-xs">
              {/* Identity Header Box */}
              <div className="p-3.5 bg-[var(--color-background)] border-2 border-[var(--color-border)] space-y-1.5 relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] text-[var(--color-muted)] uppercase tracking-wider">
                  <span>IDENTITY // ID#01</span>
                  <span className="flex items-center gap-1 text-[var(--color-primary)]">
                    <span className="w-1.5 h-1.5 bg-[var(--color-primary)] inline-block animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="text-base sm:text-lg font-black font-mono text-[var(--color-text)] tracking-tight">
                  {PROFILE_DATA.name}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary)]">
                  <span>HANDLE:</span>
                  <span className="px-1.5 py-0.5 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/40 text-[var(--color-primary)]">
                    {PROFILE_DATA.handle}
                  </span>
                </div>
              </div>

              {/* Academic Parameter Matrix (2x2) */}
              <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                {/* Institution */}
                <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] flex flex-col justify-between">
                  <div className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider">INSTITUTION</div>
                  <div className="font-bold text-[var(--color-text)] mt-1 line-clamp-2" title={PROFILE_DATA.university}>
                    Telkom Univ Purwokerto
                  </div>
                </div>

                {/* Degree */}
                <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] flex flex-col justify-between">
                  <div className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider">DEGREE</div>
                  <div className="font-bold text-[var(--color-text)] mt-1">
                    {PROFILE_DATA.degree}
                  </div>
                </div>

                {/* Cumulative GPA */}
                <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between text-[9px] text-[var(--color-muted)] uppercase tracking-wider">
                    <span>CUMULATIVE GPA</span>
                    <Image
                      src={uiAssets.star.src}
                      alt=""
                      width={12}
                      height={12}
                      className="w-3 h-3"
                      style={{ imageRendering: "pixelated" }}
                      aria-hidden="true"
                      unoptimized
                    />
                  </div>
                  <div className="font-black text-sm text-[var(--color-achievement)] mt-1">
                    {PROFILE_DATA.gpa}
                  </div>
                </div>

                {/* Expected Graduation */}
                <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] flex flex-col justify-between">
                  <div className="text-[9px] text-[var(--color-muted)] uppercase tracking-wider">EXP. GRADUATION</div>
                  <div className="font-bold text-[var(--color-text)] mt-1">
                    Class of {PROFILE_DATA.expectedGraduation}
                  </div>
                </div>
              </div>

              {/* Current Quest & Progression Bar */}
              <div className="p-3 bg-[var(--color-background)] border border-[var(--color-border)] space-y-2.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[var(--color-muted)] uppercase tracking-wider flex items-center gap-1.5">
                    <Image
                      src={uiAssets.checkpoint.src}
                      alt=""
                      width={12}
                      height={12}
                      className="w-3 h-3"
                      style={{ imageRendering: "pixelated" }}
                      aria-hidden="true"
                      unoptimized
                    />
                    CURRENT QUEST
                  </span>
                  <span className="text-[var(--color-primary)] font-bold">
                    SEMESTER {currentSemester} {"//"} IN PROGRESS
                  </span>
                </div>

                {/* Stepped Pixel Progress Blocks: 4 Completed, 1 Current (In Progress), 3 Upcoming */}
                <div className="space-y-1.5">
                  <div
                    className="grid grid-cols-8 gap-1.5 h-3.5 bg-[var(--color-surface-secondary)] p-0.5 border border-[var(--color-border)]"
                    role="progressbar"
                    aria-valuenow={currentSemester}
                    aria-valuemin={1}
                    aria-valuemax={totalSemesters}
                    aria-label={`Academic progress: Semesters 1 through ${completedSemesters} completed, Semester ${currentSemester} currently in progress, Semesters ${currentSemester + 1} through ${totalSemesters} upcoming.`}
                  >
                    {Array.from({ length: totalSemesters }).map((_, i) => {
                      const semNum = i + 1;
                      const isCompleted = semNum < currentSemester;
                      const isCurrent = semNum === currentSemester;

                      return (
                        <div
                          key={semNum}
                          className={cn(
                            "h-full flex items-center justify-center transition-colors select-none",
                            isCompleted && "bg-[var(--color-primary)]",
                            isCurrent && cn(
                              "bg-[var(--color-primary)] border border-[var(--color-achievement)] ring-1 ring-[var(--color-primary)] shadow-[0_0_6px_var(--color-primary)]",
                              !prefersReducedMotion && "animate-pulse"
                            ),
                            !isCompleted && !isCurrent && "bg-[var(--color-background)]/80 border border-[var(--color-border)]/60"
                          )}
                          title={`Semester ${semNum} — ${
                            isCompleted
                              ? "Completed"
                              : isCurrent
                              ? "Current (In Progress)"
                              : "Upcoming"
                          }`}
                        >
                          {isCurrent && (
                            <span
                              className="w-1.5 h-1.5 bg-[#0B1020] rotate-45 inline-block"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center text-[9px] text-[var(--color-muted)] font-mono">
                    <span>SEM 01</span>
                    <span className="text-[var(--color-primary)] font-bold tracking-wider uppercase">
                      ACADEMIC PROGRESS: SEMESTER {currentSemester} / {totalSemesters}
                    </span>
                    <span>SEM 08</span>
                  </div>

                  <div className="text-[9px] text-[var(--color-muted)] text-center pt-1 border-t border-[var(--color-border)]/50 tracking-wide font-mono">
                    {completedSemesters} COMPLETED · SEMESTER {currentSemester} CURRENT · {upcomingSemesters} UPCOMING
                  </div>
                </div>
              </div>

              {/* System Note Footnote */}
              <div className="p-2.5 bg-[var(--color-surface-secondary)]/50 border border-dashed border-[var(--color-border)] text-[10px] text-[var(--color-muted)] flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 mt-0.5" />
                <span>
                  Academic standing verified at Level 05 (Semester 5 In Progress). Specializing in intelligent software, spatial analytics, and competition-driven innovation.
                </span>
              </div>
            </div>
          </PixelWindow>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Evidence-based Contribution Attribute Cards (~62%) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {PROFILE_DATA.stats.map((stat) => {
            const isCompetition = stat.id === "competitions";
            const isSoftware = stat.id === "software";

            return (
              <PixelCard
                key={stat.id}
                className={cn(
                  "flex flex-col justify-between h-full p-4 space-y-3",
                  isCompetition && "sm:col-span-2 border-2 border-[var(--color-achievement)] shadow-[4px_4px_0px_0px_rgba(255,209,102,0.25)]",
                  isSoftware && !isCompetition && "border-2 border-[var(--color-primary)]/80"
                )}
                variant={isCompetition ? "achievement" : "default"}
              >
                <div className="space-y-2.5">
                  {/* Card Header: Icon + Category Name + Qualitative Rank */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="p-1.5 border select-none shrink-0"
                        style={{
                          backgroundColor: `${statColors[stat.id]}15`,
                          borderColor: statColors[stat.id],
                        }}
                      >
                        {statIcons[stat.id]}
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-[var(--color-text)] uppercase">
                        {stat.name}
                      </span>
                    </div>

                    <PixelBadge
                      variant={
                        isCompetition
                          ? "achievement"
                          : stat.id === "software"
                          ? "primary"
                          : stat.id === "leadership"
                          ? "blue"
                          : "outline"
                      }
                      size="sm"
                    >
                      {stat.rank}
                    </PixelBadge>
                  </div>

                  {/* Concrete Verifiable Evidence Text */}
                  <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                    {stat.highlight}
                  </p>
                </div>

                {/* Evidence Area Tags */}
                <div className="pt-2.5 border-t border-[var(--color-border)]/60 flex flex-wrap gap-1.5">
                  {stat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </PixelCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

