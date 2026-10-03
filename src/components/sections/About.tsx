import React from "react";
import { PROFILE_DATA } from "@/data/profile";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { BookOpen, Sparkles, Target, Compass } from "lucide-react";

export function About() {
  return (
    <section
      id="about"
      aria-label="About Hanif"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      <PixelSectionTitle
        number="03"
        title="ABOUT HANIF"
        subtitle="Bridging academic informatics, civic engineering, and real-world system development."
        badge="LORE"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Narrative Biography Cards */}
        <div className="lg:col-span-8 space-y-6">
          <PixelCard className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-border)]">
              <BookOpen className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] font-bold">
                The Origin Story &amp; Mindset
              </span>
            </div>
            {PROFILE_DATA.bioExtended.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-[var(--color-text)] font-sans leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </PixelCard>

          {/* Core Philosophy Triad */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <PixelCard className="space-y-2 p-4" hoverable={false}>
              <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-mono text-xs font-bold">
                <Target className="w-4 h-4" />
                <span>BUILD TO SOLVE</span>
              </div>
              <p className="text-xs text-[var(--color-muted)] font-sans">
                Technology should serve practical community needs, not merely accumulate technical debt.
              </p>
            </PixelCard>

            <PixelCard className="space-y-2 p-4" hoverable={false}>
              <div className="flex items-center gap-1.5 text-[var(--color-blue)] font-mono text-xs font-bold">
                <Compass className="w-4 h-4" />
                <span>CONTINUOUS R&amp;D</span>
              </div>
              <p className="text-xs text-[var(--color-muted)] font-sans">
                Active involvement in faculty research, student creativity initiatives, and national hackathons.
              </p>
            </PixelCard>

            <PixelCard className="space-y-2 p-4" hoverable={false}>
              <div className="flex items-center gap-1.5 text-[var(--color-achievement)] font-mono text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>SHARED LEADERSHIP</span>
              </div>
              <p className="text-xs text-[var(--color-muted)] font-sans">
                Belief in strong team coordination, transparent governance, and mentorship.
              </p>
            </PixelCard>
          </div>
        </div>

        {/* Right Column: Quick Status Manifest */}
        <div className="lg:col-span-4 space-y-4">
          <PixelCard variant="primary" className="space-y-4">
            <h3 className="font-mono text-xs uppercase font-bold text-[var(--color-primary)] tracking-wider">
              CURRENT FOCUS (2026)
            </h3>
            <ul className="space-y-2.5 text-xs font-mono text-[var(--color-text)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)]">&gt;</span>
                <span>Advancing WattWise AI startup energy solutions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)]">&gt;</span>
                <span>Refining Purwokerto GIS spatial intelligence layers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)]">&gt;</span>
                <span>Studying Semester 5 informatics coursework &amp; research</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--color-primary)]">&gt;</span>
                <span>Coordinating academic seminars &amp; community visits</span>
              </li>
            </ul>
          </PixelCard>

          <PixelCard className="space-y-3">
            <div className="text-[10px] font-mono uppercase text-[var(--color-muted)]">
              ACADEMIC VERIFICATION
            </div>
            <div className="text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">CAMPUS:</span>
                <span className="text-[var(--color-text)]">Telkom Purwokerto</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">FACULTY:</span>
                <span className="text-[var(--color-text)]">Informatics</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-muted)]">STATUS:</span>
                <span className="text-[var(--color-primary)] font-bold">Active Student</span>
              </div>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
}
