"use client";

import React, { useState } from "react";
import { ACHIEVEMENTS_DATA } from "@/data/achievements";
import { Achievement } from "@/types/achievement";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelModal } from "@/components/pixel/PixelModal";
import { PixelButton } from "@/components/pixel/PixelButton";
import { Trophy, Award, Star, CheckCircle, ExternalLink } from "lucide-react";

export function TrophyRoom() {
  const [selectedTrophy, setSelectedTrophy] = useState<Achievement | null>(null);

  const getTrophyIcon = (category?: string) => {
    switch (category) {
      case "competition":
        return <Trophy className="w-6 h-6 text-[var(--color-achievement)]" />;
      case "startup":
        return <Award className="w-6 h-6 text-[var(--color-achievement)]" />;
      case "grant":
        return <Star className="w-6 h-6 text-[var(--color-achievement)]" />;
      default:
        return <CheckCircle className="w-6 h-6 text-[var(--color-achievement)]" />;
    }
  };

  return (
    <section
      id="trophies"
      aria-label="Trophy Room"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      <PixelSectionTitle
        number="06"
        title="TROPHY ROOM // ACHIEVEMENTS"
        subtitle="National competition podiums, startup acceleration milestones, and verified grant funding awards."
        badge="HONORS"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS_DATA.map((trophy) => (
          <PixelCard
            key={trophy.id}
            variant="achievement"
            className="flex flex-col justify-between cursor-pointer group"
            onClick={() => setSelectedTrophy(trophy)}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 border-2 border-[var(--color-achievement)] bg-[var(--color-surface-secondary)] flex items-center justify-center shadow-[3px_3px_0px_0px_#0B1020] group-hover:scale-105 transition-transform">
                  {getTrophyIcon(trophy.category)}
                </div>
                <PixelBadge variant="achievement" size="sm">
                  {trophy.year}
                </PixelBadge>
              </div>

              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-achievement)] font-bold block">
                  {trophy.result}
                </span>
                <h3 className="font-mono text-sm sm:text-base font-bold text-[var(--color-text)] mt-1">
                  {trophy.title}
                </h3>
                {trophy.organizer && (
                  <p className="text-xs text-[var(--color-muted)] font-mono mt-1">
                    {trophy.organizer}
                  </p>
                )}
              </div>

              <p className="text-xs text-[var(--color-muted)] font-sans line-clamp-2">
                {trophy.description}
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-primary)]">
              <span>INSPECT_TROPHY</span>
              <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
            </div>
          </PixelCard>
        ))}
      </div>

      {/* Trophy Detail Modal */}
      {selectedTrophy && (
        <PixelModal
          isOpen={!!selectedTrophy}
          onClose={() => setSelectedTrophy(null)}
          title={`TROPHY_LOG // ${selectedTrophy.result}`}
        >
          <div className="space-y-4 font-mono">
            <div className="flex items-center gap-3 p-3 bg-[var(--color-background)] border border-[var(--color-achievement)]">
              <div className="p-2 bg-[var(--color-surface)] border border-[var(--color-achievement)]">
                {getTrophyIcon(selectedTrophy.category)}
              </div>
              <div>
                <span className="text-xs text-[var(--color-achievement)] font-bold">
                  {selectedTrophy.result}
                </span>
                <h4 className="text-sm font-bold text-[var(--color-text)]">
                  {selectedTrophy.title}
                </h4>
                {selectedTrophy.organizer && (
                  <p className="text-[11px] text-[var(--color-muted)]">
                    {selectedTrophy.organizer} • {selectedTrophy.year}
                  </p>
                )}
              </div>
            </div>

            <div className="p-3 bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
              <span className="text-[10px] text-[var(--color-primary)] uppercase block mb-1">
                DESCRIPTION:
              </span>
              <p className="text-xs text-[var(--color-text)] font-sans leading-relaxed">
                {selectedTrophy.description}
              </p>
            </div>

            {selectedTrophy.relatedProject && (
              <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] text-xs flex items-center justify-between">
                <span className="text-[var(--color-muted)]">LINKED PROJECT:</span>
                <a
                  href={`/projects/${selectedTrophy.relatedProject}`}
                  className="text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 font-bold"
                >
                  <span>View Case Study</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <PixelButton
                variant="secondary"
                size="sm"
                onClick={() => setSelectedTrophy(null)}
              >
                Close Trophy
              </PixelButton>
            </div>
          </div>
        </PixelModal>
      )}
    </section>
  );
}
