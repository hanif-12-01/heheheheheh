"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelWindow } from "@/components/pixel/PixelWindow";
import { ProjectPreviewViewport } from "@/components/projects/ProjectPreviewViewport";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { ArrowLeft, ExternalLink, Award, CheckCircle2, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const { mode } = usePortfolioMode();
  const isSimulation = project.slug === "purwokerto-intelligence-layer" || project.slug === "bernas-mbg";

  return (
    <article className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8 font-mono">
      {/* Back button — direct link, no nested button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all duration-75 select-none bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-secondary)] border-2 border-[var(--color-border)] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Back to Projects Directory"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Case Study Header Window */}
      <PixelWindow
        title={mode === "recruiter" ? `CASE STUDY // ${project.title.toUpperCase()}` : `PROJECT_SPEC // ${project.slug.toUpperCase()}`}
        statusBadge={project.status?.toUpperCase() || "ACTIVE"}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {project.categories.map((cat) => (
              <PixelBadge key={cat} variant="primary" size="md">
                {cat}
              </PixelBadge>
            ))}
            {project.year && (
              <PixelBadge variant="outline" size="md">
                YEAR: {project.year}
              </PixelBadge>
            )}
            {isSimulation && (
              <span className="px-2 py-0.5 bg-[var(--color-background)] border border-[var(--color-achievement)] text-[var(--color-achievement)] font-mono text-xs font-bold uppercase shadow-[2px_2px_0px_0px_#0B1020]">
                SIMULATED DATA
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--color-text)]">
            {project.title}
          </h1>

          {project.achievement && (
            <div className="p-3 bg-[var(--color-background)] border-2 border-[var(--color-achievement)] text-[var(--color-achievement)] flex items-center gap-2 text-xs sm:text-sm font-bold shadow-[2px_2px_0px_0px_#0B1020]">
              <Award className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{project.achievement}</span>
            </div>
          )}

          <p className="text-sm sm:text-base text-[var(--color-muted)] font-sans leading-relaxed">
            {project.longDescription || project.shortDescription}
          </p>

          {/* Action Links — direct links, no nested buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 font-mono text-sm font-bold uppercase transition-all duration-75 select-none bg-[var(--color-primary)] text-[#0B1020] hover:brightness-110 border-2 border-[var(--color-primary)] shadow-[3px_3px_0px_0px_#0B1020] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                aria-label={`Open ${project.title} repository on GitHub (opens in new tab)`}
              >
                <GithubIcon className="w-4 h-4" aria-hidden="true" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 font-mono text-sm font-bold uppercase transition-all duration-75 select-none bg-[var(--color-achievement)] text-[#0B1020] hover:brightness-110 border-2 border-[var(--color-achievement)] shadow-[3px_3px_0px_0px_#0B1020] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                aria-label={`Open ${project.title} live prototype (opens in new tab)`}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>Live Prototype</span>
              </a>
            )}
          </div>
        </div>
      </PixelWindow>

      {/* Honest Intentional Screenshot / Viewport Stage */}
      <div className="border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)]">
        <ProjectPreviewViewport
          slug={project.slug}
          title={project.title}
          image={project.image}
          screenshot={project.screenshot}
          simulationDisclosure={isSimulation}
          statusText={project.status?.toUpperCase() || "ACTIVE"}
          aspectRatio="video"
        />
      </div>

      {/* Highlights & Architecture Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.keyHighlights && project.keyHighlights.length > 0 && (
          <PixelCard className="space-y-4">
            <h2 className="font-mono text-xs uppercase font-bold text-[var(--color-primary)] tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>KEY HIGHLIGHTS &amp; MILESTONES</span>
            </h2>
            <ul className="space-y-2 text-xs font-sans">
              {project.keyHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2 text-[var(--color-text)]">
                  <span className="text-[var(--color-primary)] font-mono font-bold" aria-hidden="true">&gt;</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </PixelCard>
        )}

        {project.architectureNotes && project.architectureNotes.length > 0 && (
          <PixelCard className="space-y-4">
            <h2 className="font-mono text-xs uppercase font-bold text-[var(--color-blue)] tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>SYSTEM ARCHITECTURE NOTES</span>
            </h2>
            <ul className="space-y-2 text-xs font-sans">
              {project.architectureNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-[var(--color-text)]">
                  <span className="text-[var(--color-blue)] font-mono font-bold" aria-hidden="true">&gt;</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </PixelCard>
        )}
      </div>

      {/* Technology Stack Inventory */}
      <PixelCard className="space-y-3">
        <h2 className="font-mono text-xs uppercase font-bold text-[var(--color-muted)] tracking-wider">
          TECHNOLOGY STACK
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2.5 py-1 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
            >
              {t}
            </span>
          ))}
        </div>
      </PixelCard>
    </article>
  );
}
