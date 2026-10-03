"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ACHIEVEMENTS_DATA } from "@/data/achievements";
import { Achievement } from "@/types/achievement";
import { achievementAssets, uiAssets } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { cn } from "@/lib/utils";
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
      return achievementAssets.medal;
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
  // Default selected: First/featured achievement (Smart City Competition UNITY UNY 2026, 3rd Place podium)
  const [selectedId, setSelectedId] = useState<string>(ACHIEVEMENTS_DATA[0].id);

  const selectedAchievement: Achievement =
    ACHIEVEMENTS_DATA.find((a) => a.id === selectedId) || ACHIEVEMENTS_DATA[0];

  const selectedAsset = getAchievementAsset(selectedAchievement.id);
  const selectedCategory = getCategoryMeta(selectedAchievement.category);
  const isSelectedPodium = selectedAchievement.id === "smart-city-uny-2026";
  const isSelectedGrant = selectedAchievement.category === "grant";

  return (
    <section
      id="trophies"
      aria-label="Trophy Room"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)] relative"
    >
      {/* Decorative ambient sparkle accent (sparing, top-right) */}
      <div
        className="hidden md:block absolute top-16 right-8 opacity-25 pointer-events-none select-none"
        aria-hidden="true"
      >
        <Image
          src={achievementAssets.sparkle.src}
          alt=""
          width={100}
          height={90}
          className="object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* Section Header */}
      <PixelSectionTitle
        number="06"
        title="TROPHY ROOM // ACHIEVEMENTS"
        subtitle="Documented competition podiums, startup acceleration milestones, and verified project grant funding."
        badge="HONORS"
      />

      {/* ========================================================================= */}
      {/* LAYER 1: ACHIEVEMENT SHELF (Horizontal Gallery of 4 Documented Milestones) */}
      {/* ========================================================================= */}
      <div className="space-y-4 mb-8">
        {/* Shelf Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--color-achievement)]" />
            <span className="font-mono text-xs font-bold text-[var(--color-text)] tracking-wider">
              ACHIEVEMENT SHELF
            </span>
            <span className="text-[var(--color-muted)] font-mono text-xs">{"//"}</span>
            <span className="font-mono text-[11px] text-[var(--color-muted)]">
              04 DOCUMENTED MILESTONES
            </span>
          </div>

          <span className="text-[11px] font-mono text-[var(--color-primary)] hidden sm:inline-block">
            [CLICK SHELF ITEM TO INSPECT DOSSIER]
          </span>
        </div>

        {/* The Display Shelf Container */}
        <div className="p-3 sm:p-5 bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] relative">
          {/* Subtle corner pixel cuts */}
          <div className="absolute -top-[2px] -left-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
          <div className="absolute -top-[2px] -right-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
          <div className="absolute -bottom-[2px] -left-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />
          <div className="absolute -bottom-[2px] -right-[2px] w-1.5 h-1.5 bg-[var(--color-background)]" />

          {/* 4 Achievement Selectors: 2x2 on Mobile, 4-col on Tablet & Desktop */}
          <div
            role="group"
            aria-label="Achievement selection"
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10"
          >
            {ACHIEVEMENTS_DATA.map((trophy) => {
              const isSelected = trophy.id === selectedId;
              const asset = getAchievementAsset(trophy.id);
              const isPodium = trophy.id === "smart-city-uny-2026";
              const isGrant = trophy.category === "grant";

              return (
                <button
                  key={trophy.id}
                  type="button"
                  id={`trophy-selector-${trophy.id}`}
                  aria-pressed={isSelected}
                  aria-controls="achievement-dossier"
                  onClick={() => setSelectedId(trophy.id)}
                  className={cn(
                    "flex flex-col items-center justify-between text-center p-3 sm:p-4 border-2 transition-all duration-150 select-none group relative",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]",
                    // Selected state: elevated and strongly bordered
                    isSelected
                      ? isPodium
                        ? "bg-[var(--color-surface-secondary)] border-[var(--color-achievement)] shadow-[4px_4px_0px_0px_rgba(255,209,102,0.35)] -translate-y-1 sm:-translate-y-1.5"
                        : isGrant
                        ? "bg-[var(--color-surface-secondary)] border-[var(--color-blue)] shadow-[4px_4px_0px_0px_rgba(90,169,255,0.35)] -translate-y-1 sm:-translate-y-1.5"
                        : "bg-[var(--color-surface-secondary)] border-[var(--color-primary)] shadow-[4px_4px_0px_0px_rgba(93,228,199,0.35)] -translate-y-1 sm:-translate-y-1.5"
                      : "bg-[var(--color-background)]/80 border-[var(--color-border)] hover:border-[var(--color-border)]/90 hover:bg-[var(--color-surface-secondary)]/50 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]"
                  )}
                >
                  {/* Status marker / pill */}
                  <div className="w-full flex items-center justify-between gap-1 mb-2">
                    <span className="font-mono text-[10px] text-[var(--color-muted)] font-semibold">
                      {trophy.year}
                    </span>

                    {isSelected ? (
                      <span
                        className={cn(
                          "px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider",
                          isPodium
                            ? "bg-[var(--color-achievement)] text-[#0B1020]"
                            : isGrant
                            ? "bg-[var(--color-blue)] text-[#0B1020]"
                            : "bg-[var(--color-primary)] text-[#0B1020]"
                        )}
                      >
                        SELECTED
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-[var(--color-muted)] group-hover:text-[var(--color-text)]">
                        {isPodium ? "PODIUM" : isGrant ? "GRANT" : "FINALIST"}
                      </span>
                    )}
                  </div>

                  {/* Artwork Showcase on Pedestal */}
                  <div className="w-full h-20 sm:h-24 md:h-28 flex items-center justify-center p-1 my-1">
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      width={asset.recommendedDisplaySize.width}
                      height={asset.recommendedDisplaySize.height}
                      className={cn(
                        "w-auto max-h-full object-contain select-none pointer-events-none transition-transform duration-200",
                        isSelected
                          ? "scale-105 drop-shadow-[0_0_10px_rgba(255,209,102,0.3)]"
                          : "group-hover:scale-105 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.6)] opacity-85 group-hover:opacity-100"
                      )}
                      style={{ imageRendering: "pixelated" }}
                      loading="lazy"
                    />
                  </div>

                  {/* Result & Short Title */}
                  <div className="w-full pt-2 border-t border-[var(--color-border)]/70 space-y-0.5">
                    <span
                      className={cn(
                        "font-mono text-xs font-black uppercase tracking-wider block truncate",
                        isPodium
                          ? "text-[var(--color-achievement)]"
                          : isGrant
                          ? "text-[var(--color-blue)]"
                          : "text-[var(--color-primary)]"
                      )}
                    >
                      {trophy.result}
                    </span>

                    <span className="font-mono text-[11px] text-[var(--color-text)] font-bold block truncate">
                      {trophy.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stepped Shelf Base Platform (CSS-only horizontal ledge) */}
          <div
            className="mt-4 pt-3 border-t-4 border-[var(--color-border)] flex items-center justify-between text-[10px] font-mono text-[var(--color-muted)] select-none"
            aria-hidden="true"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[var(--color-primary)]" />
              <span>PEDESTAL 01</span>
            </span>
            <span className="hidden sm:inline">CENTRAL EXHIBIT // HANIF.EXE HONORS COLLECTION</span>
            <span className="flex items-center gap-1.5">
              <span>PEDESTAL 04</span>
              <span className="w-1.5 h-1.5 bg-[var(--color-achievement)]" />
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 2: SELECTED ACHIEVEMENT EVIDENCE PANEL (Detailed Dossier)            */}
      {/* ========================================================================= */}
      <section
        id="achievement-dossier"
        aria-live="polite"
        aria-labelledby="dossier-title"
        className={cn(
          "border-2 transition-all duration-200 overflow-hidden",
          isSelectedPodium
            ? "bg-[var(--color-surface)] border-[var(--color-achievement)] shadow-[6px_6px_0px_0px_rgba(255,209,102,0.25)]"
            : isSelectedGrant
            ? "bg-[var(--color-surface)] border-[var(--color-blue)] shadow-[6px_6px_0px_0px_rgba(90,169,255,0.25)]"
            : "bg-[var(--color-surface)] border-[var(--color-primary)] shadow-[6px_6px_0px_0px_rgba(93,228,199,0.25)]"
        )}
      >
        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[var(--color-surface-secondary)] border-b-2 border-[var(--color-border)] select-none">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-2.5 h-2.5",
                isSelectedPodium
                  ? "bg-[var(--color-achievement)]"
                  : isSelectedGrant
                  ? "bg-[var(--color-blue)]"
                  : "bg-[var(--color-primary)]"
              )}
            />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--color-text)]">
              EXHIBIT_LOG // {selectedAchievement.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <PixelBadge variant={selectedCategory.variant} size="sm">
              {selectedCategory.label}
            </PixelBadge>

            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-muted)]">
              YEAR {selectedAchievement.year}
            </span>
          </div>
        </div>

        {/* Dossier Content Body */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Large Normalized Asset Showcase */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[var(--color-background)] border border-[var(--color-border)] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)] relative">
              {/* Corner Accents */}
              <div className="absolute top-1.5 left-1.5 text-[9px] font-mono text-[var(--color-muted)]">
                ASSET_FRAME
              </div>
              <div className="absolute top-1.5 right-1.5 text-[9px] font-mono text-[var(--color-primary)]">
                TIER_A
              </div>

              <div className="py-2 flex items-center justify-center min-h-[140px] sm:min-h-[170px]">
                <Image
                  src={selectedAsset.src}
                  alt={selectedAsset.alt}
                  width={selectedAsset.recommendedDisplaySize.width}
                  height={selectedAsset.recommendedDisplaySize.height}
                  className="w-auto h-28 sm:h-36 lg:h-44 max-w-full object-contain drop-shadow-[0_0_16px_rgba(255,209,102,0.25)] select-none pointer-events-none"
                  style={{ imageRendering: "pixelated" }}
                  priority={false}
                />
              </div>

              {/* Asset Caption */}
              <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider mt-2 block text-center">
                {selectedAsset.name}
              </span>
            </div>

            {/* Right: Full Evidence Information Hierarchy */}
            <div className="md:col-span-7 lg:col-span-8 space-y-4">
              {/* Result Pill & Sub-badge */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "font-mono text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight",
                      isSelectedPodium
                        ? "text-[var(--color-achievement)]"
                        : isSelectedGrant
                        ? "text-[var(--color-blue)]"
                        : "text-[var(--color-primary)]"
                    )}
                  >
                    {selectedAchievement.result}
                  </span>

                  {isSelectedPodium && (
                    <span className="px-2 py-0.5 bg-[var(--color-achievement)]/20 border border-[var(--color-achievement)] text-[var(--color-achievement)] font-mono text-xs font-bold uppercase tracking-wider">
                      NATIONAL PODIUM
                    </span>
                  )}
                  {isSelectedGrant && (
                    <span className="px-2 py-0.5 bg-[var(--color-blue)]/20 border border-[var(--color-blue)] text-[var(--color-blue)] font-mono text-xs font-bold uppercase tracking-wider">
                      EXTERNAL GRANT FUNDING
                    </span>
                  )}
                  {!isSelectedPodium && !isSelectedGrant && (
                    <span className="px-2 py-0.5 bg-[var(--color-primary)]/20 border border-[var(--color-primary)] text-[var(--color-primary)] font-mono text-xs font-bold uppercase tracking-wider">
                      NATIONAL FINALIST
                    </span>
                  )}
                </div>

                <h3 id="dossier-title" className="font-mono text-lg sm:text-xl font-bold text-[var(--color-text)]">
                  {selectedAchievement.title}
                </h3>
              </div>

              {/* Organizer & Year Metadata */}
              {selectedAchievement.organizer && (
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-muted)] pb-1 border-b border-[var(--color-border)]/60">
                  <span className="text-[var(--color-primary)] font-bold">ORGANIZER:</span>
                  <span className="text-[var(--color-text)]">
                    {selectedAchievement.organizer}
                  </span>
                  <span>•</span>
                  <span>{selectedAchievement.year}</span>
                </div>
              )}

              {/* Factual Narrative Description */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider block">
                  DOCUMENTED EVIDENCE:
                </span>
                <p className="text-xs sm:text-sm text-[var(--color-text)] font-sans leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>

              {/* Linked Related Project Action */}
              {selectedAchievement.relatedProject && (
                <div className="pt-2">
                  <div className="p-3 bg-[var(--color-background)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider block">
                        LINKED ENGINEERING SYSTEM:
                      </span>
                      <span className="font-mono text-xs font-bold text-[var(--color-text)]">
                        {selectedAchievement.relatedProject === "purwokerto-intelligence-layer"
                          ? "Purwokerto Intelligence Layer"
                          : selectedAchievement.relatedProject === "wattwise-ai"
                          ? "WattWise AI"
                          : selectedAchievement.relatedProject}
                      </span>
                    </div>

                    <Link
                      href={`/projects/${selectedAchievement.relatedProject}`}
                      className="inline-flex items-center justify-center gap-2 px-3.5 py-2 font-mono text-xs font-bold uppercase transition-all duration-75 select-none bg-[var(--color-primary)] text-[#0B1020] hover:brightness-110 border-2 border-[var(--color-primary)] shadow-[3px_3px_0px_0px_#0B1020] active:translate-x-[2px] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                    >
                      <span>View Related Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
