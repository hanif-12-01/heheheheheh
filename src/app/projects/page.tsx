import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FEATURED_PROJECTS, GITHUB_EXPERIMENTS } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { ArrowLeft, FolderGit2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Engineering Archive — M. Hanif Al Faiz",
  description:
    "Complete portfolio archive of AI models, smart city systems, full-stack applications, and research prototypes by M. Hanif Al Faiz.",
};

export default function ProjectsPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 outline-none"
    >
      {/* Header navigation — direct link, no nested button */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all duration-75 select-none bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-secondary)] border-2 border-[var(--color-border)] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Return to Overview homepage"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Return to Overview</span>
        </Link>
        <span className="font-mono text-xs text-[var(--color-muted)]">
          ARCHIVE_INDEX: {FEATURED_PROJECTS.length + GITHUB_EXPERIMENTS.length} ENTRIES
        </span>
      </div>

      <PixelSectionTitle
        as="h1"
        number="ARCHIVE"
        title="PROJECT LAB // ALL BUILDS"
        subtitle="Complete catalog of public repositories, competition submissions, and engineering prototypes."
        badge="PUBLIC DIRECTORY"
        recruiterTitle="PROJECT DIRECTORY // ALL BUILDS"
        recruiterSubtitle="Complete catalog of public repositories, competition submissions, and engineering prototypes."
        recruiterBadge="PUBLIC DIRECTORY"
      />

      {/* Featured Projects Grid */}
      <div className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-[var(--color-primary)] font-bold flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" aria-hidden="true" />
          <span>FEATURED PRODUCTIONS &amp; PODIUMS</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      {/* Laboratory Coursework & Experiments Grid */}
      <div className="space-y-6 pt-8 border-t border-[var(--color-border)]">
        <h2 className="font-mono text-sm uppercase tracking-wider text-[var(--color-muted)] font-bold">
          LABORATORY EXPERIMENTS &amp; COURSEWORK
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GITHUB_EXPERIMENTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
