"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { ProjectPreviewViewport } from "@/components/projects/ProjectPreviewViewport";
import { techAssets, journeyAssets, uiAssets } from "@/data/worldAssets";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { ExternalLink, ArrowRight, Award, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  className?: string;
}

/**
 * Returns optional domain decoration asset for secondary builds.
 * Strict credibility rule: These are small decorative accents only,
 * NEVER placed inside the screenshot viewport.
 */
function getProjectDomainAccent(slug: string) {
  switch (slug) {
    case "wattwise-ai":
      return techAssets.aiChip;
    case "purwokerto-intelligence-layer":
      return techAssets.smartCity;
    case "simobs-bengkel":
      return techAssets.codeEditor;
    case "lapor-mangan":
      return techAssets.gisMap;
    case "bernas-mbg":
      return techAssets.server;
    case "ai-course-project":
      return journeyAssets.researchFlask;
    case "sorting-algorithm-visualizer":
      return techAssets.codeEditor;
    case "computational-logic-sim":
      return journeyAssets.researchFlask;
    case "micro-network-probe":
      return techAssets.server;
    default:
      return null;
  }
}

/**
 * Returns formatted status label matching verified data.
 */
function getFormattedStatus(status?: string, slug?: string): string {
  if (slug === "bernas-mbg") return "PROOF OF CONCEPT";
  if (slug === "ai-course-project") return "COURSEWORK / AI";
  if (slug === "simobs-bengkel") return "PROTOTYPE";
  if (slug === "lapor-mangan") return "PROTOTYPE";
  if (status === "experiment") return "LAB EXPERIMENT";
  if (status === "active") return "ACTIVE";
  if (status === "completed") return "COMPLETED";
  return status?.toUpperCase() || "PROTOTYPE";
}

/**
 * Concise micro-tag explaining technical essence without hype.
 */
function getTechnicalMicroTag(slug: string): string | null {
  switch (slug) {
    case "simobs-bengkel":
      return "DUAL FRONTEND // LARAVEL SANCTUM API";
    case "lapor-mangan":
      return "HAVERSINE DISTANCE // OPEN-METEO WEATHER";
    case "bernas-mbg":
      return "MULTI-ROLE DASHBOARD PoC // SIMULATED STATE";
    case "ai-course-project":
      return "FROM-SCRATCH PYTHON // MAMDANI & SUGENO";
    default:
      return null;
  }
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const domainAccent = getProjectDomainAccent(project.slug);
  const statusLabel = getFormattedStatus(project.status, project.slug);
  const microTag = getTechnicalMicroTag(project.slug);
  const isSimulation = project.slug === "purwokerto-intelligence-layer" || project.slug === "bernas-mbg";

  // Display top 4 technologies for compact scannability
  const displayTechnologies = project.technologies.slice(0, 4);

  return (
    <article
      className={cn(
        "relative flex flex-col justify-between border-2 border-[var(--color-border)] bg-[var(--color-surface)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all duration-100 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)] overflow-hidden",
        project.achievement ? "border-[var(--color-border)]" : "",
        className
      )}
      aria-labelledby={`project-title-${project.slug}`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border)] select-none">
        <div className="flex items-center gap-2 truncate">
          {domainAccent && (
            <div className="w-5 h-5 shrink-0 relative flex items-center justify-center">
              <Image
                src={domainAccent.src}
                alt=""
                width={20}
                height={20}
                className="w-4 h-4 object-contain"
                style={{ imageRendering: "pixelated", width: "auto", height: "auto" }}
                aria-hidden="true"
                unoptimized
              />
            </div>
          )}
          <span className="font-mono text-[10px] uppercase font-bold text-[var(--color-text)] truncate">
            {project.categories[0] || "BUILD"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {isSimulation && (
            <span className="px-1.5 py-0.5 bg-[var(--color-background)] border border-[var(--color-achievement)] text-[var(--color-achievement)] font-mono text-[8px] font-bold uppercase">
              MOCK DATA
            </span>
          )}
          <span className="px-1.5 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] font-mono text-[9px] text-[var(--color-muted)] uppercase">
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Honest Viewport Placeholder Area */}
      <div className="p-3">
        <ProjectPreviewViewport
          slug={project.slug}
          title={project.title}
          image={project.image}
          screenshot={project.screenshot}
          simulationDisclosure={isSimulation}
          statusText={statusLabel}
          aspectRatio="video"
        />
      </div>

      {/* Project Details */}
      <div className="p-4 pt-1 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Micro Technical Highlight Tag */}
          {microTag && (
            <span className="inline-block text-[9px] font-mono text-[var(--color-primary)] font-semibold tracking-wider">
              &gt; {microTag}
            </span>
          )}

          {/* Title */}
          <h3
            id={`project-title-${project.slug}`}
            className="font-mono text-base sm:text-lg font-bold text-[var(--color-text)] leading-snug"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-[var(--color-primary)] transition-colors inline-block"
            >
              {project.title}
            </Link>
          </h3>

          {/* Exact Verified Achievement if present */}
          {project.achievement && (
            <div className="p-2 bg-[var(--color-background)] border border-[var(--color-achievement)] text-[var(--color-achievement)] flex items-center gap-1.5 text-[11px] font-mono font-bold">
              <Trophy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{project.achievement}</span>
            </div>
          )}

          {/* Factual Short Description */}
          <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="pt-2">
          <div className="flex flex-wrap gap-1">
            {displayTechnologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text)]"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 text-[var(--color-muted)]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Direct Interactive Actions — Strict: Explicit links, no whole-card clickable div, no nested buttons */}
      <div className="px-4 py-3 bg-[var(--color-surface-secondary)] border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 font-bold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
          aria-label={`View ${project.title} case study`}
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-muted)] hover:text-[var(--color-text)] inline-flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]"
            aria-label={`Open ${project.title} repository on GitHub (opens in new tab)`}
          >
            <GithubIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span>GitHub ↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
