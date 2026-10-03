"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PET_STATE_ASSETS } from "@/lib/constants";
import { PixelButton } from "@/components/pixel/PixelButton";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { ArrowLeft, Eye, Grid, Sliders, CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";

const STATES_DATA = [
  { id: "idle", name: "Idle", file: "hanif-idle.png", rawFile: "hanif-idle.png", scale: "1.0000 (Canonical Reference)", groundOffset: "Y=1500" },
  { id: "wave", name: "Wave", file: "hanif-wave.png", rawFile: "hanif-wave.png", scale: "0.8483", groundOffset: "Y=1500" },
  { id: "walk", name: "Walk", file: "hanif-walk.png", rawFile: "hanif-walk.png", scale: "0.8459", groundOffset: "Y=1500" },
  { id: "coding", name: "Coding", file: "hanif-code.png", rawFile: "hanif-code.png", scale: "0.8542", groundOffset: "Y=1500" },
  { id: "reading", name: "Reading", file: "hanif-read.png", rawFile: "hanif-read.png", scale: "0.8401", groundOffset: "Y=1500" },
  { id: "trophy", name: "Trophy", file: "hanif-trophy.png", rawFile: "hanif-trophy.png", scale: "0.8745", groundOffset: "Y=1500" },
  { id: "microphone", name: "Microphone", file: "hanif-microphone.png", rawFile: "hanif-microphone.png", scale: "0.8384", groundOffset: "Y=1499" },
  { id: "rocket", name: "Rocket", file: "hanif-rocket.png", rawFile: "hanif-rocket.png", scale: "1.0041", groundOffset: "Y=1500" },
  { id: "sleep", name: "Sleep", file: "hanif-sleep.png", rawFile: "hanif-sleep.png", scale: "0.9423 (Head Matched)", groundOffset: "Y=1499 (Resting Ground)" },
];

export default function PixelAssetsDevPage() {
  const [showBaseline, setShowBaseline] = useState(true);
  const [showCenterline, setShowCenterline] = useState(true);
  const [bgMode, setBgMode] = useState<"dark" | "checkerboard" | "black">("dark");
  const [cardSize, setCardSize] = useState<"sm" | "md" | "lg">("md");

  const sizeClasses = {
    sm: "w-32 h-32 sm:w-40 sm:h-40",
    md: "w-52 h-52 sm:w-64 sm:h-64",
    lg: "w-72 h-72 sm:w-80 sm:h-80",
  };

  return (
    <main className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-mono">
      {/* Header & Back link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
        <div className="space-y-1">
          <Link href="/">
            <PixelButton variant="secondary" size="sm">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </PixelButton>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] pt-2">
            PIXEL HANIF ASSET INSPECTOR // DEV PREVIEW
          </h1>
          <p className="text-xs text-[var(--color-muted)] font-sans">
            Phase 2A Normalization Quality Assurance: 1600x1600 Master Canvas, Bottom-Center Anchored, Scale Matched to Idle.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <PixelBadge variant="achievement" size="md">
            9/9 APPROVED STATES
          </PixelBadge>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[var(--color-primary)] font-bold">GUIDES &amp; OVERLAYS:</span>
          
          <button
            onClick={() => setShowBaseline((prev) => !prev)}
            className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors cursor-pointer"
          >
            {showBaseline ? <CheckSquare className="w-4 h-4 text-[var(--color-achievement)]" /> : <Square className="w-4 h-4" />}
            <span>Baseline Guide (Y=1500)</span>
          </button>

          <button
            onClick={() => setShowCenterline((prev) => !prev)}
            className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors cursor-pointer"
          >
            {showCenterline ? <CheckSquare className="w-4 h-4 text-[var(--color-primary)]" /> : <Square className="w-4 h-4" />}
            <span>Centerline (X=800)</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[var(--color-muted)]">BACKDROP:</span>
          <button
            onClick={() => setBgMode("dark")}
            className={cn("px-2 py-1 border text-[11px]", bgMode === "dark" ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-[var(--color-border)]")}
          >
            Dark
          </button>
          <button
            onClick={() => setBgMode("checkerboard")}
            className={cn("px-2 py-1 border text-[11px]", bgMode === "checkerboard" ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-[var(--color-border)]")}
          >
            Checkerboard
          </button>
          <button
            onClick={() => setBgMode("black")}
            className={cn("px-2 py-1 border text-[11px]", bgMode === "black" ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-[var(--color-border)]")}
          >
            Black
          </button>

          <span className="text-[var(--color-muted)] ml-2">ZOOM:</span>
          <button
            onClick={() => setCardSize("sm")}
            className={cn("px-2 py-1 border text-[11px]", cardSize === "sm" ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-[var(--color-border)]")}
          >
            Small
          </button>
          <button
            onClick={() => setCardSize("md")}
            className={cn("px-2 py-1 border text-[11px]", cardSize === "md" ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-[var(--color-border)]")}
          >
            Medium
          </button>
          <button
            onClick={() => setCardSize("lg")}
            className={cn("px-2 py-1 border text-[11px]", cardSize === "lg" ? "border-[var(--color-primary)] text-[var(--color-primary)]" : "border-[var(--color-border)]")}
          >
            Large
          </button>
        </div>
      </div>

      {/* Grid of All 9 Normalized Character States */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATES_DATA.map((item) => {
          const src = PET_STATE_ASSETS[item.id] || `/pet/${item.id}/${item.file}`;

          return (
            <div
              key={item.id}
              className="p-4 bg-[var(--color-surface)] border-2 border-[var(--color-border)] flex flex-col justify-between space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[var(--color-text)] uppercase tracking-wider">
                  {item.name}
                </span>
                <PixelBadge variant={item.id === "idle" ? "primary" : "secondary"} size="sm">
                  {item.id}
                </PixelBadge>
              </div>

              {/* Viewport Frame */}
              <div
                className={cn(
                  "relative mx-auto border-2 border-[var(--color-border)] overflow-hidden flex items-end justify-center",
                  sizeClasses[cardSize],
                  bgMode === "dark" && "bg-[#0B1020]",
                  bgMode === "black" && "bg-black",
                  bgMode === "checkerboard" && "bg-[linear-gradient(45deg,#1f293d_25%,transparent_25%),linear-gradient(-45deg,#1f293d_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f293d_75%),linear-gradient(-45deg,transparent_75%,#1f293d_75%)] bg-[size:16px_16px] bg-[#111827]"
                )}
              >
                {/* Character Image */}
                <Image
                  src={src}
                  alt={`Pixel Hanif ${item.name}`}
                  width={1600}
                  height={1600}
                  priority={item.id === "idle" || item.id === "wave"}
                  className="w-full h-full object-contain object-bottom pointer-events-none select-none"
                  style={{ imageRendering: "pixelated" }}
                />

                {/* Baseline Guide (Y=1500 on 1600 canvas -> ~93.75% from top) */}
                {showBaseline && (
                  <div
                    className="absolute left-0 right-0 border-b-2 border-dashed border-[#EF4444] pointer-events-none z-10 opacity-70"
                    style={{ top: "93.75%" }}
                    title="Baseline Ground Guide (Y=1500)"
                  />
                )}

                {/* Centerline Guide (X=800 on 1600 canvas -> 50% from left) */}
                {showCenterline && (
                  <div
                    className="absolute top-0 bottom-0 border-r-2 border-dashed border-[var(--color-primary)] pointer-events-none z-10 opacity-70"
                    style={{ left: "50%" }}
                    title="Centerline Guide (X=800)"
                  />
                )}

                {/* Coordinate tag */}
                <span className="absolute top-1 left-1 px-1 py-0.5 bg-black/60 text-[9px] text-[var(--color-muted)] font-mono">
                  1600x1600
                </span>
              </div>

              {/* Metadata Sub-bar */}
              <div className="pt-3 border-t border-[var(--color-border)]/60 text-[10px] space-y-1 text-[var(--color-muted)]">
                <div className="flex justify-between">
                  <span>SCALE:</span>
                  <span className="text-[var(--color-primary)] font-bold">{item.scale}</span>
                </div>
                <div className="flex justify-between">
                  <span>GROUND:</span>
                  <span className="text-[var(--color-achievement)]">{item.groundOffset}</span>
                </div>
                <div className="flex justify-between truncate">
                  <span>SOURCE:</span>
                  <span className="truncate max-w-[150px] text-[var(--color-text)]">{item.rawFile}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
