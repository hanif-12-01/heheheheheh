"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";

export interface PixelSectionTitleProps {
  number: string; // e.g. "01", "02"
  title: string;
  subtitle?: string;
  badge?: string;
  recruiterTitle?: string;
  recruiterSubtitle?: string;
  recruiterBadge?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}

export function PixelSectionTitle({
  number,
  title,
  subtitle,
  badge,
  recruiterTitle,
  recruiterSubtitle,
  recruiterBadge,
  align = "left",
  className,
  as: HeadingTag = "h2",
}: PixelSectionTitleProps) {
  const { mode } = usePortfolioMode();
  const displayTitle = mode === "recruiter" && recruiterTitle ? recruiterTitle : title;
  const displaySubtitle = mode === "recruiter" && recruiterSubtitle ? recruiterSubtitle : subtitle;
  const displayBadge = mode === "recruiter" && recruiterBadge ? recruiterBadge : badge;
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12 space-y-2",
        align === "center" ? "text-center mx-auto" : "text-left",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-[var(--color-primary)]",
          align === "center" && "justify-center"
        )}
      >
        <span className="px-1.5 py-0.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-primary)] font-bold">
          SEC {number}
        </span>
        <span className="text-[var(--color-muted)]">{"//"}</span>
        {displayBadge && (
          <span className="text-[var(--color-achievement)] font-semibold">
            [{displayBadge}]
          </span>
        )}
      </div>

      <HeadingTag className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight text-[var(--color-text)]">
        {displayTitle}
      </HeadingTag>

      {displaySubtitle && (
        <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-2xl font-sans">
          {displaySubtitle}
        </p>
      )}

      {/* Decorative accent notch */}
      <div
        className={cn(
          "flex items-center gap-1 pt-1",
          align === "center" && "justify-center"
        )}
      >
        <div className="w-8 h-1 bg-[var(--color-primary)]" />
        <div className="w-2 h-1 bg-[var(--color-blue)]" />
        <div className="w-2 h-1 bg-[var(--color-purple)]" />
        <div className="w-16 h-[1px] bg-[var(--color-border)]" />
      </div>
    </div>
  );
}
