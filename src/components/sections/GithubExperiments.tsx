"use client";

import { AtelierExperiments } from "@/components/atelier/AtelierSections";

import { useLocalize } from "@/i18n/useTranslations";

import React from "react";
import { GITHUB_EXPERIMENTS } from "@/data/projects";
import { SITE_CONFIG } from "@/lib/constants";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelButton } from "@/components/pixel/PixelButton";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { GitBranch, ExternalLink, Terminal } from "lucide-react";

export function GithubExperiments() {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();
  const isRecruiter = mode === "recruiter";

  if (mode === "recruiter") return <AtelierExperiments />;

  if (!isRecruiter) {
    return localize((
      <section id="experiments" aria-labelledby="experiments-title" className="world-chapter experiments-chapter">
        <div className="world-container chapter-content">
          <header className="chapter-heading">
            <p className="chapter-eyebrow">10 / SMALL EXPERIMENTS</p>
            <h2 id="experiments-title">A few things from the lab bench.</h2>
            <p>Coursework explorations, algorithmic testbeds, and academic laboratory prototypes.</p>
          </header>
          <div className="experiment-list">
            {GITHUB_EXPERIMENTS.map((experiment, index) => (
              <article key={experiment.slug} aria-labelledby={`experiment-${experiment.slug}`} className="experiment-row">
                <span className="experiment-row__number" aria-hidden="true">0{index + 1}</span>
                <div><p className="chapter-eyebrow">{experiment.status} / {experiment.year}</p><h3 id={`experiment-${experiment.slug}`}>{experiment.title}</h3><p>{experiment.shortDescription}</p><ul className="experiment-row__tech" aria-label={`${experiment.title} technologies`}>{experiment.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
                {experiment.githubUrl ? <a href={experiment.githubUrl} target="_blank" rel="noopener noreferrer" className="chapter-link" aria-label={`Open ${experiment.title} repository (opens in new tab)`}>View repository <span aria-hidden="true">↗</span></a> : <span className="experiment-row__unavailable">Coursework record</span>}
              </article>
            ))}
          </div>
          <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="chapter-link experiment-profile" aria-label="Open M. Hanif Al Faiz GitHub profile (opens in new tab)">Explore my GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    ));
  }
  return null;
}
