"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { PROFILE_DATA } from "@/data/profile";
import { AtelierHero } from "@/components/atelier/AtelierHero";
import { usePixelPet } from "@/hooks/usePixelPet";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { WorldScene } from "@/components/world/WorldScene";
import { useLocalize } from "@/i18n/useTranslations";
import { CvActions } from "@/components/ui/CvActions";

export function Hero() {
  const localize = useLocalize();
  const { setState, setDialogue } = usePixelPet();
  const { mode } = usePortfolioMode();
  const hasGreeted = useRef(false);

  useEffect(() => {
    if (mode !== "pixel" || hasGreeted.current) return;
    hasGreeted.current = true;
    setState("wave");
    const greeting = setTimeout(() => setDialogue("Hey! I'm Hanif. Welcome to my little corner of the world!"), 700);
    const idle = setTimeout(() => {
      const hero = document.getElementById("hero");
      if (hero && hero.getBoundingClientRect().bottom > window.innerHeight * .3) setState("idle");
    }, 4500);
    return () => { clearTimeout(greeting); clearTimeout(idle); };
  }, [mode, setState, setDialogue]);

  if (mode === "recruiter") return <AtelierHero />;

  return localize(<section id="hero" className="world-hero" aria-label="The beginning — Hanif's woodland workshop">
    <WorldScene variant="hero" />
    <div className="world-container">
      <div className="world-hero-copy">
        <div className="world-eyebrow">A little world. A growing journey.</div>
        <h1 className="world-name">M. HANIF<span>AL FAIZ.</span></h1>
        <p className="world-role">Informatics student. Builder. Explorer.</p>
        <p className="world-intro">{PROFILE_DATA.bioShort}</p>
        <div className="world-hero-actions">
          <a href="#projects" className="world-action world-action--primary">View Projects
            <Image src="/pixel/ui/ui-arrow-right.webp" alt="" width={16} height={16} unoptimized aria-hidden="true" />
          </a>
          <CvActions className="world-action" />
        </div>
        <span className="world-hero-note">{PROFILE_DATA.university} · Semester {PROFILE_DATA.currentLevel}, in progress</span>
      </div>
    </div>
    <div id="hero-companion-anchor" className="world-companion-anchor" />
    <a href="#profile" className="world-trail-link"><Image src="/pixel/ui/ui-arrow-down.webp" alt="" width={16} height={16} unoptimized aria-hidden="true" />Follow the path</a>
  </section>);
}
