"use client";

import React from "react";
import Image from "next/image";
import { usePixelPet } from "@/hooks/usePixelPet";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { PetSpeechBubble } from "./PetSpeechBubble";
import { PET_STATE_ASSETS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PixelHanifPet() {
  const { state, isVisible, clickCount, triggerClick, dialogue, clearDialogue } =
    usePixelPet();
  const prefersReducedMotion = useReducedMotion();
  const { mode } = usePortfolioMode();

  // If hidden by user, or in recruiter mode, do not render floating pet
  if (!isVisible || mode === "recruiter") {
    return null;
  }

  const assetSrc = PET_STATE_ASSETS[state] || PET_STATE_ASSETS.idle;
  const isInitialState = state === "idle" || state === "wave";

  return (
    <aside
      aria-label="Pixel Hanif Companion"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto select-none"
    >
      {/* Speech Bubble */}
      {dialogue && (
        <PetSpeechBubble message={dialogue} onDismiss={clearDialogue} />
      )}

      {/* Pet Interactive Frame & Viewport */}
      <button
        type="button"
        onClick={triggerClick}
        aria-label={`Pixel Hanif companion, current action: ${state}. Click for dialogue.`}
        title={`Pixel Hanif (${state}) - Click me! (${clickCount} clicks)`}
        className={cn(
          "group relative flex items-end justify-center cursor-pointer",
          "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32",
          "bg-[var(--color-surface)]/80 backdrop-blur-xs border-2 border-[var(--color-primary)]",
          "shadow-[4px_4px_0px_0px_#0B1020]",
          "transition-all duration-150 active:translate-y-1",
          "p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        )}
      >
        {/* Character Illustration Stage */}
        <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
          <Image
            key={state}
            src={assetSrc}
            alt={`Pixel Hanif in ${state} pose`}
            width={1600}
            height={1600}
            priority={isInitialState}
            className={cn(
              "w-full h-full object-contain object-bottom pointer-events-none select-none",
              !prefersReducedMotion && "animate-in fade-in duration-200"
            )}
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* State Tag Badge */}
        <span
          className="absolute -bottom-2 right-1 px-1.5 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[8px] font-mono text-[var(--color-primary)] font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]"
          aria-hidden="true"
        >
          {state}
        </span>

        {/* Corner pixel dots */}
        <div className="absolute top-0 right-0 w-1 h-1 bg-[var(--color-primary)]" />
        <div className="absolute top-0 left-0 w-1 h-1 bg-[var(--color-primary)]" />
        <div className="absolute bottom-0 left-0 w-1 h-1 bg-[var(--color-primary)]" />
      </button>
    </aside>
  );
}
