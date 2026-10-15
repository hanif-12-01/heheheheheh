"use client";

import { useLocalize } from "@/i18n/useTranslations";
import { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/project";
import { getProjectDomainAsset, getProjectMaturity } from "@/components/projects/ProjectCard";
import { GithubIcon } from "@/components/icons/SocialIcons";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const localize = useLocalize();
  const domainAsset = getProjectDomainAsset(project.slug);
  const isSimulation = ["civictwin-semarang", "purwokerto-intelligence-layer", "bernas-mbg"].includes(project.slug);

  return localize((
    <article className="project-case-study">
      <Link href="/projects" className="project-study-link project-case-study__back">
        <span aria-hidden="true">←</span> Back to projects
      </Link>

      <header className="project-case-study__header">
        {domainAsset ? (
          <div className="project-case-study__prop" aria-hidden="true">
            <Image
              src={domainAsset.src}
              alt=""
              width={domainAsset.recommendedDisplaySize.width}
              height={domainAsset.recommendedDisplaySize.height}
              unoptimized
            />
          </div>
        ) : null}
        <p className="project-chapter__eyebrow">
          Engineering case study · {project.categories.map((category, index) => <Fragment key={category}>{index ? " / " : ""}{category}</Fragment>)}
          {project.year ? <span> · {project.year}</span> : null}
        </p>
        <h1>{project.title}</h1>
        <p className="project-chapter__maturity">{getProjectMaturity(project)}</p>
        {isSimulation ? <p className="project-chapter__disclosure">Uses simulated data</p> : null}
        {project.achievement ? <p className="project-chapter__achievement">{project.achievement}</p> : null}
        <p className="project-case-study__description">{project.longDescription || project.shortDescription}</p>
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
              GitHub repository <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-study-link"
              aria-label={`Open ${project.title} live prototype (opens in new tab)`}
            >
              Live prototype <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </header>

      <div className="project-case-study__notes">
        {project.keyHighlights?.length ? (
          <section aria-labelledby={`highlights-${project.slug}`}>
            <h2 id={`highlights-${project.slug}`}>Highlights &amp; milestones</h2>
            <ul>{project.keyHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          </section>
        ) : null}
        {project.architectureNotes?.length ? (
          <section aria-labelledby={`architecture-${project.slug}`}>
            <h2 id={`architecture-${project.slug}`}>Engineering notes</h2>
            <ul>{project.architectureNotes.map((note) => <li key={note}>{note}</li>)}</ul>
          </section>
        ) : null}
      </div>

      <section className="project-case-study__stack" aria-labelledby={`stack-${project.slug}`}>
        <h2 id={`stack-${project.slug}`}>Technology stack</h2>
        <ul className="project-chapter__technologies">
          {project.technologies.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
      </section>
    </article>
  ));
}
