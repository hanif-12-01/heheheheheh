"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FEATURED_PROJECTS } from "@/data/projects";
import { ProjectCategory } from "@/types/project";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PixelButton } from "@/components/pixel/PixelButton";
import { FolderGit2, ArrowRight } from "lucide-react";

export function ProjectLab() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const filteredProjects = FEATURED_PROJECTS.filter((p) => {
    if (activeCategory === "all") return true;
    return p.categories.includes(activeCategory);
  });

  return (
    <section
      id="projects"
      aria-label="Project Lab"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
        <PixelSectionTitle
          number="07"
          title="PROJECT LAB // CURATED BUILDS"
          subtitle="Selected public engineering projects in AI forecasting, geospatial intelligence, and full-stack software."
          badge="PUBLIC WORK"
          className="mb-0"
        />

        <Link href="/projects" className="self-start md:self-end">
          <PixelButton variant="secondary" size="sm">
            <FolderGit2 className="w-4 h-4" />
            <span>Complete Project Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </PixelButton>
        </Link>
      </div>

      <ProjectFilters
        currentCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-8 text-center bg-[var(--color-surface)] border-2 border-[var(--color-border)] font-mono text-sm text-[var(--color-muted)]">
          &gt; No active projects matched filter: [{activeCategory}]. Check &quot;ALL&quot; or complete archive.
        </div>
      )}
    </section>
  );
}
