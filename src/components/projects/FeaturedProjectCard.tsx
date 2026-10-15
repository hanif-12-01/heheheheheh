"use client";

import { useLocalize } from "@/i18n/useTranslations";

import { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";

export interface FeaturedProjectCardProps {
  project: Project;
  tier: "primary" | "civic";
  className?: string;
}

export function FeaturedProjectCard({ project, tier, className }: FeaturedProjectCardProps) {
  const localize = useLocalize();
  return localize((
    <ProjectCard
      project={project}
      emphasis={tier}
      chapterNumber={tier === "primary" ? "01" : "02"}
      className={className}
    />
  ));
}
