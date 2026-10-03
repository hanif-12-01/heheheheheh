import React from "react";
import Link from "next/link";
import { Project } from "@/types/project";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { ExternalLink, Terminal, Award } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <PixelCard
      variant={project.achievement ? "achievement" : "default"}
      className="flex flex-col justify-between h-full"
    >
      <div className="space-y-4">
        {/* Visual Frame Placeholder (To receive actual screenshot in Phase 2) */}
        <div className="relative aspect-video w-full bg-[var(--color-background)] border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center p-4 text-center select-none overflow-hidden group">
          <Terminal className="w-8 h-8 text-[var(--color-border)] mb-2" />
          <span className="font-mono text-[10px] sm:text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
            PROJECT PLACEHOLDER FRAME
          </span>
          <span className="font-mono text-[9px] text-[var(--color-muted)] mt-1">
            [{project.slug}.png]
          </span>

          {project.achievement && (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-[var(--color-achievement)] text-[#0B1020] font-mono text-[9px] font-bold shadow-[2px_2px_0px_0px_#000] flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span>AWARD WINNER</span>
            </div>
          )}

          {project.status && (
            <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[8px] font-mono text-[var(--color-muted)] uppercase">
              STATUS: {project.status}
            </div>
          )}
        </div>

        {/* Project Header Info */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {project.categories.map((cat) => (
              <PixelBadge key={cat} variant="outline" size="sm">
                {cat}
              </PixelBadge>
            ))}
          </div>

          <h3 className="font-mono text-lg font-bold text-[var(--color-text)]">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1.5"
            >
              <span>{project.title}</span>
            </Link>
          </h3>

          {project.achievement && (
            <div className="text-[11px] font-mono text-[var(--color-achievement)] font-semibold flex items-center gap-1">
              <span>★</span>
              <span>{project.achievement}</span>
            </div>
          )}

          <p className="text-xs sm:text-sm text-[var(--color-muted)] font-sans line-clamp-3 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)] text-[var(--color-text)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
        <Link
          href={`/projects/${project.slug}`}
          className="text-[var(--color-primary)] hover:underline inline-flex items-center gap-1 font-bold"
        >
          <span>Case Study</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-muted)] hover:text-[var(--color-text)] inline-flex items-center gap-1 transition-colors"
            title={`View ${project.title} on GitHub`}
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </PixelCard>
  );
}
