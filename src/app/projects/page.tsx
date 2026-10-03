import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { FEATURED_PROJECTS, GITHUB_EXPERIMENTS } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelButton } from "@/components/pixel/PixelButton";
import { ArrowLeft, FolderGit2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Engineering Archive — M. Hanif Al Faiz",
  description:
    "Complete portfolio archive of AI models, smart city systems, full-stack applications, and research prototypes by M. Hanif Al Faiz.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header navigation */}
      <div className="flex items-center justify-between">
        <Link href="/">
          <PixelButton variant="secondary" size="sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Spawn Point</span>
          </PixelButton>
        </Link>
        <span className="font-mono text-xs text-[var(--color-muted)]">
          ARCHIVE_INDEX: {FEATURED_PROJECTS.length + GITHUB_EXPERIMENTS.length} ENTRIES
        </span>
      </div>

      <PixelSectionTitle
        number="ARCHIVE"
        title="PROJECT LAB // ALL BUILDS"
        subtitle="Complete catalog of public repositories, competition submissions, and engineering prototypes."
        badge="PUBLIC DIRECTORY"
      />

      {/* Featured Projects Grid */}
      <div className="space-y-6">
        <h2 className="font-mono text-sm uppercase tracking-wider text-[var(--color-primary)] font-bold flex items-center gap-2">
          <FolderGit2 className="w-4 h-4" />
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
