"use client";

import { useLocalize } from "@/i18n/useTranslations";
import { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { techAssets, journeyAssets } from "@/data/worldAssets";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  project: Project;
  className?: string;
  chapterNumber?: string;
  emphasis?: "primary" | "civic";
}

/** Illustrative domain props, never presented as software captures or evidence. */
export function getProjectDomainAsset(slug: string) {
  switch (slug) {
    case "wattwise-ai": return techAssets.aiChip;
    case "civictwin-semarang": return techAssets.smartCity;
    case "purwokerto-intelligence-layer": return techAssets.gisMap;
    case "lapor-mangan": return techAssets.gisMap;
    case "bernas-mbg": return techAssets.server;
    case "ai-course-project": return journeyAssets.researchFlask;
    case "sorting-algorithm-visualizer": return techAssets.codeEditor;
    case "computational-logic-sim": return journeyAssets.researchFlask;
    case "micro-network-probe": return techAssets.server;
    default: return null;
  }
}

/** Maturity follows the existing verified project descriptions, alongside status. */
export function getProjectMaturity(project: Project): string {
  switch (project.slug) {
    case "wattwise-ai": return "Working MVP · Active";
    case "civictwin-semarang": return "Competition proof of concept";
    case "purwokerto-intelligence-layer": return "Experimental material · Simulated data";
    case "lapor-mangan": return "Culinary discovery prototype · Completed";
    case "bernas-mbg": return "Proof of concept";
    case "ai-course-project": return "AI coursework · Completed";
    default: return project.status === "experiment" ? "Lab experiment" : project.status || "Prototype";
  }
}

export function ProjectCard({ project, className, chapterNumber, emphasis }: ProjectCardProps) {
  const localize = useLocalize();
  const domainAsset = getProjectDomainAsset(project.slug);
  const isSimulation = ["civictwin-semarang", "purwokerto-intelligence-layer", "bernas-mbg"].includes(project.slug);

  return localize((
    <article
      className={cn("project-chapter", emphasis && "project-chapter--featured", emphasis && `project-chapter--${emphasis}`, className)}
      aria-labelledby={`project-title-${project.slug}`}
    >
      <div className="project-chapter__landmark" aria-hidden="true">
        {chapterNumber ? <span className="project-chapter__number">{chapterNumber}</span> : null}
        {domainAsset ? (
          <Image
            src={domainAsset.src}
            alt=""
            width={domainAsset.recommendedDisplaySize.width}
            height={domainAsset.recommendedDisplaySize.height}
            className="project-chapter__prop"
            unoptimized
          />
        ) : null}
      </div>

      <div className="project-chapter__content">
        <p className="project-chapter__eyebrow">
          {project.categories.slice(0, 2).map((category, index) => <Fragment key={category}>{index ? " / " : ""}{category}</Fragment>)}
          {project.year ? <span> · {project.year}</span> : null}
        </p>
        <h3 id={`project-title-${project.slug}`} className="project-chapter__title">
          {project.featured ? <Link href={`/projects/${project.slug}`}>{project.title}</Link> : project.title}
        </h3>
        <p className="project-chapter__maturity">{getProjectMaturity(project)}</p>
        {isSimulation ? <p className="project-chapter__disclosure">Uses simulated data</p> : null}
        {project.achievement ? <p className="project-chapter__achievement">{project.achievement}</p> : null}
        <p className="project-chapter__description">{project.shortDescription}</p>

        <ul className="project-chapter__technologies" aria-label={`${project.title} technologies`}>
          {project.technologies.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>

        <div className="project-chapter__actions">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-repository-link"
              aria-label={`Open ${project.title} repository on GitHub (opens in new tab)`}
            >
              <GithubIcon className="h-4 w-4" aria-hidden="true" />
              <span>GitHub repository</span>
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {project.featured ? (
            <Link href={`/projects/${project.slug}`} className="project-study-link" aria-label={`View ${project.title} case study`}>
              Read case study <span aria-hidden="true">→</span>
            </Link>
          ) : !project.githubUrl ? <span className="project-chapter__maturity">Coursework record</span> : null}
        </div>
      </div>
    </article>
  ));
}
