"use client";

import { AtelierProfile } from "@/components/atelier/AtelierSections";

import { useLocalize } from "@/i18n/useTranslations";

import React from "react";
import Image from "next/image";
import { PROFILE_DATA } from "@/data/profile";
import { uiAssets } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelWindow } from "@/components/pixel/PixelWindow";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Shield, Award, Terminal, Mic, GraduationCap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlayerProfile() {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();
  const prefersReducedMotion = useReducedMotion();

  const statIcons: Record<string, React.ReactNode> = {
    competitions: <Award className="w-4 h-4 text-[var(--color-achievement)]" />,
    leadership: <Shield className="w-4 h-4 text-[var(--color-blue)]" />,
    research: <GraduationCap className="w-4 h-4 text-[var(--color-purple)]" />,
    software: <Terminal className="w-4 h-4 text-[var(--color-primary)]" />,
    "public-speaking": <Mic className="w-4 h-4 text-[var(--color-purple)]" />,
  };

  const statColors: Record<string, string> = {
    competitions: "var(--color-achievement)",
    leadership: "var(--color-blue)",
    research: "var(--color-purple)",
    software: "var(--color-primary)",
    "public-speaking": "var(--color-purple)",
  };

  // Academic progress calculations derived from PROFILE_DATA.currentLevel (Source of Truth)
  const totalSemesters = 8;
  const currentSemester = PROFILE_DATA.currentLevel; // Semester 5 is Current / In Progress
  const completedSemesters = currentSemester - 1; // 4 Semesters Completed (Semesters 1-4)
  const upcomingSemesters = totalSemesters - currentSemester; // 3 Semesters Upcoming (Semesters 6-8)

  if (mode === "recruiter") return <AtelierProfile />;

  if (mode === "pixel") {
    return localize((
      <section id="profile" aria-labelledby="world-profile-title" className="world-chapter world-profile">
        <div className="world-container">
          <header className="identity-chapter-heading">
            <p className="identity-eyebrow">02 / THE WORKSHOP · CHARACTER SHEET</p>
            <h2 id="world-profile-title">Player Profile &amp; Attributes</h2>
            <p>Qualitative status indicators and academic milestones — verified by active contributions.</p>
          </header>

          <div className="workshop-profile-layout">
            <figure className="workshop-interior">
              <Image
                src="/pixel/environment/workshop-interior.webp"
                alt=""
                aria-hidden="true"
                width={384}
                height={288}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 48vw, 520px"
                className="workshop-interior-image"
                unoptimized
              />
              <figcaption>The workshop / a place to study, build, and explore</figcaption>
            </figure>

            <article className="academic-dossier" aria-labelledby="academic-dossier-title">
              <div className="dossier-label">
                <span>Identity / ID#01</span>
                <span className="dossier-active">Online · Active</span>
              </div>
              <h3 id="academic-dossier-title">{PROFILE_DATA.name}</h3>
              <p className="dossier-handle">Handle: {PROFILE_DATA.handle}</p>

              <dl className="dossier-facts">
                <div><dt>Institution</dt><dd>{PROFILE_DATA.university}</dd></div>
                <div><dt>Degree</dt><dd>{PROFILE_DATA.degree}</dd></div>
                <div><dt>Cumulative GPA</dt><dd className="dossier-gpa">{PROFILE_DATA.gpa}</dd></div>
                <div><dt>Expected graduation</dt><dd>Class of {PROFILE_DATA.expectedGraduation}</dd></div>
              </dl>

              <div className="dossier-progress">
                <p><span>Current quest</span><strong>Semester {currentSemester} / In Progress</strong></p>
                <div
                  className="dossier-semesters"
                  role="progressbar"
                  aria-valuenow={currentSemester}
                  aria-valuemin={1}
                  aria-valuemax={totalSemesters}
                  aria-label={`Academic progress: Semesters 1 through ${completedSemesters} completed, Semester ${currentSemester} currently in progress, Semesters ${currentSemester + 1} through ${totalSemesters} upcoming.`}
                >
                  {Array.from({ length: totalSemesters }, (_, index) => {
                    const semester = index + 1;
                    const status = semester < currentSemester ? "completed" : semester === currentSemester ? "current" : "upcoming";
                    return <span key={semester} className={`semester-step semester-step-${status}`} title={`Semester ${semester} — ${status === "current" ? "Current (In Progress)" : status}`} aria-hidden="true">{semester.toString().padStart(2, "0")}</span>;
                  })}
                </div>
                <p className="dossier-progress-caption">Academic progress: Semester {currentSemester} / {totalSemesters}</p>
                <p className="dossier-progress-note">{completedSemesters} completed · Semester {currentSemester} current · {upcomingSemesters} upcoming</p>
              </div>

              <p className="dossier-verification">Academic standing verified at Level 05 (Semester 5 In Progress). Specializing in intelligent software, spatial analytics, and competition-driven innovation.</p>
            </article>
          </div>

          <div className="capability-evidence" aria-label="Verified capability areas">
            {PROFILE_DATA.stats.map((stat, index) => (
              <article key={stat.id} className={`capability-row capability-row-${stat.id}`}>
                <span className="capability-number" aria-hidden="true">{(index + 1).toString().padStart(2, "0")}</span>
                <div className="capability-name"><h3>{stat.name}</h3><p>{stat.rank}</p></div>
                <div className="capability-details">
                  <p>{stat.highlight}</p>
                  <ul className="identity-tags" aria-label={`${stat.name} evidence areas`}>
                    {stat.tags.map((tag) => <li key={tag}>#{tag}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    ));
  }
  return null;
}

