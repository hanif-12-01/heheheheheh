"use client";

import React from "react";
import Image from "next/image";
import { INTERESTS_DATA } from "@/data/interests";
import { techAssets, journeyAssets, WorldAssetItem } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { Sparkles, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export function Interests() {
  const { mode } = usePortfolioMode();

  // Map each domain to its normalized world asset from the registry
  const domainAssetMap: Record<string, WorldAssetItem> = {
    ai: techAssets.aiChip,
    "smart-city": techAssets.smartCity,
    "software-engineering": techAssets.codeEditor,
    "startup-product": journeyAssets.rocket,
    "research-experimentation": journeyAssets.researchFlask,
  };

  // Find Smart City as the Tier A featured item
  const smartCityInterest = INTERESTS_DATA.find((i) => i.id === "smart-city");
  const aiInterest = INTERESTS_DATA.find((i) => i.id === "ai");
  const standardInterests = INTERESTS_DATA.filter(
    (i) => i.id !== "smart-city" && i.id !== "ai"
  );

  return (
    <section
      id="interests"
      aria-label="Tech Interests"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)] select-none"
    >
      <PixelSectionTitle
        number="04"
        title="PRIMARY TECH INTERESTS // DOMAIN MAP"
        subtitle="Core focus domains spanning data intelligence, geospatial systems, and software engineering."
        badge="TECH DOMAINS"
      />

      <div className="space-y-6">
        {/* ========================================================================= */}
        {/* ROW 1: AI (1 col, ~35%) + SMART CITY (Featured Tier A Diorama, 2 cols, ~65%) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 1. Artificial Intelligence Card (lg:col-span-4) */}
          {aiInterest && (
            <PixelCard
              className="lg:col-span-4 flex flex-col justify-between h-full p-5 sm:p-6 space-y-4 border-2 border-[var(--color-primary)]/70 shadow-[4px_4px_0px_0px_rgba(93,228,199,0.2)]"
              variant="primary"
            >
              <div className="space-y-4">
                {/* Header: Visual Illustration Stage + Key Focus Badge */}
                <div className="flex items-center justify-between gap-2">
                  <PixelBadge variant="primary" size="sm">
                    {aiInterest.keyFocus.split("&")[0]?.trim()}
                  </PixelBadge>
                  <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase">
                    SYS_NODE // 01
                  </span>
                </div>

                {/* AI Chip Asset Stage */}
                <div className="py-2 flex items-center justify-center bg-[var(--color-background)] border border-[var(--color-border)] p-3 group">
                  <div className="relative w-24 sm:w-28 h-20 sm:h-24 flex items-center justify-center">
                    <Image
                      src={domainAssetMap.ai.src}
                      alt={domainAssetMap.ai.alt}
                      width={100}
                      height={92}
                      className="w-auto h-full max-h-20 sm:max-h-24 object-contain transition-transform duration-200 group-hover:scale-105"
                      style={{ imageRendering: "pixelated" }}
                      unoptimized
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-base sm:text-lg font-bold text-[var(--color-text)] tracking-tight">
                    {aiInterest.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                    {aiInterest.summary}
                  </p>
                </div>
              </div>

              {/* Focus Topics (Max 3 primary items) */}
              <div className="pt-3 border-t border-[var(--color-border)]/60 space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[var(--color-primary)] block font-bold tracking-wider">
                  PRIMARY FOCUS AREAS:
                </span>
                <ul className="space-y-1">
                  {aiInterest.topics.slice(0, 3).map((topic) => (
                    <li
                      key={topic}
                      className="text-xs font-mono text-[var(--color-text)] flex items-center gap-1.5"
                    >
                      <span className="text-[var(--color-primary)] text-[10px]">■</span>
                      <span className="truncate">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </PixelCard>
          )}

          {/* 2. Smart City & Civic Tech — FEATURED TIER A DIORAMA (lg:col-span-8) */}
          {smartCityInterest && (
            <div className="lg:col-span-8 p-5 sm:p-6 bg-[var(--color-surface)] border-2 border-[var(--color-blue)] shadow-[6px_6px_0px_0px_rgba(90,169,255,0.25)] flex flex-col justify-between relative overflow-hidden group">
              {/* Corner pixel notches */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-[var(--color-blue)]" aria-hidden="true" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-blue)]" aria-hidden="true" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[var(--color-blue)]" aria-hidden="true" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[var(--color-blue)]" aria-hidden="true" />

              <div className="space-y-4">
                {/* Header Bar: Featured Flag & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)]">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[var(--color-blue)]/20 border border-[var(--color-blue)] text-[var(--color-blue)] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      FEATURED DOMAIN // TIER A
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-muted)] hidden sm:inline">
                      {"//"} PURWOKERTO GIS INITIATIVE
                    </span>
                  </div>
                  <PixelBadge variant="blue" size="sm">
                    {smartCityInterest.keyFocus}
                  </PixelBadge>
                </div>

                {/* Main Content Layout: Text details + Large Isometric Diorama */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left Text Detail (~52%) */}
                  <div className="md:col-span-6 space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-[var(--color-text)] tracking-tight">
                      {smartCityInterest.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--color-muted)] font-sans leading-relaxed">
                      {smartCityInterest.summary}
                    </p>

                    <div className="p-3 bg-[var(--color-background)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] space-y-1">
                      <div className="text-[10px] text-[var(--color-primary)] font-bold uppercase">
                        CIVIC ANALYTICS &amp; GIS
                      </div>
                      <div className="text-[11px] text-[var(--color-muted)]">
                        Connecting multi-criteria decision models (MCDM) with spatial infrastructure mapping to support transparent regional governance.
                      </div>
                    </div>
                  </div>

                  {/* Right Isometric Smart City Diorama Stage (~48%) */}
                  <div className="md:col-span-6 flex flex-col items-center justify-center p-3 bg-[var(--color-background)]/80 border-2 border-dashed border-[var(--color-blue)]/40 relative overflow-hidden">
                    <div className="w-full flex justify-between items-center text-[9px] font-mono text-[var(--color-muted)] pb-1 mb-1 border-b border-[var(--color-border)]/50">
                      <span>ISOMETRIC_DIORAMA.PNG</span>
                      <span className="text-[var(--color-blue)] font-bold">SCALE: 1.0</span>
                    </div>

                    <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] flex items-center justify-center py-2">
                      <Image
                        src={domainAssetMap["smart-city"].src}
                        alt={domainAssetMap["smart-city"].alt}
                        width={320}
                        height={232}
                        className="w-full h-auto max-h-48 sm:max-h-56 object-contain transition-transform duration-300 group-hover:scale-105"
                        style={{ imageRendering: "pixelated" }}
                        unoptimized
                      />
                    </div>

                    <span className="text-[9px] font-mono text-[var(--color-muted)] pt-1 text-center">
                      Interactive Smart City Urban Intelligence Framework
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Focus Topics */}
              <div className="pt-3 mt-3 border-t border-[var(--color-border)]/60 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                  <span className="text-[10px] uppercase text-[var(--color-blue)] font-bold mr-1">
                    KEY TOPICS:
                  </span>
                  {smartCityInterest.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] text-[10px]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <span className="text-[10px] font-mono text-[var(--color-achievement)] font-bold hidden sm:inline">
                  ★ UNITY UNY 3RD PLACE TRACK
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: Software Engineering + Product / Startup + Research (3 equal cols) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {standardInterests.map((interest) => {
            const asset = domainAssetMap[interest.id];
            const isStartup = interest.id === "startup-product";
            const isResearch = interest.id === "research-experimentation";

            return (
              <PixelCard
                key={interest.id}
                className={cn(
                  "flex flex-col justify-between h-full p-5 space-y-4",
                  isStartup && "border-2 border-[var(--color-achievement)]/80 shadow-[4px_4px_0px_0px_rgba(255,209,102,0.2)]",
                  isResearch && "border-2 border-[var(--color-purple)]/80 shadow-[4px_4px_0px_0px_rgba(167,139,250,0.2)]"
                )}
                variant={isStartup ? "achievement" : isResearch ? "accent" : "default"}
              >
                <div className="space-y-3.5">
                  {/* Card Header: Focus Badge + Domain Key */}
                  <div className="flex items-center justify-between gap-2">
                    <PixelBadge
                      variant={isStartup ? "achievement" : isResearch ? "accent" : "outline"}
                      size="sm"
                    >
                      {interest.keyFocus.split("&")[0]?.trim()}
                    </PixelBadge>
                    <span className="font-mono text-[10px] text-[var(--color-muted)] uppercase">
                      DOMAIN
                    </span>
                  </div>

                  {/* Asset Stage Frame */}
                  {asset && (
                    <div className="py-2 flex items-center justify-center bg-[var(--color-background)] border border-[var(--color-border)] p-3 group">
                      <div className="relative w-28 sm:w-32 h-20 sm:h-24 flex items-center justify-center">
                        <Image
                          src={asset.src}
                          alt={asset.alt}
                          width={110}
                          height={90}
                          className="w-auto h-full max-h-20 sm:max-h-24 object-contain transition-transform duration-200 group-hover:scale-105"
                          style={{ imageRendering: "pixelated" }}
                          unoptimized
                        />
                      </div>
                    </div>
                  )}

                  {/* Domain Title & Summary */}
                  <div>
                    <h3 className="font-mono text-base font-bold text-[var(--color-text)] tracking-tight">
                      {interest.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                      {interest.summary}
                    </p>
                  </div>
                </div>

                {/* Primary Focus Topics (3 items) */}
                <div className="pt-3 border-t border-[var(--color-border)]/60 space-y-1.5">
                  <span
                    className="text-[10px] font-mono uppercase block font-bold tracking-wider"
                    style={{ color: interest.color }}
                  >
                    FOCUS TOPICS:
                  </span>
                  <ul className="space-y-1">
                    {interest.topics.slice(0, 3).map((topic) => (
                      <li
                        key={topic}
                        className="text-xs font-mono text-[var(--color-text)] flex items-center gap-1.5"
                      >
                        <span style={{ color: interest.color }} className="text-[10px]">■</span>
                        <span className="truncate">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </PixelCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

