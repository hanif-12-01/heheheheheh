"use client";

import React from "react";
import Image from "next/image";
import { SKILLS_INVENTORY } from "@/data/skills";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { techAssets, journeyAssets, achievementAssets } from "@/data/worldAssets";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { ShieldCheck } from "lucide-react";

/**
 * Returns restrained category production asset for visual anchoring.
 * Strict credibility rule: Illustrations communicate grouping, NEVER skill level.
 */
function getSkillCategoryAsset(categoryId: string) {
  switch (categoryId) {
    case "programming":
      return techAssets.codeEditor;
    case "fundamentals":
      return techAssets.server;
    case "software-dev":
      return techAssets.aiChip;
    case "tools":
      return techAssets.database;
    case "communication":
      return journeyAssets.microphone;
    case "leadership":
      return achievementAssets.laurel;
    default:
      return techAssets.codeEditor;
  }
}

/**
 * Verified evidence annotation connecting skill category to actual documented work.
 * Phase 3F.1 Clean: Unsubstantiated buzzwords (symposiums, containerization, etc.) removed.
 */
function getCategoryEvidence(categoryId: string): string {
  switch (categoryId) {
    case "programming":
      return "Applied in academic coursework, algorithmic exercises, and software prototypes.";
    case "fundamentals":
      return "Applied across computer science coursework and algorithmic problem solving.";
    case "software-dev":
      return "Applied across web application development, requirement analysis, and project prototyping.";
    case "tools":
      return "Used across public Git repositories, database setups, and development workflows.";
    case "communication":
      return "Applied in academic seminar presentations, competition pitching, and peer mentorship.";
    case "leadership":
      return "Applied in student organization committees and collaborative project teams.";
    default:
      return "Demonstrated across academic and engineering initiatives.";
  }
}

export function SkillsInventory() {
  const { mode } = usePortfolioMode();
  const totalSkillsCount = SKILLS_INVENTORY.reduce(
    (total, category) => total + category.items.length,
    0
  );

  const isRecruiter = mode === "recruiter";

  return (
    <section
      id="skills"
      aria-label={isRecruiter ? "Technical Skills and Competencies" : "Skill Inventory"}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)] space-y-10"
    >
      {/* Section Header with Skill Counter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[var(--color-border)]/60">
        <PixelSectionTitle
          number="09"
          title="SKILL INVENTORY // TECHNICAL LOADOUT"
          subtitle="Categorized technical competencies, developer tooling, and interpersonal capabilities without inflated proficiency meters."
          badge="CAPABILITY MATRIX"
          recruiterTitle="TECHNICAL SKILLS & COMPETENCIES"
          recruiterSubtitle="Categorized technical competencies, developer tooling, and interpersonal capabilities without inflated proficiency meters."
          recruiterBadge="CAPABILITY MATRIX"
          className="mb-0"
        />

        <div className="flex items-center gap-2 self-start md:self-end font-mono text-xs text-[var(--color-muted)]">
          <span className="px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]">
            <span className="text-[var(--color-primary)] font-bold">{totalSkillsCount}</span>{" "}
            CAPABILITIES CATALOGUED
          </span>
        </div>
      </div>

      {/* Honest Loadout Manifesto / Rating Policy Banner (Phase 3F.1 Conservative Wording) */}
      <div className="p-4 sm:p-4.5 bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
        <div className="flex items-start sm:items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
          <div className="space-y-0.5">
            <span className="font-mono text-xs font-bold text-[var(--color-text)] uppercase tracking-wider block">
              {isRecruiter
                ? "EVIDENCE-BASED SKILLS POLICY // NO ARBITRARY PERCENTAGES"
                : "LOADOUT STANDARD // NO ARBITRARY PERCENTAGES"}
            </span>
            <p className="font-mono text-[11px] text-[var(--color-muted)]">
              No fake 0–100% bars, star ratings, or &quot;expert/master&quot; labels. Tools and capabilities documented across coursework, projects, and activities.
            </p>
          </div>
        </div>

        <span className="self-start sm:self-auto px-2 py-0.5 bg-[var(--color-background)] border border-[var(--color-primary)]/50 font-mono text-[10px] text-[var(--color-primary)] uppercase font-semibold shrink-0">
          EVIDENCE-BASED
        </span>
      </div>

      {/* Categorized Skills Grid (3 Columns Desktop, 2 Columns Tablet, 1 Column Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS_INVENTORY.map((cat) => {
          const domainAsset = getSkillCategoryAsset(cat.id);
          const evidenceNote = getCategoryEvidence(cat.id);

          return (
            <article
              key={cat.id}
              className="flex flex-col justify-between border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] transition-all duration-100 overflow-hidden"
              aria-labelledby={`skill-group-${cat.id}`}
            >
              {/* Category Header Bar */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between gap-2 select-none">
                  <div className="flex items-center gap-2">
                    {domainAsset && (
                      <div className="w-5 h-5 shrink-0 relative flex items-center justify-center">
                        <Image
                          src={domainAsset.src}
                          alt=""
                          width={16}
                          height={16}
                          className="object-contain"
                          style={{ imageRendering: "pixelated" }}
                          aria-hidden="true"
                          unoptimized
                        />
                      </div>
                    )}
                    <h3
                      id={`skill-group-${cat.id}`}
                      className="font-mono text-sm font-bold text-[var(--color-text)] tracking-wide"
                    >
                      {cat.name}
                    </h3>
                  </div>

                  <PixelBadge variant="primary" size="sm">
                    {cat.badge}
                  </PixelBadge>
                </div>

                <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                  {cat.description}
                </p>

                {/* Tactile Inventory Slots (Clean Chips) */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${cat.name} capabilities`}>
                    {cat.items.map((item) => (
                      <div
                        key={item}
                        role="listitem"
                        className="px-2.5 py-1 bg-[var(--color-background)] border border-[var(--color-border)] font-mono text-[11px] text-[var(--color-text)] flex items-center gap-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)] hover:border-[var(--color-primary)] transition-colors select-none"
                      >
                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Application / Evidence Annotation */}
              <div className="px-4 py-2.5 bg-[var(--color-surface-secondary)] border-t border-[var(--color-border)] select-none">
                <p className="font-mono text-[10px] text-[var(--color-muted)] leading-tight flex items-start gap-1.5">
                  <span className="text-[var(--color-primary)] font-bold shrink-0">&gt;</span>
                  <span>{evidenceNote}</span>
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
