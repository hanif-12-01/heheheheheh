"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { ProjectPreviewViewport } from "@/components/projects/ProjectPreviewViewport";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { techAssets } from "@/data/worldAssets";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { ArrowRight, ExternalLink, Trophy, Award, Sparkles, ShieldCheck } from "lucide-react";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { cn } from "@/lib/utils";

export interface FeaturedProjectCardProps {
  project: Project;
  tier: "primary" | "civic";
  className?: string;
}

export function FeaturedProjectCard({
  project,
  tier,
  className,
}: FeaturedProjectCardProps) {
  const { mode } = usePortfolioMode();
  const isRecruiter = mode === "recruiter";
  const isPrimary = tier === "primary";
  const domainAsset = isPrimary ? techAssets.aiChip : techAssets.smartCity;
  const isSimulation = project.slug === "purwokerto-intelligence-layer";

  // Curated, concise technologies for featured display
  const curatedTechnologies = isPrimary
    ? ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle ORM", "ONNX Runtime Web", "Tesseract.js"]
    : ["React", "TypeScript", "Leaflet", "Vite", "React Router"];

  const statusLabel = isPrimary
    ? "WORKING MVP"
    : "ACADEMIC PROTOTYPE";

  return (
    <article
      className={cn(
        "relative border-2 bg-[var(--color-surface)] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-150",
        isPrimary
          ? "border-[var(--color-primary)] shadow-[6px_6px_0px_0px_rgba(93,228,199,0.25)]"
          : "border-[var(--color-blue)] shadow-[6px_6px_0px_0px_rgba(90,169,255,0.25)]",
        className
      )}
      aria-labelledby={`featured-project-${project.slug}`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[var(--color-surface-secondary)] border-b-2 border-[var(--color-border)] select-none">
        <div className="flex items-center gap-2">
          {domainAsset && (
            <div className="w-6 h-6 shrink-0 relative flex items-center justify-center">
              <Image
                src={domainAsset.src}
                alt=""
                width={24}
                height={24}
                className="w-5 h-5 object-contain"
                style={{ imageRendering: "pixelated", width: "auto", height: "auto" }}
                aria-hidden="true"
                unoptimized
              />
            </div>
          )}
          <PixelBadge
            variant={isPrimary ? "primary" : "blue"}
            size="sm"
          >
            {isRecruiter
              ? (isPrimary ? "FLAGSHIP BUILD · WORKING MVP" : "CIVIC INTELLIGENCE · PODIUM PROTOTYPE")
              : (isPrimary ? "FEATURED BUILD // CURRENT MVP" : "FEATURED CIVIC BUILD // PODIUM PROTOTYPE")}
          </PixelBadge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mandatory Simulation Disclosure for Purwokerto Intelligence Layer */}
          {isSimulation && (
            <span className="px-2 py-0.5 bg-[var(--color-background)] border border-[var(--color-achievement)] text-[var(--color-achievement)] font-mono text-[10px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
              SIMULATED DATA
            </span>
          )}

          <span className="px-2 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] font-mono text-[10px] text-[var(--color-text)] uppercase font-semibold">
            STATUS: {statusLabel}
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="p-5 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Viewport Column: Left on primary, can stay balanced */}
          <div className="lg:col-span-6 w-full">
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

          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Category & Year Tag */}
              <div className="flex flex-wrap items-center gap-2">
                {project.categories.slice(0, 3).map((cat) => (
                  <span
                    key={cat}
                    className="font-mono text-[10px] uppercase text-[var(--color-muted)] px-2 py-0.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)]"
                  >
                    {cat}
                  </span>
                ))}
                {project.year && (
                  <span className="font-mono text-[10px] text-[var(--color-muted)]">
                    YEAR: {project.year}
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3
                  id={`featured-project-${project.slug}`}
                  className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-text)] tracking-tight leading-tight"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-[var(--color-primary)] transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[var(--color-primary)] mt-1 font-medium">
                  {isPrimary
                    ? "Electricity-cost decision-support & forecasting platform for Indonesian SMEs."
                    : "Geospatial civic intelligence & policy simulation prototype for Purwokerto."}
                </p>
              </div>

              {/* Exact Verified Competition Achievement */}
              {project.achievement && (
                <div className="p-2.5 bg-[var(--color-background)] border-2 border-[var(--color-achievement)] text-[var(--color-achievement)] flex items-center gap-2 text-xs font-mono font-bold shadow-[2px_2px_0px_0px_#0B1020]">
                  {isPrimary ? (
                    <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Trophy className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>{project.achievement}</span>
                </div>
              )}

              {/* Short Factual Description */}
              <p className="text-xs sm:text-sm text-[var(--color-text)] font-sans leading-relaxed line-clamp-3 sm:line-clamp-4">
                {project.shortDescription}
              </p>

              {/* Concise Tech Stack Badges */}
              <div className="pt-1">
                <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider block mb-1.5">
                  CORE IMPLEMENTATION STACK:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {curatedTechnologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Interactive Actions — Strict: Direct links, no nested buttons */}
            <div className="pt-4 border-t border-[var(--color-border)] flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all duration-75 select-none bg-[var(--color-primary)] text-[#0B1020] hover:brightness-110 border-2 border-[var(--color-primary)] shadow-[3px_3px_0px_0px_#0B1020] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                aria-label={`View ${project.title} case study`}
              >
                <span>View Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 font-mono text-xs sm:text-sm font-bold uppercase transition-all duration-75 select-none bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-secondary)] border-2 border-[var(--color-border)] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  aria-label={`Open ${project.title} repository on GitHub (opens in new tab)`}
                >
                  <GithubIcon className="w-4 h-4" aria-hidden="true" />
                  <span>GitHub ↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
