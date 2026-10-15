"use client";

import { AtelierContact } from "@/components/atelier/AtelierSections";

import { useLocalize } from "@/i18n/useTranslations";

import React from "react";
import { SOCIAL_LINKS, CONTACT_COPY } from "@/data/socials";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { Mail, ExternalLink, FileText, HeartHandshake, ShieldCheck } from "lucide-react";
import { CvActions } from "@/components/ui/CvActions";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { WorldScene } from "@/components/world/WorldScene";
import { cn } from "@/lib/utils";

export function LetsBeFriends() {
  const localize = useLocalize();
  const { mode } = usePortfolioMode();
  const isRecruiter = mode === "recruiter";

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "github":
        return <GithubIcon className="w-5 h-5 text-[var(--color-primary)]" aria-hidden="true" />;
      case "linkedin":
        return <LinkedinIcon className="w-5 h-5 text-[var(--color-blue)]" aria-hidden="true" />;
      case "instagram":
        return <InstagramIcon className="w-5 h-5 text-[var(--color-purple)]" aria-hidden="true" />;
      case "mail":
        return <Mail className="w-5 h-5 text-[var(--color-achievement)]" aria-hidden="true" />;
      default:
        return <Mail className="w-5 h-5 text-[var(--color-muted)]" aria-hidden="true" />;
    }
  };

  if (mode === "recruiter") return <AtelierContact />;

  if (!isRecruiter) {
    return localize((
      <section id="contact" aria-labelledby="contact-title" className="world-chapter contact-clearing">
        <WorldScene variant="clearing" />
        <div className="world-container chapter-content contact-clearing__content">
          <header className="chapter-heading">
            <p className="chapter-eyebrow">11 / THE CLEARING</p>
            <h2 id="contact-title">{CONTACT_COPY.heading}</h2>
            <p className="contact-clearing__tagline">{CONTACT_COPY.tagline}</p>
            <p>{CONTACT_COPY.subtext}</p>
          </header>
          <div className="clearing-links">
            {SOCIAL_LINKS.map((link) => {
              const active = !link.isPlaceholder && link.url && link.url !== "#";
              const email = link.id === "email";
              return active ? (
                <a key={link.id} href={link.url} target={email ? undefined : "_blank"} rel={email ? undefined : "noopener noreferrer"} className="clearing-link" aria-label={email ? `Send email to M. Hanif Al Faiz at ${link.handle}` : `Open M. Hanif Al Faiz on ${link.name} (opens in new tab)`}>
                  {getSocialIcon(link.iconName)}
                  <span><strong>{link.name}</strong><span>{email ? link.handle : `@${link.handle}`}</span></span>
                  <span className="clearing-link__arrow" aria-hidden="true">{email ? "→" : "↗"}</span>
                </a>
              ) : <p key={link.id} className="clearing-link clearing-link--pending">{link.name} · Link pending</p>;
            })}
          </div>
          <div className="clearing-cv">
            <div><h3>Take the professional dossier with you.</h3><p>Harvard-style academic & software engineering CV. A4 format, 2 pages, verified portfolio data.</p></div>
            <div className="flex flex-wrap gap-3"><CvActions className="clearing-cv__download" /></div>
          </div>
        </div>
      </section>
    ));
  }
  return null;
}
