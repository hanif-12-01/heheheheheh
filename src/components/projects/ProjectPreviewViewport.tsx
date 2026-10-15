"use client";

import { useLocalize } from "@/i18n/useTranslations";

import React from "react";
import Image from "next/image";
import {
  Terminal,
  Layers,
  Zap,
  MapPin,
  Utensils,
  ShieldCheck,
  CloudRain,
  Binary,
} from "lucide-react";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { MEDIA_CONFIG } from "@/lib/mediaConfig";
import { cn } from "@/lib/utils";

interface ProjectIconicMetadata {
  Icon: React.ElementType;
  pixelArtSrc?: string;
  domainName: string;
  stackBadge: string;
}

const PROJECT_ICONIC_MAP: Record<string, ProjectIconicMetadata> = {
  "wattwise-ai": {
    Icon: Zap,
    pixelArtSrc: "/pixel/tech/tech-ai-chip.webp",
    domainName: "ENERGY FORECASTING & AUDIT",
    stackBadge: "N-BEATS ONNX · OCR METER SCANNER",
  },
  "civictwin-semarang": {
    Icon: MapPin,
    pixelArtSrc: "/pixel/tech/tech-smart-city.webp",
    domainName: "SEMARANG CIVIC INTELLIGENCE",
    stackBadge: "REACT · LEAFLET · RULE-BASED POLICY SIMULATION",
  },
  "purwokerto-intelligence-layer": {
    Icon: MapPin,
    pixelArtSrc: "/pixel/tech/tech-gis-map.webp",
    domainName: "GEOSPATIAL CIVIC INTELLIGENCE",
    stackBadge: "LEAFLET GIS · MCDM POLICY ENGINE",
  },
  "lapor-mangan": {
    Icon: Utensils,
    pixelArtSrc: "/pixel/tech/tech-smart-city.webp",
    domainName: "LOCAL CULINARY PROXIMITY & ASSISTANT",
    stackBadge: "HAVERSINE GPS · OPEN-METEO API · MAKANBOT",
  },
  "bernas-mbg": {
    Icon: ShieldCheck,
    pixelArtSrc: "/pixel/tech/tech-database.webp",
    domainName: "NUTRITIONAL LOGISTICS OVERSIGHT",
    stackBadge: "6-ROLE DASHBOARD · LOCAL STATE SYNC",
  },
  "ai-course-project": {
    Icon: CloudRain,
    pixelArtSrc: "/pixel/tech/tech-server.webp",
    domainName: "FUZZY RAIN RISK INFERENCE MODEL",
    stackBadge: "MAMDANI & SUGENO ENGINES FROM SCRATCH",
  },
  "sorting-algorithm-visualizer": {
    Icon: Binary,
    pixelArtSrc: "/pixel/tech/tech-code-editor.webp",
    domainName: "ALGORITHMIC SORTING TRAVERSAL",
    stackBadge: "C++ · RECURSION · TIME COMPLEXITY",
  },
  "computational-logic-sim": {
    Icon: Layers,
    pixelArtSrc: "/pixel/tech/tech-server.webp",
    domainName: "PROPOSITIONAL LOGIC SOLVER",
    stackBadge: "PYTHON · TRUTH TABLE VALIDATOR",
  },
  "micro-network-probe": {
    Icon: Layers,
    pixelArtSrc: "/pixel/tech/tech-server.webp",
    domainName: "SOCKET CLIENT-PROXY NETWORK",
    stackBadge: "C · TCP SOCKETS · PACKET FORWARDING",
  },
};

export interface ProjectPreviewViewportProps {
  slug: string;
  title: string;
  image?: string;
  screenshot?: string;
  simulationDisclosure?: boolean;
  statusText?: string;
  aspectRatio?: "video" | "wide";
  className?: string;
}

export function ProjectPreviewViewport({
  slug,
  title,
  image,
  screenshot,
  simulationDisclosure,
  statusText,
  aspectRatio = "video",
  className,
}: ProjectPreviewViewportProps) {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();
  const configuredMedia = MEDIA_CONFIG.projectScreenshots?.[slug];
  const actualSource = screenshot || image || configuredMedia?.src;
  const actualAlt = configuredMedia?.alt || `Interface screenshot of ${title}`;

  // If a screenshot asset is explicitly supplied, render it directly
  if (actualSource) {
    return localize((
      <div
        className={cn(
          "relative w-full overflow-hidden border-2 border-[var(--color-border)] bg-[var(--color-background)]",
          aspectRatio === "video" ? "aspect-video" : "aspect-[16/10]",
          className
        )}
      >
        <Image
          src={actualSource}
          alt={actualAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {statusText && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[var(--color-background)]/90 border border-[var(--color-border)] font-mono text-[10px] text-[var(--color-text)]">
            {statusText}
          </div>
        )}
      </div>
    ));
  }

  // Iconic System Architecture Visualizer (Owner-Specified Preview Presentation)
  const iconicInfo = PROJECT_ICONIC_MAP[slug] || {
    Icon: Layers,
    pixelArtSrc: "/pixel/tech/tech-server.webp",
    domainName: "SOFTWARE SYSTEM ARCHITECTURE",
    stackBadge: "VERIFIED SOURCE CODE IMPLEMENTATION",
  };
  const IconComponent = iconicInfo.Icon;

  return localize((
    <div
      className={cn(
        "relative w-full border-2 border-[var(--color-border)] bg-[var(--color-background)] flex flex-col overflow-hidden select-none",
        aspectRatio === "video" ? "aspect-video" : "aspect-[16/10]",
        className
      )}
      role="region"
      aria-label={`Architecture schematic preview for ${title}`}
    >
      {/* Window Frame Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[var(--color-surface)] border-b border-[var(--color-border)] text-[10px] font-mono text-[var(--color-muted)]">
        <div className="flex items-center gap-1.5 truncate">
          <Terminal className="w-3 h-3 text-[var(--color-primary)] shrink-0" aria-hidden="true" />
          <span className="font-bold text-[var(--color-text)] uppercase tracking-wider truncate">
            {mode === "recruiter" ? `SCHEMATIC // ${title.toUpperCase()}` : `VIEWPORT // ${slug}`}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-2" aria-hidden="true">
          <span className="w-2 h-2 bg-[var(--color-border)] inline-block" />
          <span className="w-2 h-2 bg-[var(--color-achievement)] inline-block" />
          <span className="w-2 h-2 bg-[var(--color-primary)] inline-block" />
        </div>
      </div>

      {/* Viewport Interior with Grid and Scanlines */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-4 sm:p-5 text-center pixel-grid-pattern overflow-hidden">
        {mode === "pixel" && (
          <div
            className="absolute inset-0 pixel-scanlines opacity-20 pointer-events-none"
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 flex flex-col items-center justify-center space-y-2 max-w-sm px-3">
          {/* Project Specific Icon / Pixel Art */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 border-2 border-[var(--color-primary)] bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-primary)] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] relative">
            {mode === "pixel" && iconicInfo.pixelArtSrc ? (
              <Image
                src={iconicInfo.pixelArtSrc}
                alt=""
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
                style={{ imageRendering: "pixelated" }}
                aria-hidden="true"
                unoptimized
              />
            ) : (
              <IconComponent className="w-6 h-6 text-[var(--color-primary)]" aria-hidden="true" />
            )}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--color-achievement)]" aria-hidden="true" />
          </div>

          <div className="space-y-0.5 text-center">
            <span className="font-mono text-xs sm:text-sm font-bold text-[var(--color-text)] uppercase tracking-wider block">
              {title}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-[var(--color-primary)] font-semibold uppercase tracking-wide block">
              {iconicInfo.domainName}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1">
            <span className="text-[9px] font-mono px-2 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)]">
              {iconicInfo.stackBadge}
            </span>
          </div>

          {simulationDisclosure ? (
            <span className="text-[9px] font-mono text-[var(--color-achievement)]">
              ACADEMIC PROTOTYPE // SIMULATED DATASETS
            </span>
          ) : (
            <span className="text-[9px] font-mono text-[var(--color-muted)]">
              {statusText ? `STATUS: ${statusText}` : "VERIFIED SOURCE CODE ARCHITECTURE"}
            </span>
          )}
        </div>
      </div>
    </div>
  ));
}
