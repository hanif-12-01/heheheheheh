import React from "react";
import { cn } from "@/lib/utils";

export interface PixelSectionTitleProps {
  number: string; // e.g. "01", "02"
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
}

export function PixelSectionTitle({
  number,
  title,
  subtitle,
  badge,
  align = "left",
  className,
}: PixelSectionTitleProps) {
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
        {badge && (
          <span className="text-[var(--color-achievement)] font-semibold">
            [{badge}]
          </span>
        )}
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono tracking-tight text-[var(--color-text)]">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-2xl font-sans">
          {subtitle}
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
