"use client";

import React from "react";
import { ProjectCategory } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  currentCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}

const CATEGORIES: { label: string; value: ProjectCategory }[] = [
  { label: "ALL", value: "all" },
  { label: "AI", value: "ai" },
  { label: "SMART CITY", value: "smart-city" },
  { label: "WEB", value: "web" },
  { label: "SOFTWARE", value: "software" },
  { label: "RESEARCH", value: "research" },
  { label: "STARTUP", value: "startup" },
];

export function ProjectFilters({
  currentCategory,
  onSelectCategory,
}: ProjectFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex flex-wrap gap-2 mb-8 select-none"
    >
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory === cat.value;
        return (
          <button
            key={cat.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(cat.value)}
            className={cn(
              "px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors duration-75 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)]",
              isActive
                ? "bg-[var(--color-primary)] text-[#0B1020] border-[var(--color-primary)] font-bold shadow-[2px_2px_0px_0px_#0B1020]"
                : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface-secondary)]"
            )}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
