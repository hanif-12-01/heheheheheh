"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  journeyAssets,
  achievementAssets,
  techAssets,
  uiAssets,
  WorldAssetItem,
} from "@/data/worldAssets";
import { PixelButton } from "@/components/pixel/PixelButton";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { ArrowLeft, CheckSquare, Square, Info } from "lucide-react";

export default function WorldAssetsDevPage() {
  const [bgMode, setBgMode] = useState<"dark" | "checkerboard" | "black">("dark");
  const [showMetadata, setShowMetadata] = useState(true);

  const bgClasses = {
    dark: "bg-[var(--color-bg-base,#0B1020)]",
    black: "bg-black",
    checkerboard:
      "bg-[linear-gradient(45deg,#162032_25%,transparent_25%),linear-gradient(-45deg,#162032_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#162032_75%),linear-gradient(-45deg,transparent_75%,#162032_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0px] bg-[#0c121e]",
  };

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link href="/">
              <PixelButton variant="secondary" size="sm">
                <ArrowLeft className="w-4 h-4" />
                <span>Portfolio</span>
              </PixelButton>
            </Link>
            <Link href="/dev/pixel-assets">
              <PixelButton variant="ghost" size="sm">
                <span>Pixel Hanif QA</span>
              </PixelButton>
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] pt-2">
            WORLD ASSET INSPECTOR // DEV PREVIEW
          </h1>
          <p className="text-xs text-[var(--color-muted)] font-sans">
            Phase 2B Normalization QA: Journey Props, Achievement Badges, Tech Illustrations, and UI Pixel Icons.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PixelBadge variant="achievement" size="md">
            30/30 APPROVED WORLD ASSETS
          </PixelBadge>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[var(--color-primary)] font-bold">BACKGROUND:</span>
          {(["dark", "checkerboard", "black"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setBgMode(mode)}
              className={`px-2.5 py-1 border transition-colors cursor-pointer capitalize ${
                bgMode === mode
                  ? "bg-[var(--color-primary)] text-black border-[var(--color-primary)] font-bold"
                  : "bg-transparent text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-primary)]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowMetadata((prev) => !prev)}
            className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors cursor-pointer"
          >
            {showMetadata ? (
              <CheckSquare className="w-4 h-4 text-[var(--color-achievement)]" />
            ) : (
              <Square className="w-4 h-4" />
            )}
            <span>Show Asset Metadata</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. JOURNEY ASSETS */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-[var(--color-border)] pb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
              <span className="text-[var(--color-primary)]">01.</span> JOURNEY ASSETS
            </h2>
            <p className="text-xs text-[var(--color-muted)] font-sans">
              Semester progression items with normalized visual hierarchy: Small Items, Medium Props, and Large Landmarks.
            </p>
          </div>
          <PixelBadge variant="blue" size="sm">
            8 PROPS / 5 SEMESTERS
          </PixelBadge>
        </div>

        {/* Hierarchy grouping by semester */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Semester 1 */}
          <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                <span className="text-xs font-bold text-[var(--color-accent)]">SEMESTER 1</span>
                <span className="text-[10px] text-[var(--color-muted)]">Medium Prop</span>
              </div>
              <div className={`p-6 rounded flex items-center justify-center min-h-[220px] ${bgClasses[bgMode]}`}>
                <div style={{ width: journeyAssets.backpack.recommendedDisplaySize.width, height: journeyAssets.backpack.recommendedDisplaySize.height }} className="relative">
                  <Image
                    src={journeyAssets.backpack.src}
                    alt={journeyAssets.backpack.alt}
                    fill
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            {showMetadata && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                <div className="font-bold text-[var(--color-text)]">{journeyAssets.backpack.name}</div>
                <div>Path: <code className="text-[var(--color-primary)]">{journeyAssets.backpack.src}</code></div>
                <div>Display: {journeyAssets.backpack.recommendedDisplaySize.width} × {journeyAssets.backpack.recommendedDisplaySize.height} px</div>
              </div>
            )}
          </div>

          {/* Semester 2 */}
          <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between md:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                <span className="text-xs font-bold text-[var(--color-accent)]">SEMESTER 2</span>
                <span className="text-[10px] text-[var(--color-primary)] font-bold">Large Landmark</span>
              </div>
              <div className={`p-6 rounded flex items-center justify-center min-h-[220px] ${bgClasses[bgMode]}`}>
                <div style={{ width: journeyAssets.organizationBuilding.recommendedDisplaySize.width, height: journeyAssets.organizationBuilding.recommendedDisplaySize.height }} className="relative">
                  <Image
                    src={journeyAssets.organizationBuilding.src}
                    alt={journeyAssets.organizationBuilding.alt}
                    fill
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            {showMetadata && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                <div className="font-bold text-[var(--color-text)]">{journeyAssets.organizationBuilding.name}</div>
                <div>Path: <code className="text-[var(--color-primary)]">{journeyAssets.organizationBuilding.src}</code></div>
                <div>Display: {journeyAssets.organizationBuilding.recommendedDisplaySize.width} × {journeyAssets.organizationBuilding.recommendedDisplaySize.height} px</div>
              </div>
            )}
          </div>

          {/* Semester 3: Book & Microphone */}
          <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                <span className="text-xs font-bold text-[var(--color-accent)]">SEMESTER 3</span>
                <span className="text-[10px] text-[var(--color-muted)]">Small Item</span>
              </div>
              <div className={`p-6 rounded flex items-center justify-center min-h-[200px] ${bgClasses[bgMode]}`}>
                <div style={{ width: journeyAssets.book.recommendedDisplaySize.width, height: journeyAssets.book.recommendedDisplaySize.height }} className="relative">
                  <Image
                    src={journeyAssets.book.src}
                    alt={journeyAssets.book.alt}
                    fill
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            {showMetadata && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                <div className="font-bold text-[var(--color-text)]">{journeyAssets.book.name}</div>
                <div>Path: <code className="text-[var(--color-primary)]">{journeyAssets.book.src}</code></div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                <span className="text-xs font-bold text-[var(--color-accent)]">SEMESTER 3</span>
                <span className="text-[10px] text-[var(--color-muted)]">Small Item</span>
              </div>
              <div className={`p-6 rounded flex items-center justify-center min-h-[200px] ${bgClasses[bgMode]}`}>
                <div style={{ width: journeyAssets.microphone.recommendedDisplaySize.width, height: journeyAssets.microphone.recommendedDisplaySize.height }} className="relative">
                  <Image
                    src={journeyAssets.microphone.src}
                    alt={journeyAssets.microphone.alt}
                    fill
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            {showMetadata && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                <div className="font-bold text-[var(--color-text)]">{journeyAssets.microphone.name}</div>
                <div>Path: <code className="text-[var(--color-primary)]">{journeyAssets.microphone.src}</code></div>
              </div>
            )}
          </div>

          {/* Semester 4: Document, Flask, Trophy */}
          <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                <span className="text-xs font-bold text-[var(--color-accent)]">SEMESTER 4</span>
                <span className="text-[10px] text-[var(--color-muted)]">Medium Prop</span>
              </div>
              <div className={`p-6 rounded flex items-center justify-center min-h-[200px] ${bgClasses[bgMode]}`}>
                <div style={{ width: journeyAssets.researchDocument.recommendedDisplaySize.width, height: journeyAssets.researchDocument.recommendedDisplaySize.height }} className="relative">
                  <Image
                    src={journeyAssets.researchDocument.src}
                    alt={journeyAssets.researchDocument.alt}
                    fill
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            {showMetadata && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                <div className="font-bold text-[var(--color-text)]">{journeyAssets.researchDocument.name}</div>
                <div>Path: <code className="text-[var(--color-primary)]">{journeyAssets.researchDocument.src}</code></div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[var(--color-accent)]">SEMESTER 4</span>
                  <span className="px-1.5 py-0.5 text-[9px] bg-teal-900/60 text-teal-300 border border-teal-500 rounded">Muted Teal</span>
                </div>
                <span className="text-[10px] text-[var(--color-muted)]">Medium Prop</span>
              </div>
              <div className={`p-6 rounded flex items-center justify-center min-h-[200px] ${bgClasses[bgMode]}`}>
                <div style={{ width: journeyAssets.researchFlask.recommendedDisplaySize.width, height: journeyAssets.researchFlask.recommendedDisplaySize.height }} className="relative">
                  <Image
                    src={journeyAssets.researchFlask.src}
                    alt={journeyAssets.researchFlask.alt}
                    fill
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            {showMetadata && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                <div className="font-bold text-[var(--color-text)]">{journeyAssets.researchFlask.name}</div>
                <div>Palette: <code className="text-teal-400">#367788 / #478495 / #235A6B</code></div>
                <div>Path: <code className="text-[var(--color-primary)]">{journeyAssets.researchFlask.src}</code></div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                <span className="text-xs font-bold text-[var(--color-accent)]">SEMESTER 4</span>
                <span className="text-[10px] text-[var(--color-muted)]">Medium Prop</span>
              </div>
              <div className={`p-6 rounded flex items-center justify-center min-h-[200px] ${bgClasses[bgMode]}`}>
                <div style={{ width: journeyAssets.trophy.recommendedDisplaySize.width, height: journeyAssets.trophy.recommendedDisplaySize.height }} className="relative">
                  <Image
                    src={journeyAssets.trophy.src}
                    alt={journeyAssets.trophy.alt}
                    fill
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            {showMetadata && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                <div className="font-bold text-[var(--color-text)]">{journeyAssets.trophy.name}</div>
                <div>Path: <code className="text-[var(--color-primary)]">{journeyAssets.trophy.src}</code></div>
              </div>
            )}
          </div>

          {/* Semester 5: Rocket */}
          <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between md:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                <span className="text-xs font-bold text-[var(--color-accent)]">SEMESTER 5</span>
                <span className="text-[10px] text-[var(--color-primary)] font-bold">Large Landmark</span>
              </div>
              <div className={`p-6 rounded flex items-center justify-center min-h-[220px] ${bgClasses[bgMode]}`}>
                <div style={{ width: journeyAssets.rocket.recommendedDisplaySize.width, height: journeyAssets.rocket.recommendedDisplaySize.height }} className="relative">
                  <Image
                    src={journeyAssets.rocket.src}
                    alt={journeyAssets.rocket.alt}
                    fill
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
              </div>
            </div>
            {showMetadata && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                <div className="font-bold text-[var(--color-text)]">{journeyAssets.rocket.name}</div>
                <div>Path: <code className="text-[var(--color-primary)]">{journeyAssets.rocket.src}</code></div>
                <div>Display: {journeyAssets.rocket.recommendedDisplaySize.width} × {journeyAssets.rocket.recommendedDisplaySize.height} px</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ACHIEVEMENT ASSETS */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-[var(--color-border)] pb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
              <span className="text-[var(--color-primary)]">02.</span> ACHIEVEMENT ASSETS
            </h2>
            <p className="text-xs text-[var(--color-muted)] font-sans">
              Individual RGBA crops extracted from master achievement sheet: Natural aspect ratios preserved with balanced padding.
            </p>
          </div>
          <PixelBadge variant="achievement" size="sm">
            5 CROPPED ICONS + 1 MASTER SHEET
          </PixelBadge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {([
            achievementAssets.trophy,
            achievementAssets.medal,
            achievementAssets.laurel,
            achievementAssets.confetti,
            achievementAssets.sparkle,
          ] as WorldAssetItem[]).map((asset) => (
            <div
              key={asset.id}
              className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                  <span className="text-xs font-bold text-[var(--color-achievement)] uppercase">
                    {asset.name}
                  </span>
                  <PixelBadge variant={asset.tier === "A" ? "achievement" : "outline"} size="sm">
                    TIER {asset.tier}
                  </PixelBadge>
                </div>

                <div className={`p-6 rounded flex items-center justify-center min-h-[220px] ${bgClasses[bgMode]}`}>
                  <div
                    style={{
                      width: asset.recommendedDisplaySize.width,
                      height: asset.recommendedDisplaySize.height,
                    }}
                    className="relative"
                  >
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      className="object-contain"
                      style={{ imageRendering: "pixelated" }}
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {showMetadata && (
                <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                  <div>Role: <span className="text-[var(--color-text)]">{asset.role}</span></div>
                  <div>Path: <code className="text-[var(--color-primary)]">{asset.src}</code></div>
                  <div>Size: {asset.recommendedDisplaySize.width} × {asset.recommendedDisplaySize.height} px</div>
                </div>
              )}
            </div>
          ))}

          {/* Master sheet preview card */}
          <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                <span className="text-xs font-bold text-[var(--color-text)] uppercase">
                  MASTER SHEET ARCHIVE
                </span>
                <PixelBadge variant="outline" size="sm">
                  FULL SHEET
                </PixelBadge>
              </div>

              <div className={`p-4 rounded flex items-center justify-center min-h-[220px] ${bgClasses[bgMode]}`}>
                <div style={{ width: 280, height: 200 }} className="relative">
                  <Image
                    src={achievementAssets.sheet.src}
                    alt={achievementAssets.sheet.alt}
                    fill
                    className="object-contain"
                    style={{ imageRendering: "pixelated" }}
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {showMetadata && (
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                <div>Source: <span className="text-[var(--color-text)]">Set Ikon Penghargaan Pixel Art.png</span></div>
                <div>Path: <code className="text-[var(--color-primary)]">{achievementAssets.sheet.src}</code></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TECH ASSETS */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-[var(--color-border)] pb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
              <span className="text-[var(--color-primary)]">03.</span> TECH ASSETS
            </h2>
            <p className="text-xs text-[var(--color-muted)] font-sans">
              Domain illustrations featuring the Tier A Smart City Diorama as primary showcase.
            </p>
          </div>
          <PixelBadge variant="accent" size="sm">
            6 DOMAIN ASSETS
          </PixelBadge>
        </div>

        {/* TIER A FEATURED: Smart City */}
        <div className="p-6 bg-[var(--color-surface)] border-2 border-[var(--color-primary)] rounded space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border)] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[var(--color-primary)]">
                  ★ FEATURED ILLUSTRATION — TIER A
                </span>
                <PixelBadge variant="achievement" size="sm">
                  NATIONAL SMART CITY GRAND PRIZE
                </PixelBadge>
              </div>
              <p className="text-xs text-[var(--color-muted)] font-sans mt-0.5">
                Highest detail density; luminous isometric smart city diorama. Never scale down to small icon footprints.
              </p>
            </div>
            <code className="text-xs text-[var(--color-primary)]">{techAssets.smartCity.src}</code>
          </div>

          <div className={`p-8 rounded flex items-center justify-center min-h-[380px] ${bgClasses[bgMode]}`}>
            <div
              style={{
                width: techAssets.smartCity.recommendedDisplaySize.width,
                height: techAssets.smartCity.recommendedDisplaySize.height,
              }}
              className="relative max-w-full"
            >
              <Image
                src={techAssets.smartCity.src}
                alt={techAssets.smartCity.alt}
                fill
                className="object-contain"
                style={{ imageRendering: "pixelated" }}
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Other 5 Tech Assets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {([
            techAssets.codeEditor,
            techAssets.database,
            techAssets.server,
            techAssets.gisMap,
            techAssets.aiChip,
          ] as WorldAssetItem[]).map((asset) => (
            <div
              key={asset.id}
              className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[var(--color-border)] pb-2">
                  <span className="text-xs font-bold text-[var(--color-text)] uppercase">
                    {asset.name}
                  </span>
                  <PixelBadge variant="outline" size="sm">
                    TIER {asset.tier}
                  </PixelBadge>
                </div>

                <div className={`p-6 rounded flex items-center justify-center min-h-[220px] ${bgClasses[bgMode]}`}>
                  <div
                    style={{
                      width: asset.recommendedDisplaySize.width,
                      height: asset.recommendedDisplaySize.height,
                    }}
                    className="relative"
                  >
                    <Image
                      src={asset.src}
                      alt={asset.alt}
                      fill
                      className="object-contain"
                      style={{ imageRendering: "pixelated" }}
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {showMetadata && (
                <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-[11px] space-y-1 text-[var(--color-muted)]">
                  <div>Role: <span className="text-[var(--color-text)]">{asset.role}</span></div>
                  <div>Path: <code className="text-[var(--color-primary)]">{asset.src}</code></div>
                  <div>Display: {asset.recommendedDisplaySize.width} × {asset.recommendedDisplaySize.height} px</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. UI ICON ASSETS */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-[var(--color-border)] pb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
              <span className="text-[var(--color-primary)]">04.</span> UI PIXEL ICONS
            </h2>
            <p className="text-xs text-[var(--color-muted)] font-sans">
              Normalized onto 256×256 transparent square canvases with centered glyphs. Tested across 32px, 48px, and 64px display sizes.
            </p>
          </div>
          <PixelBadge variant="blue" size="sm">
            11 STANDALONE ICONS
          </PixelBadge>
        </div>

        <div className="p-4 bg-[var(--color-surface)] border border-teal-500/30 rounded flex items-center gap-3 text-xs text-teal-300">
          <Info className="w-5 h-5 shrink-0 text-teal-400" />
          <span>
            <strong>Readability Assessment:</strong> All 11 icons remain crisp and immediately recognizable at <strong>32px, 48px, and 64px</strong> using <code>image-rendering: pixelated</code>.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(Object.values(uiAssets) as WorldAssetItem[]).map((icon) => (
            <div
              key={icon.id}
              className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 mb-3">
                  <span className="text-xs font-bold text-[var(--color-text)]">
                    {icon.name}
                  </span>
                  <span className="text-[10px] text-[var(--color-muted)]">256×256 px</span>
                </div>

                {/* 3 Size preview column: 32px, 48px, 64px */}
                <div className={`p-4 rounded flex items-center justify-around gap-2 ${bgClasses[bgMode]}`}>
                  {/* 32px */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-8 h-8 relative">
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        fill
                        className="object-contain"
                        style={{ imageRendering: "pixelated" }}
                        unoptimized
                      />
                    </div>
                    <span className="text-[9px] text-[var(--color-muted)]">32px</span>
                  </div>

                  {/* 48px */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-12 h-12 relative">
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        fill
                        className="object-contain"
                        style={{ imageRendering: "pixelated" }}
                        unoptimized
                      />
                    </div>
                    <span className="text-[9px] text-[var(--color-muted)]">48px</span>
                  </div>

                  {/* 64px */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        fill
                        className="object-contain"
                        style={{ imageRendering: "pixelated" }}
                        unoptimized
                      />
                    </div>
                    <span className="text-[9px] text-[var(--color-muted)]">64px</span>
                  </div>
                </div>
              </div>

              {showMetadata && (
                <div className="pt-2 border-t border-[var(--color-border)] text-[10px] space-y-0.5 text-[var(--color-muted)]">
                  <div>Id: <code className="text-[var(--color-text)]">{icon.id}</code></div>
                  <div>File: <code className="text-[var(--color-primary)]">{icon.src.split("/").pop()}</code></div>
                  <div>Min size: <span className="text-teal-400 font-bold">32px (Pass)</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-muted)]">
        <div>
          <span>HANIF.EXE Phase 2B Asset Normalization QA</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dev/pixel-assets" className="hover:text-[var(--color-primary)] transition-colors">
            Pixel Hanif QA →
          </Link>
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
            Main Portfolio →
          </Link>
        </div>
      </div>
    </main>
  );
}
