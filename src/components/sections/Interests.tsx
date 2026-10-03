import React from "react";
import { INTERESTS_DATA } from "@/data/interests";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { BrainCircuit, MapPin, CodeXml, Rocket, FlaskConical } from "lucide-react";

export function Interests() {
  const iconComponents: Record<string, React.ReactNode> = {
    "brain-circuit": <BrainCircuit className="w-5 h-5" />,
    "map-pin": <MapPin className="w-5 h-5" />,
    "code-xml": <CodeXml className="w-5 h-5" />,
    rocket: <Rocket className="w-5 h-5" />,
    "flask-conical": <FlaskConical className="w-5 h-5" />,
  };

  return (
    <section
      id="interests"
      aria-label="Tech Interests"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      <PixelSectionTitle
        number="04"
        title="PRIMARY TECH INTERESTS"
        subtitle="Core focus domains spanning data intelligence, geospatial systems, and software engineering."
        badge="DOMAINS"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTERESTS_DATA.map((interest) => (
          <PixelCard
            key={interest.id}
            className="flex flex-col justify-between"
            variant="default"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 border-2 border-[var(--color-border)] bg-[var(--color-surface-secondary)] flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
                  style={{ color: interest.color }}
                >
                  {iconComponents[interest.iconName] || <BrainCircuit className="w-5 h-5" />}
                </div>
                <PixelBadge variant="outline" size="sm">
                  {interest.keyFocus.split("&")[0]?.trim()}
                </PixelBadge>
              </div>

              <div>
                <h3 className="font-mono text-base font-bold text-[var(--color-text)]">
                  {interest.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[var(--color-muted)] font-sans leading-relaxed">
                  {interest.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--color-border)]/60">
                <span className="text-[10px] font-mono uppercase text-[var(--color-primary)] block mb-2 font-bold">
                  FOCUS TOPICS:
                </span>
                <ul className="space-y-1">
                  {interest.topics.map((topic) => (
                    <li
                      key={topic}
                      className="text-xs font-mono text-[var(--color-text)] flex items-center gap-1.5"
                    >
                      <span className="text-[var(--color-primary)] text-[10px]">■</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PixelCard>
        ))}
      </div>
    </section>
  );
}
