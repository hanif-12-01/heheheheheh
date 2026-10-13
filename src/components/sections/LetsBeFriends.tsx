"use client";

import React from "react";
import { SOCIAL_LINKS, CONTACT_COPY } from "@/data/socials";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { Mail, ExternalLink, Download, FileText, HeartHandshake, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";
import { usePortfolioMode } from "@/hooks/usePortfolioMode";
import { cn } from "@/lib/utils";

export function LetsBeFriends() {
  const { mode } = usePortfolioMode();
  const isRecruiter = mode === "recruiter";

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "github":
        return <GithubIcon className="w-5 h-5 text-[var(--color-primary)]" aria-hidden="true" />;
      case "linkedin":
        return <LinkedinIcon className="w-5 h-5 text-[var(--color-blue)]" aria-hidden="true" />;
      case "instagram":
        return <InstagramIcon className="w-5 h-5 text-[#E1306C]" aria-hidden="true" />;
      case "mail":
        return <Mail className="w-5 h-5 text-[var(--color-achievement)]" aria-hidden="true" />;
      default:
        return <Mail className="w-5 h-5 text-[var(--color-muted)]" aria-hidden="true" />;
    }
  };

  return (
    <section
      id="contact"
      aria-label={isRecruiter ? "Contact and Credentials" : "Let's Be Friends and Contact"}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] select-none">
          <HeartHandshake className="w-4 h-4 text-[var(--color-achievement)]" aria-hidden="true" />
          <span>{isRecruiter ? "CONTACT & CREDENTIALS" : "CONTACT // OPEN CHANNEL"}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-[var(--color-text)]">
          {isRecruiter ? "CONTACT & INQUIRIES" : CONTACT_COPY.heading}
        </h2>

        <p className="text-xs sm:text-sm text-[var(--color-primary)] font-mono font-medium max-w-lg mx-auto">
          &quot;{CONTACT_COPY.tagline}&quot;
        </p>

        <p className="text-xs sm:text-sm text-[var(--color-muted)] font-sans leading-relaxed max-w-xl mx-auto">
          {CONTACT_COPY.subtext}
        </p>
      </div>

      {/* Communication Channels Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {SOCIAL_LINKS.map((link) => {
          const isActive = !link.isPlaceholder && link.url && link.url !== "#";
          const isEmail = link.id === "email";

          // Active verified channel (GitHub, LinkedIn, Email, Instagram)
          if (isActive) {
            return (
              <a
                key={link.id}
                href={link.url}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className="group relative flex items-center justify-between p-4 bg-[var(--color-surface)] border-2 border-[var(--color-primary)] shadow-[4px_4px_0px_0px_rgba(93,228,199,0.25)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(93,228,199,0.4)] transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                aria-label={
                  isEmail
                    ? `Send email to M. Hanif Al Faiz at ${link.handle}`
                    : `Open M. Hanif Al Faiz on ${link.name} (opens in new tab)`
                }
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] group-hover:border-[var(--color-primary)] transition-colors shrink-0">
                    {getSocialIcon(link.iconName)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-mono text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                      {link.name}
                    </h3>
                    <span className="font-mono text-xs text-[var(--color-muted)] block truncate">
                      {isEmail ? link.handle : `@${link.handle}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-primary)] text-[#0B1020] font-mono text-xs font-bold shadow-[2px_2px_0px_0px_#0B1020] shrink-0">
                  <span>{isEmail ? "SEND" : "VISIT"}</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </a>
            );
          }

          // Non-interactive placeholder channel (fallback)
          return (
            <div
              key={link.id}
              className="flex items-center justify-between p-4 bg-[var(--color-surface)]/60 border-2 border-[var(--color-border)] select-none opacity-80"
              aria-label={`${link.name} channel (link pending)`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)] shrink-0">
                  {getSocialIcon(link.iconName)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-mono text-sm font-bold text-[var(--color-text)]">
                    {link.name}
                  </h3>
                  <span className="font-mono text-xs text-[var(--color-muted)] block truncate">
                    {link.handle}
                  </span>
                </div>
              </div>

              <span className="font-mono text-[10px] px-2 py-0.5 bg-[var(--color-surface-secondary)] text-[var(--color-muted)] border border-[var(--color-border)] font-semibold uppercase tracking-wider shrink-0">
                PENDING
              </span>
            </div>
          );
        })}
      </div>

      {/* Professional CV Download CTA Box */}
      <div className="max-w-xl mx-auto p-5 sm:p-6 bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.6)] text-center space-y-4 select-none">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
            <FileText className="w-4 h-4 text-[var(--color-primary)]" aria-hidden="true" />
            <span>OFFICIAL CURRICULUM VITAE</span>
          </div>
          <p className="text-xs text-[var(--color-muted)] font-sans max-w-md mx-auto leading-relaxed">
            Harvard-style academic &amp; software engineering CV. Formatted for professional opportunities, ATS readability, and grayscale printing.
          </p>
        </div>

        <div>
          <a
            href="/cv/M-Hanif-Al-Faiz-CV.pdf"
            download="M-Hanif-Al-Faiz-CV.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-bold uppercase transition-all duration-75 select-none bg-[var(--color-primary)] text-[#0B1020] hover:brightness-110 border-2 border-[var(--color-primary)] shadow-[3px_3px_0px_0px_#0B1020] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label="Download M. Hanif Al Faiz CV as PDF"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>DOWNLOAD CV &bull; PDF</span>
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-[var(--color-muted)]">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-primary)]" aria-hidden="true" />
          <span>A4 FORMAT &bull; 2 PAGES &bull; VERIFIED PORTFOLIO DATA</span>
        </div>
      </div>
    </section>
  );
}
