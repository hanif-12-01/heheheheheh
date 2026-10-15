"use client";

import { AtelierJourney } from "@/components/atelier/AtelierSections";

import { useLocalize } from "@/i18n/useTranslations";

import React, { useState } from "react";
import Image from "next/image";
import { JOURNEY_LEVELS } from "@/data/journey";
import { journeyAssets, uiAssets } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelButton } from "@/components/pixel/PixelButton";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { WorldScene } from "@/components/world/WorldScene";
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

const TRAIL_PROPS = [
  [journeyAssets.backpack],
  [journeyAssets.organizationBuilding],
  [journeyAssets.book, journeyAssets.microphone],
  [journeyAssets.researchDocument, journeyAssets.trophy, journeyAssets.researchFlask],
  [journeyAssets.rocket],
];

function TrailLandmark({ semester }: { semester: number }) {
  const localize = useLocalize();
  return localize((
    <span className={`trail-landmark trail-landmark--${semester}`} aria-hidden="true">
      {TRAIL_PROPS[semester - 1].map((asset) => (
        <span key={asset.id} className="trail-landmark__prop">
          <Image src={asset.src} alt="" fill sizes="120px" unoptimized className="object-contain" />
        </span>
      ))}
    </span>
  ));
}

/**
 * Individual Landmark Renderer for each university semester.
 * Preserves normalized world assets and custom paired/composite compositions.
 */
function JourneyLandmark({ semester }: { semester: number }) {
  const localize = useLocalize();
  switch (semester) {
    case 1:
      return localize((
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
      ));

    case 2:
      return localize((
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
      ));

    case 3:
      return localize((
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
      ));

    case 4:
      return localize((
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
      ));

    case 5:
      return localize((
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
      ));

    default:
      return null;
  }
}

export function Journey() {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();
  // Default selected milestone: Semester 5 (current level)
  const [selectedSemester, setSelectedSemester] = useState<number>(5);

  const handleSelectSemester = (sem: number) => {
    setSelectedSemester(sem);
  };

  const isRecruiter = mode === "recruiter";

  if (mode === "recruiter") return <AtelierJourney />;

  if (!isRecruiter) {
    const selectedLevel = JOURNEY_LEVELS.find((level) => level.semester === selectedSemester) || JOURNEY_LEVELS[4];

    return localize((
      <section id="journey" aria-labelledby="journey-title" className="world-chapter trail-chapter">
        <div className="world-container chapter-content">
          <header className="chapter-heading">
            <p className="chapter-eyebrow">05 / THE TRAIL</p>
            <h2 id="journey-title">Every semester, a new horizon.</h2>
            <p>Five semesters of exploration, leadership, research, competition, and building.</p>
          </header>

          <nav aria-label="Semester Milestones Navigator" className="semester-trail">
            <WorldScene variant="trail" />
            <ol className="semester-trail__waypoints">
              {JOURNEY_LEVELS.map((level) => (
                <li key={level.semester} id={`semester-step-${level.semester}`} className={cn("semester-trail__stop", level.status === "current" && "semester-trail__stop--current")}>
                  <button
                    type="button"
                    id={`semester-selector-${level.semester}`}
                    aria-pressed={selectedSemester === level.semester}
                    aria-current={selectedSemester === level.semester ? "step" : undefined}
                    aria-controls={`semester-panel-${level.semester}`}
                    onClick={() => handleSelectSemester(level.semester)}
                    className="semester-trail__button"
                  >
                    <TrailLandmark semester={level.semester} />
                    <span className="semester-trail__node" aria-hidden="true">0{level.semester}</span>
                    <span className="semester-trail__label">Semester {level.semester}</span>
                    <span className="semester-trail__name">{level.title}</span>
                    <span className="semester-trail__status">{level.status === "current" ? "In progress · current" : "Completed"}</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">Semester {selectedSemester} selected. {selectedLevel.activities.length} documented milestones.</p>
          {JOURNEY_LEVELS.map((level) => (
            <div key={level.semester} id={`semester-panel-${level.semester}`} hidden={selectedSemester !== level.semester} role="region" aria-labelledby={`semester-heading-${level.semester}`} className="trail-dossier">
              <div className="trail-dossier__intro">
                <p className="chapter-eyebrow">SEMESTER 0{level.semester} / {level.status === "current" ? "IN PROGRESS" : "COMPLETED"}</p>
                <h3 id={`semester-heading-${level.semester}`}>{level.title}</h3>
                <p className="trail-dossier__subtitle">{level.subtitle}</p>
                <p>{level.summary}</p>
              </div>
              <div className="trail-dossier__records">
                <p className="chapter-eyebrow">{level.activities.length} DOCUMENTED MILESTONES</p>
                <ul className="chapter-evidence-list">
                  {level.activities.map((activity) => (
                    <li key={activity.title}>
                      <span className="chapter-evidence-list__category">{activity.category.replaceAll("-", " ")}</span>
                      <h4>{activity.title}</h4>
                      {activity.description && <p>{activity.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    ));
  }
  return null;
}
