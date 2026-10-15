"use client";

import { AtelierHonors } from "@/components/atelier/AtelierSections";

import { useLocalize } from "@/i18n/useTranslations";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ACHIEVEMENTS_DATA } from "@/data/achievements";
import { Achievement } from "@/types/achievement";
import { achievementAssets, journeyAssets, uiAssets } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { cn } from "@/lib/utils";
import { WorldScene } from "@/components/world/WorldScene";
import {
  Trophy,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

/**
 * World asset mapping for each achievement record.
 * Semantic assignment based on milestone tier and institutional context.
 */
function getAchievementAsset(achievementId: string) {
  switch (achievementId) {
    case "smart-city-uny-2026":
      return achievementAssets.trophy;
    case "pln-ice-2026":
      return achievementAssets.medal;
    case "genbi-2026":
      return achievementAssets.laurel;
    case "yia-kpp-mining":
      return journeyAssets.researchDocument;
    default:
      return achievementAssets.trophy;
  }
}

/**
 * Returns clean semantic category configuration.
 */
function getCategoryMeta(category?: string) {
  switch (category) {
    case "competition":
      return { label: "COMPETITION", variant: "achievement" as const };
    case "startup":
      return { label: "STARTUP ACCELERATION", variant: "primary" as const };
    case "grant":
      return { label: "PROJECT GRANT", variant: "blue" as const };
    default:
      return { label: "HONOR", variant: "secondary" as const };
  }
}

export function TrophyRoom() {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();
  // Default selected: First/featured achievement (Smart City Competition UNITY UNY 2026, 3rd Place podium)
  const [selectedId, setSelectedId] = useState<string>(ACHIEVEMENTS_DATA[0].id);

  const selectedAchievement: Achievement =
    ACHIEVEMENTS_DATA.find((a) => a.id === selectedId) || ACHIEVEMENTS_DATA[0];

  const selectedAsset = getAchievementAsset(selectedAchievement.id);
  const selectedCategory = getCategoryMeta(selectedAchievement.category);
  const isSelectedPodium = selectedAchievement.id === "smart-city-uny-2026";
  const isSelectedGrant = selectedAchievement.category === "grant";

  const isRecruiter = mode === "recruiter";

  if (mode === "recruiter") return <AtelierHonors />;

  if (!isRecruiter) {
    return localize((
      <section id="trophies" aria-labelledby="trophies-title" className="world-chapter honors-chapter">
        <div className="world-container chapter-content">
          <header className="chapter-heading">
            <p className="chapter-eyebrow">06 / THE TROPHY SHELF</p>
            <h2 id="trophies-title">Milestones worth keeping.</h2>
            <p>Competition placements, startup finalist honors, and project grant funding. Select an object to read its record.</p>
          </header>

          <div role="group" aria-label="Achievement selection" className="honors-shelf">
            <WorldScene variant="hall" />
            {ACHIEVEMENTS_DATA.map((achievement) => {
              const asset = getAchievementAsset(achievement.id);
              return (
                <button key={achievement.id} id={`trophy-selector-${achievement.id}`} type="button" aria-pressed={selectedId === achievement.id} aria-controls="achievement-dossier" onClick={() => setSelectedId(achievement.id)} className={cn("honors-shelf__object", achievement.category === "grant" && "honors-shelf__object--grant")}>
                  <span className="honors-shelf__art" aria-hidden="true">
                    <Image src={asset.src} alt="" fill sizes="(max-width: 640px) 110px, 150px" unoptimized className="object-contain" />
                  </span>
                  <span className="honors-shelf__result">{achievement.result}</span>
                  <span className="honors-shelf__name">{achievement.title}</span>
                  <span className="honors-shelf__year">{achievement.year} · {achievement.category === "grant" ? "Project grant" : "National competition"}</span>
                  <span className="honors-shelf__selection">{selectedId === achievement.id ? "Selected record" : "Read record"}</span>
                </button>
              );
            })}
          </div>

          <section id="achievement-dossier" aria-live="polite" aria-atomic="true" aria-labelledby="dossier-title" className="honors-dossier">
            <div>
              <p className="chapter-eyebrow">{selectedCategory.label} / {selectedAchievement.year}</p>
              <p className={cn("honors-dossier__result", isSelectedGrant && "honors-dossier__result--grant")}>{selectedAchievement.result}</p>
              <h3 id="dossier-title">{selectedAchievement.title}</h3>
              <p className="honors-dossier__organizer">{selectedAchievement.organizer}</p>
            </div>
            <div className="honors-dossier__evidence">
              <p>{selectedAchievement.description}</p>
              {selectedAchievement.relatedProject && (
                <Link href={`/projects/${selectedAchievement.relatedProject}`} className="chapter-link">
                  {selectedAchievement.relatedProject === "wattwise-ai" ? "Read the WattWise AI case study" : "Read the CIVICTWIN Semarang case study"} <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </section>
        </div>
      </section>
    ));
  }
  return null;
}
