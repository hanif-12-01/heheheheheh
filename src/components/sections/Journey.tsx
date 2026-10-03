import React from "react";
import { JOURNEY_LEVELS } from "@/data/journey";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { Map, Flag, CheckCircle2, Sparkles, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export function Journey() {
  const categoryVariantMap: Record<string, "primary" | "secondary" | "achievement" | "accent" | "blue"> = {
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

  return (
    <section
      id="journey"
      aria-label="The Journey"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      <PixelSectionTitle
        number="05"
        title="THE JOURNEY // ADVENTURE MAP"
        subtitle="Chronological RPG semester progression tracking organizational governance, research, and competition arcs."
        badge="LEVEL PROGRESSION"
      />

      <div className="relative space-y-12">
        {/* Vertical Journey Line connecting the levels */}
        <div
          className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-[var(--color-border)] hidden sm:block"
          aria-hidden="true"
        />

        {JOURNEY_LEVELS.map((level, idx) => {
          const isEven = idx % 2 === 0;
          const isCurrent = level.status === "current";
          const isLevel4 = level.semester === 4;

          return (
            <div
              key={level.semester}
              className={cn(
                "relative grid grid-cols-1 md:grid-cols-12 gap-6 items-start",
                isEven ? "md:text-left" : "md:text-left"
              )}
            >
              {/* Level Center Badge / Checkpoint Icon */}
              <div
                className={cn(
                  "hidden sm:flex absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 border-2 items-center justify-center font-mono font-bold text-xs select-none z-10",
                  isCurrent
                    ? "bg-[var(--color-primary)] text-[#0B1020] border-[var(--color-primary)] shadow-[0_0_12px_var(--color-primary)]"
                    : isLevel4
                    ? "bg-[var(--color-achievement)] text-[#0B1020] border-[var(--color-achievement)] shadow-[0_0_10px_var(--color-achievement)]"
                    : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)]"
                )}
                aria-hidden="true"
              >
                {isCurrent ? <Flag className="w-5 h-5" /> : `0${level.semester}`}
              </div>

              {/* Card Container Layout: alternating on desktop */}
              <div
                className={cn(
                  "md:col-span-12",
                  "flex flex-col",
                  isEven ? "md:items-start md:pr-[54%]" : "md:items-end md:pl-[54%]"
                )}
              >
                <PixelCard
                  className={cn(
                    "w-full space-y-4",
                    isLevel4 && "border-2 border-[var(--color-achievement)] shadow-[6px_6px_0px_0px_rgba(255,209,102,0.3)]",
                    isCurrent && "border-2 border-[var(--color-primary)] shadow-[6px_6px_0px_0px_rgba(93,228,199,0.3)]"
                  )}
                  variant={isLevel4 ? "achievement" : isCurrent ? "primary" : "default"}
                >
                  {/* Level Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[var(--color-primary)]">
                        LEVEL 0{level.semester}
                      </span>
                      <span className="text-[var(--color-muted)] font-mono text-xs">{"//"}</span>
                      <span className="font-mono text-xs text-[var(--color-muted)]">
                        Semester {level.semester}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCurrent && (
                        <PixelBadge variant="primary" size="sm">
                          <span className="w-1.5 h-1.5 bg-[var(--color-primary)] animate-pulse" />
                          CURRENT LEVEL
                        </PixelBadge>
                      )}
                      {isLevel4 && (
                        <PixelBadge variant="achievement" size="sm">
                          <Award className="w-3 h-3 inline mr-1" />
                          KEY COMPETITION ARC
                        </PixelBadge>
                      )}
                    </div>
                  </div>

                  {/* Level Title & Summary */}
                  <div>
                    <h3 className="font-mono text-lg font-bold text-[var(--color-text)]">
                      {level.title}
                    </h3>
                    {level.subtitle && (
                      <p className="font-mono text-xs text-[var(--color-blue)] mt-0.5">
                        {level.subtitle}
                      </p>
                    )}
                    {level.summary && (
                      <p className="mt-2 text-xs sm:text-sm text-[var(--color-muted)] font-sans leading-relaxed">
                        {level.summary}
                      </p>
                    )}
                  </div>

                  {/* Activity Checkpoints */}
                  <div className="space-y-2 pt-2 border-t border-[var(--color-border)]/60">
                    <span className="text-[10px] font-mono uppercase text-[var(--color-muted)] tracking-wider block">
                      ACTIVITIES &amp; MILESTONES:
                    </span>
                    <ul className="space-y-2">
                      {level.activities.map((act, actIdx) => (
                        <li
                          key={actIdx}
                          className={cn(
                            "p-2 border text-xs font-sans flex flex-col gap-1 transition-colors",
                            act.highlight
                              ? "bg-[var(--color-surface-secondary)] border-[var(--color-primary)]/50"
                              : "bg-[var(--color-background)] border-[var(--color-border)]"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className={cn(
                              "font-mono font-medium",
                              act.highlight ? "text-[var(--color-text)] font-semibold" : "text-[var(--color-muted)]"
                            )}>
                              {act.title}
                            </span>
                            <PixelBadge
                              variant={categoryVariantMap[act.category] || "secondary"}
                              size="sm"
                              className="shrink-0"
                            >
                              {act.category}
                            </PixelBadge>
                          </div>
                          {act.description && (
                            <p className="text-[11px] text-[var(--color-muted)] font-sans">
                              {act.description}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </PixelCard>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
