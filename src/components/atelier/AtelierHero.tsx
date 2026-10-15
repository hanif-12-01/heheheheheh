"use client";
import Image from "next/image";
import { PROFILE_DATA } from "@/data/profile";
import { SITE_CONFIG } from "@/lib/constants";
import { useLocalize } from "@/i18n/useTranslations";
import { CvActions } from "@/components/ui/CvActions";

export function AtelierHero() {
  const localize = useLocalize();
  return localize(<section id="hero" className="atelier-hero" aria-label="Candidate overview">
    <div className="atelier-hero__architecture" aria-hidden="true">
      <Image src="/pixel/environment/grand-atelier.webp" alt="" fill unoptimized preload sizes="100vw" />
    </div>
    <header className="atelier-hero__identity">
      <p className="atelier-kicker">HANIF.EXE <span aria-hidden="true"> / </span> The Grand Atelier</p>
      <h1>M. Hanif <em>Al Faiz.</em></h1>
      <p className="atelier-hero__position">Software Developer · AI &amp; Civic Tech Explorer</p>
    </header>
    <figure className="atelier-portrait-stage">
      <div className="atelier-portrait-stage__arch">
        <Image src="/profile/hanif-portrait-pixel.webp" alt="Pixel-art portrait of M. Hanif Al Faiz, adapted from his authentic photograph" width={256} height={320} unoptimized preload />
      </div>
      <figcaption>Portrait study · Owner likeness review pending</figcaption>
    </figure>
    <div className="atelier-hero__introduction">
      <p className="atelier-kicker">Informatics undergraduate · Semester {PROFILE_DATA.currentLevel}</p>
      <p>{PROFILE_DATA.bioShort}</p>
      <span>{PROFILE_DATA.university}</span>
    </div>
    <nav className="atelier-hero__actions" aria-label="Professional portfolio actions">
      <a href="#projects" className="atelier-button atelier-button--primary">View Selected Projects <span aria-hidden="true">↗</span></a>
      <CvActions className="atelier-button" />
      <a className="atelier-text-link" href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" aria-label="Open M. Hanif Al Faiz GitHub profile (opens in new tab)">GitHub Profile <span aria-hidden="true">↗</span></a>
    </nav>
    <div className="atelier-hero__colophon"><span>{PROFILE_DATA.degree}</span><span>GPA {PROFILE_DATA.gpa}</span><a href="#profile">Explore the academic gallery <span aria-hidden="true">↓</span></a></div>
  </section>);
}
