import React from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelButton } from "@/components/pixel/PixelButton";
import { PixelWindow } from "@/components/pixel/PixelWindow";
import { ArrowLeft, ExternalLink, Award, CheckCircle2, Layers } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";

export function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8 font-mono">
      {/* Back button */}
      <div>
        <Link href="/projects">
          <PixelButton variant="secondary" size="sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </PixelButton>
        </Link>
      </div>

      {/* Case Study Header Window */}
      <PixelWindow
        title={`PROJECT_SPEC // ${project.slug.toUpperCase()}`}
        statusBadge={project.status?.toUpperCase() || "ACTIVE"}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
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
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-mono tracking-tight text-[var(--color-text)]">
            {project.title}
          </h1>

          {project.achievement && (
            <div className="p-3 bg-[var(--color-background)] border-2 border-[var(--color-achievement)] text-[var(--color-achievement)] flex items-center gap-2 text-xs sm:text-sm font-bold shadow-[2px_2px_0px_0px_#0B1020]">
              <Award className="w-5 h-5 shrink-0" />
              <span>{project.achievement}</span>
            </div>
          )}

          <p className="text-sm sm:text-base text-[var(--color-muted)] font-sans leading-relaxed">
            {project.longDescription || project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <PixelButton variant="primary" size="md">
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </PixelButton>
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <PixelButton variant="accent" size="md">
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Prototype</span>
                </PixelButton>
              </a>
            )}
          </div>
        </div>
      </PixelWindow>

      {/* Screenshot Stage Placeholder */}
      <div className="border-2 border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)]">
        <div className="relative aspect-video w-full bg-[var(--color-background)] border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center p-6 text-center select-none">
          <Layers className="w-12 h-12 text-[var(--color-border)] mb-3" />
          <span className="font-mono text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider">
            PRIMARY SYSTEM SCREENSHOT PLACEHOLDER
          </span>
          <span className="font-mono text-xs text-[var(--color-muted)] mt-1">
            Target asset: public/projects/{project.slug}/preview.webp
          </span>
          <p className="text-xs text-[var(--color-muted)] font-sans mt-3 max-w-md">
            Phase 1 architectural placeholder. High-fidelity pixel UI captures will be integrated in Phase 2.
          </p>
        </div>
      </div>

      {/* Highlights & Architecture Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.keyHighlights && (
          <PixelCard className="space-y-4">
            <h2 className="font-mono text-xs uppercase font-bold text-[var(--color-primary)] tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>KEY HIGHLIGHTS &amp; MILESTONES</span>
            </h2>
            <ul className="space-y-2 text-xs font-sans">
              {project.keyHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2 text-[var(--color-text)]">
                  <span className="text-[var(--color-primary)] font-mono font-bold">&gt;</span>
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </PixelCard>
        )}

        {project.architectureNotes && (
          <PixelCard className="space-y-4">
            <h2 className="font-mono text-xs uppercase font-bold text-[var(--color-blue)] tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE NOTES</span>
            </h2>
            <ul className="space-y-2 text-xs font-sans">
              {project.architectureNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-2 text-[var(--color-text)]">
                  <span className="text-[var(--color-blue)] font-mono font-bold">&gt;</span>
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
