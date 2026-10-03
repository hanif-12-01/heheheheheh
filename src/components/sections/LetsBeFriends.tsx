import React from "react";
import { SOCIAL_LINKS, CONTACT_COPY } from "@/data/socials";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelButton } from "@/components/pixel/PixelButton";
import { Mail, Link2, ExternalLink, HeartHandshake } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons/SocialIcons";

export function LetsBeFriends() {
  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "github":
        return <GithubIcon className="w-5 h-5 text-[var(--color-primary)]" />;
      case "linkedin":
        return <LinkedinIcon className="w-5 h-5 text-[var(--color-blue)]" />;
      case "instagram":
        return <InstagramIcon className="w-5 h-5 text-[#E1306C]" />;
      case "mail":
        return <Mail className="w-5 h-5 text-[var(--color-achievement)]" />;
      default:
        return <Link2 className="w-5 h-5 text-[var(--color-purple)]" />;
    }
  };

  return (
    <section
      id="contact"
      aria-label="Let's Be Friends"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]">
          <HeartHandshake className="w-4 h-4 text-[var(--color-achievement)]" />
          <span>COMM_CHANNEL // CONNECT</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight text-[var(--color-text)]">
          {CONTACT_COPY.heading}
        </h2>

        <p className="text-sm sm:text-base text-[var(--color-primary)] font-mono">
          &quot;{CONTACT_COPY.tagline}&quot;
        </p>

        <p className="text-xs sm:text-sm text-[var(--color-muted)] font-sans">
          {CONTACT_COPY.subtext}
        </p>
      </div>

      {/* Social and Communication Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {SOCIAL_LINKS.map((link) => (
          <PixelCard
            key={link.id}
            className="flex items-center justify-between p-4"
            variant={link.id === "github" ? "primary" : "default"}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
                {getSocialIcon(link.iconName)}
              </div>
              <div>
                <h3 className="font-mono text-xs font-bold text-[var(--color-text)]">
                  {link.name}
                </h3>
                <span className="font-mono text-[11px] text-[var(--color-muted)] block">
                  {link.handle}
                </span>
              </div>
            </div>

            {link.isPlaceholder ? (
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[var(--color-surface-secondary)] text-[var(--color-muted)] border border-[var(--color-border)]">
                COMING SOON
              </span>
            ) : (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-[var(--color-primary)] text-[#0B1020] hover:brightness-110 shadow-[2px_2px_0px_0px_#0B1020]"
                title={`Visit ${link.name}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </PixelCard>
        ))}
      </div>
    </section>
  );
}
