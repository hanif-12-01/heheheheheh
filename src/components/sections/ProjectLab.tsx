"use client";

import React from "react";
import Link from "next/link";
import { FEATURED_PROJECTS } from "@/data/projects";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { FolderGit2, ArrowRight, Layers, Sparkles, Terminal } from "lucide-react";

export function ProjectLab() {
  const { mode } = usePortfolioMode();
  // Data-derived project split: 2 featured tier + 4 core builds
  const wattwiseProject = FEATURED_PROJECTS.find((p) => p.slug === "wattwise-ai");
  const pilProject = FEATURED_PROJECTS.find((p) => p.slug === "purwokerto-intelligence-layer");
  const coreProjects = FEATURED_PROJECTS.filter(
    (p) => p.slug !== "wattwise-ai" && p.slug !== "purwokerto-intelligence-layer"
  );

  const totalBuildsCount = FEATURED_PROJECTS.length.toString().padStart(2, "0");
  const featuredCount = "02";
  const isRecruiter = mode === "recruiter";

  return (
    <section
      id="projects"
      aria-label={isRecruiter ? "Selected Projects" : "Project Lab"}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)] space-y-12"
    >
      {/* Section Header with Data-Derived Count Index */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-[var(--color-border)]/60">
        <PixelSectionTitle
          number="07"
          title="PROJECT LAB // SELECTED BUILDS"
          subtitle="Prototypes, decision-support systems, coursework, and product experiments."
          badge="PUBLIC WORK"
          recruiterTitle="SELECTED PROJECTS & ENGINEERING BUILDS"
          recruiterSubtitle="Verified prototypes, geospatial analytics layers, decision-support tools, and product MVPs."
          recruiterBadge="PUBLIC WORK"
          className="mb-0"
        />

        {/* Compact Terminal-Style Index & Complete Archive Action */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-end">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[11px] text-[var(--color-text)]">
            <span className="w-2 h-2 bg-[var(--color-primary)] inline-block" aria-hidden="true" />
            <span className="font-bold text-[var(--color-primary)]">{totalBuildsCount}</span>
            <span>{isRecruiter ? "PROJECTS DOCUMENTED" : "BUILDS DOCUMENTED"}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-[11px] text-[var(--color-text)]">
            <span className="w-2 h-2 bg-[var(--color-achievement)] inline-block" aria-hidden="true" />
            <span className="font-bold text-[var(--color-achievement)]">{featuredCount}</span>
            <span>FEATURED</span>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 font-mono text-xs font-bold uppercase transition-all duration-75 select-none bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-secondary)] border-2 border-[var(--color-border)] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label="View complete project archive directory"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
            <span>{isRecruiter ? "All Projects Archive" : "Complete Archive"}</span>
            <ArrowRight className="w-3 h-3 text-[var(--color-muted)]" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* FEATURED BUILDS AREA — WattWise AI (Primary) & Purwokerto Intelligence Layer (Civic) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4" aria-hidden="true" />
            <span>FEATURED BUILDS // CURRENT MVP &amp; CIVIC PODIUM</span>
          </h3>
          <span className="font-mono text-[10px] text-[var(--color-muted)]">
            TIER 1 ARCHITECTURE
          </span>
        </div>

        <div className="space-y-6">
          {wattwiseProject && (
            <FeaturedProjectCard
              project={wattwiseProject}
              tier="primary"
            />
          )}

          {pilProject && (
            <FeaturedProjectCard
              project={pilProject}
              tier="civic"
            />
          )}
        </div>
      </div>

      {/* SECONDARY PROJECT GRID — Core Builds & AI Coursework (2x2 Grid) */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]/50">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--color-text)] font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
            <span>CORE BUILDS &amp; COURSEWORK</span>
          </h3>
          <span className="font-mono text-[10px] text-[var(--color-muted)]">
            04 ARCHIVED BUILDS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      {/* Bottom Archive Navigation Footer */}
      <div className="p-4 sm:p-5 bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        <div className="space-y-0.5 text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-[var(--color-text)] block">
            NEED TO INSPECT ALGORITHM LABS &amp; LOW-LEVEL CODE?
          </span>
          <p className="font-mono text-[11px] text-[var(--color-muted)]">
            Explore C++ sorting labs, propositional logic solvers, and socket proxy experiments.
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase transition-all duration-75 select-none bg-[var(--color-surface-secondary)] text-[var(--color-primary)] hover:bg-[var(--color-border)] border-2 border-[var(--color-border)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] shrink-0"
          aria-label="View all builds and GitHub experiments directory"
        >
          <span>View All Builds &amp; Experiments</span>
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
