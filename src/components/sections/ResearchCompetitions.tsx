"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RESEARCH_COMPETITIONS_DATA, ResearchCompetitionItem } from "@/data/researchCompetitions";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { journeyAssets } from "@/data/worldAssets";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import {
  FlaskConical,
  Award,
  Presentation,
  Code,
  Globe2,
  Terminal,
  Trophy,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FilterTrack = "all" | "competitions" | "research" | "presentations";

type EvidenceLabelType = "RESULT" | "STATUS" | "FORMAT" | "CONTRIBUTION";

interface EvidenceBadge {
  type: EvidenceLabelType;
  label: string;
  variant: "achievement" | "primary" | "blue" | "outline";
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
}

/**
 * Maps category to clean icon for quick scannability.
 */
function getCategoryIcon(category: string) {
  switch (category) {
    case "Research":
    case "PKM":
      return <FlaskConical className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />;
    case "Public Speaking":
      return <Presentation className="w-3.5 h-3.5 text-[#F43F5E]" aria-hidden="true" />;
    case "Smart City":
      return <Globe2 className="w-3.5 h-3.5 text-[var(--color-blue)]" aria-hidden="true" />;
    case "Hackathon":
    case "GEMASTIK":
      return <Code className="w-3.5 h-3.5 text-[var(--color-purple)]" aria-hidden="true" />;
    default:
      return <Award className="w-3.5 h-3.5 text-[var(--color-achievement)]" aria-hidden="true" />;
  }
}

/**
 * Returns exact verified evidence badge.
 * Strict Phase 3F.1 semantic audit:
 * Distinguishes true competition outcomes (RESULT) from context (STATUS / FORMAT / CONTRIBUTION).
 */
function getRecordEvidenceBadge(item: ResearchCompetitionItem): EvidenceBadge {
  switch (item.id) {
    case "rc-1":
      // UNITY UNY: Verified 3rd place podium competition outcome
      return {
        type: "RESULT",
        label: "3RD PLACE",
        variant: "achievement",
        icon: Trophy,
      };
    case "rc-2":
      // PLN ICE: Verified national startup competition finalist outcome
      return {
        type: "RESULT",
        label: "TOP 10 FINALIST",
        variant: "primary",
        icon: Award,
      };
    case "rc-3":
      // GenBI: Verified national business plan competition finalist outcome
      return {
        type: "RESULT",
        label: "TOP 5 FINALIST",
        variant: "primary",
        icon: Award,
      };
    case "rc-4":
      // PKM Data Science: Academic presentation contribution (not a competitive result)
      return {
        type: "CONTRIBUTION",
        label: "ACADEMIC PRESENTATION",
        variant: "blue",
        icon: Presentation,
      };
    case "rc-5":
      // Faculty Research: Student research contribution in benchmarking
      return {
        type: "CONTRIBUTION",
        label: "RESEARCH CONTRIBUTION",
        variant: "outline",
        icon: FlaskConical,
      };
    case "rc-6":
      // Faculty PKM: 2 faculty PKM initiatives (participation context)
      return {
        type: "STATUS",
        label: "2 PKM INITIATIVES",
        variant: "outline",
        icon: CheckCircle2,
      };
    case "rc-7":
      // GEMASTIK: Dual-track competition participation context (not an achievement result)
      return {
        type: "STATUS",
        label: "DUAL-TRACK PARTICIPATION",
        variant: "outline",
        icon: CheckCircle2,
      };
    case "rc-8":
      // Hackathon x Digidaya: Rapid hackathon sprint format (event format, not an award result)
      return {
        type: "FORMAT",
        label: "FORMAT: 48-HOUR SPRINT",
        variant: "outline",
        icon: Code,
      };
    default:
      return {
        type: "STATUS",
        label: item.status.toUpperCase(),
        variant: "outline",
        icon: CheckCircle2,
      };
  }
}

export function ResearchCompetitions() {
  const [activeFilter, setActiveFilter] = useState<FilterTrack>("all");
  const { mode } = usePortfolioMode();

  // Filter records based on selected track
  const filteredData = RESEARCH_COMPETITIONS_DATA.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "competitions") {
      return (
        item.category === "Smart City" ||
        item.category === "Business Competition" ||
        item.category === "Hackathon" ||
        item.category === "GEMASTIK"
      );
    }
    if (activeFilter === "research") {
      return item.category === "Research" || item.category === "PKM";
    }
    if (activeFilter === "presentations") {
      return item.category === "Public Speaking";
    }
    return true;
  });

  const competitionCount = RESEARCH_COMPETITIONS_DATA.filter(
    (i) =>
      i.category === "Smart City" ||
      i.category === "Business Competition" ||
      i.category === "Hackathon" ||
      i.category === "GEMASTIK"
  ).length;

  const researchCount = RESEARCH_COMPETITIONS_DATA.filter(
    (i) => i.category === "Research" || i.category === "PKM"
  ).length;

  const presentationCount = RESEARCH_COMPETITIONS_DATA.filter(
    (i) => i.category === "Public Speaking"
  ).length;

  return (
    <section
      id="research"
      aria-label="Research and Competitions"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)] space-y-10"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[var(--color-border)]/60">
        <PixelSectionTitle
          number="08"
          title="RESEARCH &amp; COMPETITIONS // FIELD LOG"
          subtitle="Documented participation across faculty research, PKM scientific proposals, national hackathons, and symposium presentations."
          badge="EVIDENCE LOG"
          recruiterTitle="RESEARCH, COMPETITIONS & ACTIVITIES"
          recruiterSubtitle="Documented participation across faculty research, PKM scientific proposals, national hackathons, and symposium presentations."
          recruiterBadge="VERIFIED ACTIVITIES"
          className="mb-0"
        />

        <div className="flex items-center gap-2 self-start md:self-end font-mono text-xs text-[var(--color-muted)]">
          <span className="px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]">
            <span className="text-[var(--color-primary)] font-bold">
              {RESEARCH_COMPETITIONS_DATA.length.toString().padStart(2, "0")}
            </span>{" "}
            ACTIVITIES DOCUMENTED
          </span>
        </div>
      </div>

      {/* Main Grid: Left Field Log (65%) + Right Academic Dossier (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Field Log Terminal */}
        <div className="lg:col-span-8 space-y-4">
          {/* Phase 3F.1 Accessible Filter Buttons (role="group" + aria-pressed) */}
          <div
            role="group"
            aria-label="Filter research and competition records by track"
            className="flex flex-wrap gap-2 select-none"
          >
            <button
              type="button"
              aria-pressed={activeFilter === "all"}
              onClick={() => setActiveFilter("all")}
              className={cn(
                "px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-75 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]",
                activeFilter === "all"
                  ? "bg-[var(--color-primary)] text-[#0B1020] border-[var(--color-primary)] font-bold shadow-[2px_2px_0px_0px_#0B1020]"
                  : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]"
              )}
            >
              ALL LOGS ({RESEARCH_COMPETITIONS_DATA.length.toString().padStart(2, "0")})
            </button>

            <button
              type="button"
              aria-pressed={activeFilter === "competitions"}
              onClick={() => setActiveFilter("competitions")}
              className={cn(
                "px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-75 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]",
                activeFilter === "competitions"
                  ? "bg-[var(--color-primary)] text-[#0B1020] border-[var(--color-primary)] font-bold shadow-[2px_2px_0px_0px_#0B1020]"
                  : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]"
              )}
            >
              COMPETITIONS ({competitionCount.toString().padStart(2, "0")})
            </button>

            <button
              type="button"
              aria-pressed={activeFilter === "research"}
              onClick={() => setActiveFilter("research")}
              className={cn(
                "px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-75 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]",
                activeFilter === "research"
                  ? "bg-[var(--color-primary)] text-[#0B1020] border-[var(--color-primary)] font-bold shadow-[2px_2px_0px_0px_#0B1020]"
                  : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]"
              )}
            >
              RESEARCH &amp; PKM ({researchCount.toString().padStart(2, "0")})
            </button>

            <button
              type="button"
              aria-pressed={activeFilter === "presentations"}
              onClick={() => setActiveFilter("presentations")}
              className={cn(
                "px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-75 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]",
                activeFilter === "presentations"
                  ? "bg-[var(--color-primary)] text-[#0B1020] border-[var(--color-primary)] font-bold shadow-[2px_2px_0px_0px_#0B1020]"
                  : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]"
              )}
            >
              PRESENTATIONS ({presentationCount.toString().padStart(2, "0")})
            </button>
          </div>

          {/* Terminal Field Log Card Container */}
          <div className="border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Window Title Bar */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-[var(--color-surface-secondary)] border-b-2 border-[var(--color-border)] select-none">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
                <span className="font-mono text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                  FIELD_LOG // ACTIVITY_ENTRIES
                </span>
              </div>
              <span className="font-mono text-[10px] text-[var(--color-muted)]">
                {filteredData.length} RECORD{filteredData.length === 1 ? "" : "S"} DISPLAYED
              </span>
            </div>

            {/* Concise status announcement for screen readers (WCAG 2.2 AA) */}
            <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {`${filteredData.length} ${filteredData.length === 1 ? "record" : "records"} displayed for ${activeFilter === "all" ? "all categories" : activeFilter} filter.`}
            </div>

            {/* Field Log List */}
            <div className="divide-y divide-[var(--color-border)]">
              {filteredData.map((item) => {
                const badge = getRecordEvidenceBadge(item);
                const BadgeIcon = badge.icon;

                return (
                  <article
                    key={item.id}
                    className="p-4 sm:p-5 hover:bg-[var(--color-surface-secondary)]/50 transition-colors space-y-2.5"
                    aria-labelledby={`entry-title-${item.id}`}
                  >
                    {/* Entry Top Meta Line: Year, Category, and Verified Outcome */}
                    <div className="flex flex-wrap items-center justify-between gap-2 select-none">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] font-mono text-[11px] font-bold text-[var(--color-primary)]">
                          {item.year}
                        </span>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] font-mono text-[10px] text-[var(--color-muted)] uppercase">
                          {getCategoryIcon(item.category)}
                          <span>{item.category}</span>
                        </div>
                      </div>

                      {/* Precise Verified Outcome / Context Badge */}
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)]",
                          badge.variant === "achievement" &&
                            "bg-[var(--color-achievement)] text-[#0B1020] border border-[var(--color-achievement)]",
                          badge.variant === "primary" &&
                            "bg-[var(--color-primary)]/15 text-[var(--color-primary)] border border-[var(--color-primary)]",
                          badge.variant === "blue" &&
                            "bg-[var(--color-blue)]/15 text-[var(--color-blue)] border border-[var(--color-blue)]",
                          badge.variant === "outline" &&
                            "bg-[var(--color-background)] text-[var(--color-muted)] border border-[var(--color-border)]"
                        )}
                      >
                        <BadgeIcon className="w-3 h-3 shrink-0" aria-hidden="true" />
                        <span>{badge.label}</span>
                      </span>
                    </div>

                    {/* Entry Title & Event */}
                    <div>
                      <h3
                        id={`entry-title-${item.id}`}
                        className="font-mono text-sm sm:text-base font-bold text-[var(--color-text)]"
                      >
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-mono mt-0.5">
                        <span className="text-[var(--color-primary)] font-semibold">
                          Role: {item.role}
                        </span>
                        <span className="text-[var(--color-border)]" aria-hidden="true">•</span>
                        <span className="text-[var(--color-muted)]">{item.event}</span>
                      </div>
                    </div>

                    {/* Factual Highlight / Description */}
                    {item.highlight && (
                      <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                        {item.highlight}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Academic Dossier & Integrity Standard Panel (35%) */}
        <aside
          className="lg:col-span-4 space-y-5"
          aria-label="Academic dossier and research participation overview"
        >
          {/* Dossier Card */}
          <div className="border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.6)] p-5 space-y-5">
            {/* Dossier Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)] select-none">
              <span className="font-mono text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
                <span>ACADEMIC DOSSIER</span>
              </span>
              <span className="px-1.5 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] font-mono text-[9px] text-[var(--color-muted)] uppercase">
                VERIFIED LOG
              </span>
            </div>

            {/* Restrained Domain Artwork — Production World Asset */}
            <div className="flex items-center justify-center py-2 select-none">
              <div className="p-3 bg-[var(--color-background)] border-2 border-[var(--color-border)] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)]">
                <Image
                  src={journeyAssets.researchDocument.src}
                  alt=""
                  width={96}
                  height={84}
                  className="object-contain"
                  style={{ imageRendering: "pixelated" }}
                  aria-hidden="true"
                  unoptimized
                />
              </div>
            </div>

            {/* Activity Summary Counters */}
            <div className="space-y-2 pt-1 font-mono">
              <div className="flex items-center justify-between p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] text-xs">
                <span className="text-[var(--color-muted)]">Competitions &amp; Hackathons:</span>
                <span className="font-bold text-[var(--color-primary)]">
                  {competitionCount.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] text-xs">
                <span className="text-[var(--color-muted)]">Faculty Research &amp; PKM:</span>
                <span className="font-bold text-[var(--color-primary)]">
                  {researchCount.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] text-xs">
                <span className="text-[var(--color-muted)]">Academic Presentations:</span>
                <span className="font-bold text-[var(--color-primary)]">
                  {presentationCount.toString().padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Academic Credibility Standard Note */}
            <div className="p-3 bg-[var(--color-background)]/80 border border-[var(--color-border)] space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider block">
                &gt; CREDIBILITY STANDARD
              </span>
              <p className="text-[11px] font-sans text-[var(--color-muted)] leading-relaxed">
                Roles conservatively reflect documented student contributor, developer, presenter, and participant status. Zero unverified journal publication, DOI, or inflated leadership claims.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
