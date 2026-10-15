"use client";

import { AtelierAbout } from "@/components/atelier/AtelierSections";

import { useLocalize } from "@/i18n/useTranslations";

import React from "react";
import Image from "next/image";
import { PROFILE_DATA } from "@/data/profile";
import { journeyAssets } from "@/data/worldAssets";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { BookOpen, Sparkles, Target, Compass, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function About() {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();

  const philosophyPillars = [
    {
      id: "build-to-solve",
      title: "BUILD TO SOLVE",
      icon: <Target className="w-4 h-4 text-[var(--color-primary)]" />,
      accentColor: "var(--color-primary)",
      description:
        "Technology should serve practical community needs, not merely accumulate technical debt.",
      tag: "PRACTICALITY",
    },
    {
      id: "continuous-rd",
      title: "CONTINUOUS R&D",
      icon: <Compass className="w-4 h-4 text-[var(--color-blue)]" />,
      accentColor: "var(--color-blue)",
      description:
        "Active involvement in faculty research, student creativity initiatives, and national hackathons.",
      tag: "INNOVATION",
    },
    {
      id: "shared-leadership",
      title: "SHARED LEADERSHIP",
      icon: <Sparkles className="w-4 h-4 text-[var(--color-achievement)]" />,
      accentColor: "var(--color-achievement)",
      description:
        "Belief in strong team coordination, transparent governance, and peer mentorship.",
      tag: "COLLABORATION",
    },
  ];

  const currentFocusItems = [
    "Advancing WattWise AI startup energy solutions",
    "Refining Purwokerto GIS spatial intelligence layers",
    "Studying Semester 5 informatics coursework & research",
    "Coordinating academic seminars & community visits",
  ];

  if (mode === "recruiter") return <AtelierAbout />;

  if (mode === "pixel") {
    return localize((
      <section id="about" aria-labelledby="world-about-title" className="world-chapter world-about">
        <div className="world-container">
          <header className="identity-chapter-heading">
            <p className="identity-eyebrow">03 / THE READING CORNER · THE LORE</p>
            <h2 id="world-about-title">About Hanif / Origin &amp; Mindset</h2>
            <p>Bridging academic informatics, civic engineering, and real-world system development.</p>
          </header>

          <div className="reading-corner-layout">
            <div className="about-narrative">
              <p className="identity-small-label">Biography / Origin story · Reading mode</p>
              {PROFILE_DATA.bioExtended.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              <blockquote className="about-working-belief">&ldquo;Rather than treating code as isolated syntax, I treat every project as an interactive system built to provide tangible decision support.&rdquo;</blockquote>

              <div className="about-principles">
                <h3>Core principles / How I think &amp; work</h3>
                <ol>
                  {philosophyPillars.map((pillar, index) => (
                    <li key={pillar.id}>
                      <span className="principle-number" style={{ color: pillar.accentColor }} aria-hidden="true">0{index + 1}</span>
                      <div><h4>{pillar.title}</h4><p>{pillar.description}</p><span className="principle-tag">{pillar.tag}</span></div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="study-corner" aria-labelledby="study-corner-title">
              <figure className="study-book-figure">
                <div className="study-book-props" aria-hidden="true">
                  <Image src={journeyAssets.researchDocument.src} alt="" width={1201} height={1057} className="study-document-image" unoptimized />
                  <Image src={journeyAssets.book.src} alt="" width={1226} height={853} className="study-book-image" unoptimized />
                </div>
                <figcaption><strong id="study-corner-title">Continuous Study &amp; Research</strong><span>Semester 3 Open Book — Symbolizing active academic inquiry, theoretical foundations, and knowledge sharing.</span></figcaption>
              </figure>

              <div className="current-focus-notes">
                <p className="identity-small-label">Academic study / Level 03 artifact</p>
                <h3>Current focus (2026)</h3>
                <ul>{currentFocusItems.map((item) => <li key={item}>{item}</li>)}</ul>
                <p className="focus-semester">Active sprints · Semester 5</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    ));
  }
  return null;
}

