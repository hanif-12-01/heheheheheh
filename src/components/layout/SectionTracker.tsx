"use client";

import { useActiveSection } from "@/hooks/useActiveSection";

const HOMEPAGE_SECTIONS = [
  "hero",
  "profile",
  "about",
  "interests",
  "journey",
  "trophies",
  "projects",
  "research",
  "skills",
  "experiments",
  "contact",
];

export function SectionTracker() {
  // Observes active section on client-side and triggers pet state changes
  useActiveSection(HOMEPAGE_SECTIONS);
  return null;
}
