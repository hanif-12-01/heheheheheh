/**
 * HANIF.EXE — World Asset Registry
 *
 * Normalized production asset registry for Journey props, Achievement medals/trophies,
 * Technology domain illustrations, and UI pixel icons.
 *
 * Raw archive source (immutable): public/World Assets/
 * Normalized production directory: public/pixel/
 */

export type WorldAssetTier = "A" | "B" | "C";

export type WorldAssetRole =
  | "small-item"
  | "medium-prop"
  | "large-landmark"
  | "featured-illustration"
  | "illustration"
  | "icon"
  | "badge"
  | "effect";

export interface WorldAssetItem {
  id: string;
  name: string;
  src: string;
  category: "journey" | "achievements" | "tech" | "ui";
  tier: WorldAssetTier;
  role: WorldAssetRole;
  alt: string;
  recommendedDisplaySize: {
    width: number;
    height: number;
  };
  semester?: number;
  minRecommendedSize?: number;
}

export const journeyAssets = {
  backpack: {
    id: "semester-1-backpack",
    name: "Semester 1 Orientation Backpack",
    src: "/pixel/journey/semester-1-backpack.png",
    category: "journey",
    tier: "B",
    role: "medium-prop",
    alt: "Pixel art teal backpack with laptop keychain for Semester 1",
    recommendedDisplaySize: { width: 140, height: 168 },
    semester: 1,
  },
  organizationBuilding: {
    id: "semester-2-organization-building",
    name: "Semester 2 Campus Organization Building",
    src: "/pixel/journey/semester-2-organization-building.png",
    category: "journey",
    tier: "B",
    role: "large-landmark",
    alt: "Pixel art modern campus organization building for Semester 2",
    recommendedDisplaySize: { width: 220, height: 142 },
    semester: 2,
  },
  book: {
    id: "semester-3-book",
    name: "Semester 3 Open Study Book",
    src: "/pixel/journey/semester-3-book.png",
    category: "journey",
    tier: "B",
    role: "small-item",
    alt: "Pixel art open book with teal bookmark for Semester 3",
    recommendedDisplaySize: { width: 120, height: 84 },
    semester: 3,
  },
  microphone: {
    id: "semester-3-microphone",
    name: "Semester 3 Speaker Microphone",
    src: "/pixel/journey/semester-3-microphone.png",
    category: "journey",
    tier: "B",
    role: "small-item",
    alt: "Pixel art stage microphone for Semester 3 leadership and speaking",
    recommendedDisplaySize: { width: 110, height: 122 },
    semester: 3,
  },
  researchDocument: {
    id: "semester-4-research-document",
    name: "Semester 4 Research Document",
    src: "/pixel/journey/semester-4-research-document.png",
    category: "journey",
    tier: "B",
    role: "medium-prop",
    alt: "Pixel art analysis research document for Semester 4",
    recommendedDisplaySize: { width: 140, height: 123 },
    semester: 4,
  },
  researchFlask: {
    id: "semester-4-research-flask",
    name: "Semester 4 Laboratory Research Flask",
    src: "/pixel/journey/semester-4-research-flask.png",
    category: "journey",
    tier: "B",
    role: "medium-prop",
    alt: "Pixel art muted teal laboratory research flask for Semester 4",
    recommendedDisplaySize: { width: 110, height: 145 },
    semester: 4,
  },
  trophy: {
    id: "semester-4-trophy",
    name: "Semester 4 Competition Trophy",
    src: "/pixel/journey/semester-4-trophy.png",
    category: "journey",
    tier: "B",
    role: "medium-prop",
    alt: "Pixel art golden competition trophy for Semester 4 milestones",
    recommendedDisplaySize: { width: 130, height: 152 },
    semester: 4,
  },
  rocket: {
    id: "semester-5-rocket",
    name: "Semester 5 Innovation Rocket",
    src: "/pixel/journey/semester-5-rocket.png",
    category: "journey",
    tier: "B",
    role: "large-landmark",
    alt: "Pixel art teal rocket with flame trail for Semester 5 startup incubation",
    recommendedDisplaySize: { width: 170, height: 191 },
    semester: 5,
  },
} as const satisfies Record<string, WorldAssetItem>;

export const achievementAssets = {
  trophy: {
    id: "achievement-trophy",
    name: "Championship Gold Trophy",
    src: "/pixel/achievements/achievement-trophy.png",
    category: "achievements",
    tier: "A",
    role: "badge",
    alt: "Pixel art grand gold trophy with star emblem",
    recommendedDisplaySize: { width: 150, height: 166 },
  },
  medal: {
    id: "achievement-medal",
    name: "Honors Ribbon Medal",
    src: "/pixel/achievements/achievement-medal.png",
    category: "achievements",
    tier: "A",
    role: "badge",
    alt: "Pixel art gold medal with tricolor ribbon",
    recommendedDisplaySize: { width: 110, height: 168 },
  },
  laurel: {
    id: "achievement-laurel",
    name: "Victory Laurel Wreath",
    src: "/pixel/achievements/achievement-laurel.png",
    category: "achievements",
    tier: "A",
    role: "badge",
    alt: "Pixel art golden victory laurel wreath",
    recommendedDisplaySize: { width: 160, height: 145 },
  },
  confetti: {
    id: "achievement-confetti",
    name: "Celebration Confetti Burst",
    src: "/pixel/achievements/achievement-confetti.png",
    category: "achievements",
    tier: "B",
    role: "effect",
    alt: "Pixel art celebratory confetti ribbon burst",
    recommendedDisplaySize: { width: 160, height: 122 },
  },
  sparkle: {
    id: "achievement-sparkle",
    name: "Radiant Achievement Sparkle",
    src: "/pixel/achievements/achievement-sparkle.png",
    category: "achievements",
    tier: "B",
    role: "effect",
    alt: "Pixel art radiant sparkle stars effect",
    recommendedDisplaySize: { width: 140, height: 126 },
  },
  sheet: {
    id: "achievement-sheet",
    name: "Achievement Master Asset Sheet",
    src: "/pixel/achievements/achievement-sheet.png",
    category: "achievements",
    tier: "B",
    role: "illustration",
    alt: "Pixel art master achievement sheet archive",
    recommendedDisplaySize: { width: 360, height: 265 },
  },
} as const satisfies Record<string, WorldAssetItem>;

export const techAssets = {
  smartCity: {
    id: "tech-smart-city",
    name: "Smart City Isometric Diorama",
    src: "/pixel/tech/tech-smart-city.png",
    category: "tech",
    tier: "A",
    role: "featured-illustration",
    alt: "Tier A featured pixel art futuristic smart city isometric diorama",
    recommendedDisplaySize: { width: 440, height: 320 },
  },
  database: {
    id: "tech-database",
    name: "Futuristic Database Stack",
    src: "/pixel/tech/tech-database.png",
    category: "tech",
    tier: "B",
    role: "illustration",
    alt: "Pixel art cylindrical database storage stack with teal neon glow",
    recommendedDisplaySize: { width: 150, height: 180 },
  },
  codeEditor: {
    id: "tech-code-editor",
    name: "Retro Code Editor Window",
    src: "/pixel/tech/tech-code-editor.png",
    category: "tech",
    tier: "B",
    role: "illustration",
    alt: "Pixel art desktop retro code editor IDE window",
    recommendedDisplaySize: { width: 220, height: 157 },
  },
  gisMap: {
    id: "tech-gis-map",
    name: "Folded GIS Map with Location Pin",
    src: "/pixel/tech/tech-gis-map.png",
    category: "tech",
    tier: "B",
    role: "illustration",
    alt: "Pixel art folded topographic GIS map with turquoise marker pin",
    recommendedDisplaySize: { width: 200, height: 156 },
  },
  aiChip: {
    id: "tech-ai-chip",
    name: "Luminous AI Processor Chip",
    src: "/pixel/tech/tech-ai-chip.png",
    category: "tech",
    tier: "B",
    role: "illustration",
    alt: "Pixel art glowing neural network AI processor chip",
    recommendedDisplaySize: { width: 160, height: 148 },
  },
  server: {
    id: "tech-server",
    name: "Neon Server Rack Stack",
    src: "/pixel/tech/tech-server.png",
    category: "tech",
    tier: "B",
    role: "illustration",
    alt: "Pixel art multi-rack server tower with flashing network LEDs",
    recommendedDisplaySize: { width: 180, height: 149 },
  },
} as const satisfies Record<string, WorldAssetItem>;

export const uiAssets = {
  arrowRight: {
    id: "ui-arrow-right",
    name: "Arrow Right",
    src: "/pixel/ui/ui-arrow-right.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI arrow pointing right",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  arrowLeft: {
    id: "ui-arrow-left",
    name: "Arrow Left",
    src: "/pixel/ui/ui-arrow-left.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI arrow pointing left",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  arrowDown: {
    id: "ui-arrow-down",
    name: "Arrow Down",
    src: "/pixel/ui/ui-arrow-down.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI arrow pointing down",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  star: {
    id: "ui-star",
    name: "Gold Star",
    src: "/pixel/ui/ui-star.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI golden rating star",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  sparkle: {
    id: "ui-sparkle",
    name: "UI Sparkle",
    src: "/pixel/ui/ui-sparkle.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI glowing sparkle accent",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  mapPin: {
    id: "ui-map-pin",
    name: "Map Pin",
    src: "/pixel/ui/ui-map-pin.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI location marker pin",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  folder: {
    id: "ui-folder",
    name: "Folder",
    src: "/pixel/ui/ui-folder.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI project folder directory",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  code: {
    id: "ui-code",
    name: "Code Brackets",
    src: "/pixel/ui/ui-code.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI angle brackets code tag",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  checkpoint: {
    id: "ui-checkpoint",
    name: "Level Checkpoint Flag",
    src: "/pixel/ui/ui-checkpoint.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI milestone checkpoint flag",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  check: {
    id: "ui-check",
    name: "Checkmark Tick",
    src: "/pixel/ui/ui-check.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI verification checkmark",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
  externalLink: {
    id: "ui-external-link",
    name: "External Link",
    src: "/pixel/ui/ui-external-link.png",
    category: "ui",
    tier: "C",
    role: "icon",
    alt: "Pixel UI diagonal arrow external link window",
    recommendedDisplaySize: { width: 32, height: 32 },
    minRecommendedSize: 32,
  },
} as const satisfies Record<string, WorldAssetItem>;

export const allWorldAssets = [
  ...Object.values(journeyAssets),
  ...Object.values(achievementAssets),
  ...Object.values(techAssets),
  ...Object.values(uiAssets),
];
