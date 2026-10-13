/**
 * HANIF.EXE — Owner-Verified Media Configuration (Phase 4D)
 *
 * Strict Credibility & Placeholder-First Policy:
 * Only populate these fields when authentic, owner-provided, verifiable media assets exist.
 * When undefined or null, components automatically render honest, accessible placeholders.
 *
 * Accepted sources:
 * - Authentic photograph supplied by M. Hanif Al Faiz
 * - Genuine screenshots of real application UI / notebooks
 *
 * Prohibited:
 * - AI-generated portraits pretending to depict the owner
 * - Stock photos or mock dashboards pretending to show real software
 * - Invented contact links or dead '#' anchors
 */

export interface MediaItemConfig {
  src?: string;
  alt?: string;
}

export interface MediaConfig {
  portrait?: MediaItemConfig;
  projectScreenshots?: Record<string, MediaItemConfig | undefined>;
}

export const MEDIA_CONFIG: MediaConfig = {
  // Personal Portrait: Authenticated photograph provided by owner
  portrait: {
    src: "/profile/hanif-portrait.jpeg",
    alt: "Portrait photograph of M. Hanif Al Faiz",
  },

  // Six Canonical Project Screenshots: Pending authentic captures
  projectScreenshots: {
    "wattwise-ai": undefined,
    "purwokerto-intelligence-layer": undefined,
    "simobs-bengkel": undefined,
    "lapor-mangan": undefined,
    "bernas-mbg": undefined,
    "ai-course-project": undefined,
  },
};
