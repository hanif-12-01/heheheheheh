import React from "react";
import { GITHUB_EXPERIMENTS } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelButton } from "@/components/pixel/PixelButton";
import { GitBranch, ExternalLink, Terminal } from "lucide-react";

export function GithubExperiments() {
  return (
    <section
      id="experiments"
      aria-label="GitHub Experiments"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <PixelSectionTitle
          number="10"
          title="MORE GITHUB EXPERIMENTS"
          subtitle="Coursework explorations, algorithmic testbeds, and academic laboratory prototypes."
          badge="LAB BENCH"
          className="mb-0"
        />

        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start md:self-end"
        >
          <PixelButton variant="secondary" size="sm">
            <GitBranch className="w-4 h-4" />
            <span>Open GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </PixelButton>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {GITHUB_EXPERIMENTS.map((exp) => (
          <PixelCard key={exp.slug} className="flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Terminal className="w-4 h-4 text-[var(--color-primary)]" />
                <PixelBadge variant="outline" size="sm">
                  {exp.status}
                </PixelBadge>
              </div>

              <h3 className="font-mono text-sm font-bold text-[var(--color-text)]">
                {exp.title}
              </h3>

              <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                {exp.shortDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--color-border)]/60">
              {exp.technologies.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono px-1.5 py-0.5 bg-[var(--color-background)] text-[var(--color-muted)] border border-[var(--color-border)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </PixelCard>
        ))}
      </div>
    </section>
  );
}
