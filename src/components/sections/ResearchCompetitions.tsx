"use client";

import { AtelierResearch } from "@/components/atelier/AtelierSections";

import { useLocalize } from "@/i18n/useTranslations";

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
      return <Presentation className="w-3.5 h-3.5 text-[var(--color-purple)]" aria-hidden="true" />;
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
  const localize = useLocalize();
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

  if (mode === "recruiter") return <AtelierResearch />;

  if (mode === "pixel") {
    const filters: { id: FilterTrack; label: string; count: number }[] = [
      { id: "all", label: "All notes", count: RESEARCH_COMPETITIONS_DATA.length },
      { id: "competitions", label: "Competitions", count: competitionCount },
      { id: "research", label: "Research & PKM", count: researchCount },
      { id: "presentations", label: "Presentations", count: presentationCount },
    ];

    return localize((
      <section id="research" aria-labelledby="research-title" className="world-chapter fieldnotes-chapter">
        <div className="world-container chapter-content">
          <header className="chapter-heading">
            <p className="chapter-eyebrow">08 / FIELD NOTES</p>
            <h2 id="research-title">Ideas tested beyond the workshop.</h2>
            <p>Documented work across faculty research, PKM proposals, competitions, and academic presentations.</p>
          </header>
          <div className="fieldnotes-layout">
            <div>
              <div role="group" aria-label="Filter research and competition records by track" className="fieldnotes-filters">
                {filters.map((filter) => (
                  <button key={filter.id} type="button" aria-pressed={activeFilter === filter.id} aria-controls="research-records" onClick={() => setActiveFilter(filter.id)}>{filter.label} <span>({filter.count})</span></button>
                ))}
              </div>
              <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{`${filteredData.length} ${filteredData.length === 1 ? "record" : "records"} displayed for ${activeFilter === "all" ? "all categories" : activeFilter} filter.`}</p>
              <div id="research-records" className="fieldnotes-records">
                {filteredData.map((item) => {
                  const evidence = getRecordEvidenceBadge(item);
                  return (
                    <article key={item.id} aria-labelledby={`entry-title-${item.id}`} className="fieldnote">
                      <div className="fieldnote__meta"><span>{item.year} / {item.category}</span><span className={cn("fieldnote__evidence", evidence.type === "RESULT" && "fieldnote__evidence--result")}>{evidence.type}: {evidence.label.replace(/^FORMAT: /, "")}</span></div>
                      <h3 id={`entry-title-${item.id}`}>{item.title}</h3>
                      <p className="fieldnote__role">{item.role} <span aria-hidden="true">·</span> <span>{item.event}</span></p>
                      {item.highlight && <p>{item.highlight}</p>}
                    </article>
                  );
                })}
              </div>
            </div>
            <aside className="fieldnotes-aside" aria-label="Academic dossier and research participation overview">
              <div className="fieldnotes-aside__props" aria-hidden="true">
                <span><Image src={journeyAssets.researchDocument.src} alt="" fill sizes="150px" unoptimized className="object-contain" /></span>
                <span><Image src={journeyAssets.researchFlask.src} alt="" fill sizes="85px" unoptimized className="object-contain" /></span>
              </div>
              <p className="chapter-eyebrow">THE RESEARCH NOTEBOOK</p>
              <h3>Contribution, in context.</h3>
              <dl className="fieldnotes-totals">
                <div><dt>Competitions & hackathons</dt><dd>{competitionCount}</dd></div>
                <div><dt>Faculty research & PKM</dt><dd>{researchCount}</dd></div>
                <div><dt>Academic presentations</dt><dd>{presentationCount}</dd></div>
              </dl>
              <p>Roles reflect documented student contributor, developer, presenter, and participant status. Competition results are distinguished from participation and presentation.</p>
            </aside>
          </div>
        </div>
      </section>
    ));
  }
  return null;
}
