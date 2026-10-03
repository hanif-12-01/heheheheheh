import React from "react";
import { PROFILE_DATA } from "@/data/profile";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { PixelWindow } from "@/components/pixel/PixelWindow";
import { Shield, Award, Users, Terminal, Mic, GraduationCap } from "lucide-react";

export function PlayerProfile() {
  const statIcons: Record<string, React.ReactNode> = {
    competitions: <Award className="w-5 h-5 text-[var(--color-achievement)]" />,
    leadership: <Shield className="w-5 h-5 text-[var(--color-blue)]" />,
    research: <GraduationCap className="w-5 h-5 text-[var(--color-purple)]" />,
    software: <Terminal className="w-5 h-5 text-[var(--color-primary)]" />,
    "public-speaking": <Mic className="w-5 h-5 text-[#F43F5E]" />,
  };

  return (
    <section
      id="profile"
      aria-label="Player Profile"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      <PixelSectionTitle
        number="02"
        title="PLAYER PROFILE & ATTRIBUTES"
        subtitle="Qualitative status indicators and academic milestones — verified by active contributions."
        badge="RPG STATS"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Player ID Card */}
        <div className="lg:col-span-4">
          <PixelWindow
            title="CHARACTER_SHEET.TXT"
            statusBadge="ACTIVE"
            className="h-full"
          >
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 bg-[var(--color-background)] border border-[var(--color-border)] space-y-1.5">
                <div className="text-[10px] text-[var(--color-muted)] uppercase">PLAYER NAME</div>
                <div className="text-sm font-bold text-[var(--color-text)]">
                  {PROFILE_DATA.name}
                </div>
                <div className="text-[11px] text-[var(--color-primary)]">
                  HANDLE: {PROFILE_DATA.handle}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)]">
                  <div className="text-[9px] text-[var(--color-muted)] uppercase">INSTITUTION</div>
                  <div className="font-semibold mt-1">Telkom Univ Purwokerto</div>
                </div>
                <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)]">
                  <div className="text-[9px] text-[var(--color-muted)] uppercase">DEGREE</div>
                  <div className="font-semibold mt-1">Informatics</div>
                </div>
                <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)]">
                  <div className="text-[9px] text-[var(--color-muted)] uppercase">CUMULATIVE GPA</div>
                  <div className="font-bold text-[var(--color-achievement)] mt-1">
                    {PROFILE_DATA.gpa}
                  </div>
                </div>
                <div className="p-2.5 bg-[var(--color-background)] border border-[var(--color-border)]">
                  <div className="text-[9px] text-[var(--color-muted)] uppercase">EXP. GRADUATION</div>
                  <div className="font-semibold mt-1">{PROFILE_DATA.expectedGraduation}</div>
                </div>
              </div>

              <div className="p-3 bg-[var(--color-background)] border border-[var(--color-border)]">
                <div className="text-[9px] text-[var(--color-muted)] uppercase mb-1">
                  CURRENT QUEST LEVEL
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-primary)] font-bold">
                    LEVEL 0{PROFILE_DATA.currentLevel} (Semester 5)
                  </span>
                  <span className="text-[var(--color-muted)]">IN PROGRESS</span>
                </div>
              </div>
            </div>
          </PixelWindow>
        </div>

        {/* Right Column: RPG Attribute Grid (NO fake percentages!) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROFILE_DATA.stats.map((stat) => (
            <PixelCard
              key={stat.id}
              className="flex flex-col justify-between"
              variant={stat.id === "competitions" ? "achievement" : "default"}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-[var(--color-surface-secondary)] border border-[var(--color-border)]">
                      {statIcons[stat.id] || <Award className="w-5 h-5 text-[var(--color-primary)]" />}
                    </span>
                    <span className="font-mono text-sm font-bold tracking-wider text-[var(--color-text)]">
                      {stat.name}
                    </span>
                  </div>
                  <PixelBadge variant={stat.id === "competitions" ? "achievement" : "primary"} size="sm">
                    {stat.rank}
                  </PixelBadge>
                </div>

                <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                  {stat.highlight}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-2 border-t border-[var(--color-border)]/60">
                {stat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-1.5 py-0.5 bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  );
}
