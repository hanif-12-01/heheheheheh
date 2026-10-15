"use client";

import { useLocalize } from "@/i18n/useTranslations";

import Link from "next/link";
import { FEATURED_PROJECTS } from "@/data/projects";
import { FeaturedProjectCard } from "@/components/projects/FeaturedProjectCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { WorldScene } from "@/components/world/WorldScene";
import { AtelierRoomScene } from "@/components/atelier/AtelierRoomScene";

export function ProjectLab() {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();
  const isRecruiter = mode === "recruiter";
  const wattwiseProject = FEATURED_PROJECTS.find((p) => p.slug === "wattwise-ai");
  const civicTwinProject = FEATURED_PROJECTS.find((p) => p.slug === "civictwin-semarang");
  const coreProjects = FEATURED_PROJECTS.filter((p) => p.slug !== "wattwise-ai" && p.slug !== "civictwin-semarang");

  return localize((
    <section id="projects" className="project-lab world-chapter" aria-labelledby="project-lab-title">
      {!isRecruiter && <WorldScene variant="courtyard" />}
      <div className="project-lab__heading">
        <div>
          <p className="project-chapter__eyebrow">{isRecruiter ? "06" : "07"} · {isRecruiter ? "Selected work" : "The engineering workshop"}</p>
          <h2 id="project-lab-title">{isRecruiter ? "Selected projects" : "Ideas brought into the world."}</h2>
          <p>Engineering chapters: prototypes, decision-support systems, coursework, and product experiments.</p>
        </div>
        <Link href="/projects" className="project-study-link">All projects &amp; experiments <span aria-hidden="true">→</span></Link>
      </div>

      {isRecruiter && <AtelierRoomScene variant="gallery" className="atelier-exhibition-scene" />}

      <div className="project-lab__featured">
        {wattwiseProject ? <FeaturedProjectCard project={wattwiseProject} tier="primary" /> : null}
        {civicTwinProject ? <FeaturedProjectCard project={civicTwinProject} tier="civic" /> : null}
      </div>

      <div className="project-lab__chapters">
        {coreProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} chapterNumber={String(index + 3).padStart(2, "0")} />
        ))}
      </div>

      <div className="project-lab__archive">
        <p>Continue into sorting algorithms, propositional logic, and socket networking experiments.</p>
        <Link href="/projects" className="project-study-link">Explore the archive <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  ));
}
