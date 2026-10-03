import React from "react";
import { RESEARCH_COMPETITIONS_DATA } from "@/data/researchCompetitions";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { FlaskConical, Award, Presentation, Code, Globe2 } from "lucide-react";

export function ResearchCompetitions() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Research":
      case "PKM":
        return <FlaskConical className="w-4 h-4 text-[var(--color-primary)]" />;
      case "Public Speaking":
        return <Presentation className="w-4 h-4 text-[#F43F5E]" />;
      case "Smart City":
        return <Globe2 className="w-4 h-4 text-[var(--color-blue)]" />;
      case "Hackathon":
        return <Code className="w-4 h-4 text-[var(--color-purple)]" />;
      default:
        return <Award className="w-4 h-4 text-[var(--color-achievement)]" />;
    }
  };

  return (
    <section
      id="research"
      aria-label="Research and Competitions"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      <PixelSectionTitle
        number="08"
        title="RESEARCH &amp; COMPETITIONS // ARENA"
        subtitle="Dedicated catalogue of faculty academic research, national hackathons, and symposium presentations."
        badge="INNOVATION ARC"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {RESEARCH_COMPETITIONS_DATA.map((item) => (
          <PixelCard
            key={item.id}
            className="flex flex-col justify-between space-y-3 p-4"
            variant={item.status === "Podium" ? "achievement" : "default"}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
                    {getCategoryIcon(item.category)}
                  </span>
                  <span className="font-mono text-xs text-[var(--color-muted)] uppercase">
                    {item.category}
                  </span>
                </div>
                <PixelBadge
                  variant={
                    item.status === "Podium"
                      ? "achievement"
                      : item.status === "Finalist"
                      ? "primary"
                      : "outline"
                  }
                  size="sm"
                >
                  {item.status}
                </PixelBadge>
              </div>

              <h3 className="font-mono text-sm sm:text-base font-bold text-[var(--color-text)]">
                {item.title}
              </h3>

              <div className="text-xs font-mono text-[var(--color-primary)]">
                {item.role} • {item.event} ({item.year})
              </div>

              {item.highlight && (
                <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                  {item.highlight}
                </p>
              )}
            </div>
          </PixelCard>
        ))}
      </div>
    </section>
  );
}
