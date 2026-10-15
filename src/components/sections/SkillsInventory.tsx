"use client";

import { AtelierSkills } from "@/components/atelier/AtelierSections";

import { useLocalize } from "@/i18n/useTranslations";

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
  const localize = useLocalize();
  const { mode } = usePortfolioMode();
  const totalSkillsCount = SKILLS_INVENTORY.reduce(
    (total, category) => total + category.items.length,
    0
  );

  const isRecruiter = mode === "recruiter";

  if (mode === "recruiter") return <AtelierSkills />;

  if (!isRecruiter) {
    return localize((
      <section id="skills" aria-labelledby="skills-title" className="world-chapter toolshelf-chapter">
        <div className="world-container chapter-content">
          <header className="chapter-heading">
            <p className="chapter-eyebrow">09 / THE TOOLSHELF</p>
            <h2 id="skills-title">Tools I bring to the build.</h2>
            <p>{totalSkillsCount} documented capabilities across coursework, software prototypes, and collaborative activities.</p>
          </header>
          <div className="toolshelf">
            {SKILLS_INVENTORY.map((category) => {
              const asset = getSkillCategoryAsset(category.id);
              return (
                <article key={category.id} aria-labelledby={`skill-group-${category.id}`} className="toolshelf-group">
                  <div className="toolshelf-group__heading">
                    <span className="toolshelf-group__art" aria-hidden="true"><Image src={asset.src} alt="" fill sizes="88px" unoptimized className="object-contain" /></span>
                    <div><p className="chapter-eyebrow">{category.badge}</p><h3 id={`skill-group-${category.id}`}>{category.name}</h3></div>
                  </div>
                  <p>{category.description}</p>
                  <ul className="toolshelf-group__skills" aria-label={`${category.name} capabilities`}>
                    {category.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <p className="toolshelf-group__evidence">{getCategoryEvidence(category.id)}</p>
                </article>
              );
            })}
          </div>
          <p className="toolshelf-note">Capabilities are documented through work and activities; no proficiency percentages or inflated expertise labels.</p>
        </div>
      </section>
    ));
  }
  return null;
}
