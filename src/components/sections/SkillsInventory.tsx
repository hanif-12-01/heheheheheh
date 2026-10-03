import React from "react";
import { SKILLS_INVENTORY } from "@/data/skills";
import { PixelSectionTitle } from "@/components/pixel/PixelSectionTitle";
import { PixelCard } from "@/components/pixel/PixelCard";
import { PixelBadge } from "@/components/pixel/PixelBadge";
import { Boxes, Sparkles } from "lucide-react";

export function SkillsInventory() {
  return (
    <section
      id="skills"
      aria-label="Skill Inventory"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--color-border)]"
    >
      <PixelSectionTitle
        number="09"
        title="SKILL INVENTORY // ITEM LOADOUT"
        subtitle="Catalogued technical competencies, developer tooling, and interpersonal capabilities without inflated proficiency meters."
        badge="SKILL LOADOUT"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS_INVENTORY.map((cat) => (
          <PixelCard key={cat.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-[var(--color-primary)]" />
                  <h3 className="font-mono text-sm font-bold text-[var(--color-text)]">
                    {cat.name}
                  </h3>
                </div>
                <PixelBadge variant="primary" size="sm">
                  {cat.badge}
                </PixelBadge>
              </div>

              <p className="text-xs text-[var(--color-muted)] font-sans leading-relaxed">
                {cat.description}
              </p>
            </div>

            {/* Inventory Slots */}
            <div className="pt-3 border-t border-[var(--color-border)]/60">
              <div className="grid grid-cols-1 gap-1.5">
                {cat.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-2 bg-[var(--color-background)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] hover:border-[var(--color-primary)]/50 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[var(--color-primary)]" />
                      <span>{item}</span>
                    </span>
                    <span className="text-[10px] text-[var(--color-muted)] uppercase">EQUIPPED</span>
                  </div>
                ))}
              </div>
            </div>
          </PixelCard>
        ))}
      </div>
    </section>
  );
}
