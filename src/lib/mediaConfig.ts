/**
 * HANIF.EXE — Owner-Verified Media Configuration (Phase 4D.1)
 *
 * Strict Credibility & Placeholder-First Policy:
 * Only populate these fields when authentic, owner-provided, verifiable media assets exist.
 * When undefined or null, components automatically render honest, accessible placeholders.
 *
 * Accepted sources:
 * - Authentic photograph supplied by M. Hanif Al Faiz
 * - Genuine screenshots of real application UI / notebooks (optional archive only)
 *
 * Prohibited:
 * - Invented portraits pretending to depict the owner
 * Owner-authorized Phase 4D.3 pixel transformation of the authentic photograph
 * is a separate portrait study, pending the owner's likeness approval.
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

  // Optional legacy archive configuration. No homepage, directory or case study
  // consumes screenshot previews in Phase 4D.1. Captures are not a launch requirement.
  projectScreenshots: {
    "wattwise-ai": undefined,
    "civictwin-semarang": undefined,
    "purwokerto-intelligence-layer": undefined,
    "lapor-mangan": undefined,
    "bernas-mbg": undefined,
    "ai-course-project": undefined,
  },
};
