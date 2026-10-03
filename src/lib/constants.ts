export const SITE_CONFIG = {
  name: "M. Hanif Al Faiz",
  title: "M. Hanif Al Faiz — Informatics Student & Technology Builder",
  description:
    "Portfolio of M. Hanif Al Faiz, an Informatics student exploring artificial intelligence, smart city technology, software engineering, research, competitions, and startup development.",
  tagline: "Code. Lead. Build. Explore.",
  identity: "HANIF.EXE",
  university: "Telkom University Purwokerto",
  degree: "Bachelor of Informatics",
  expectedGraduation: 2027,
  gpa: "3.66 / 4.00",
  emailPlaceholder: "mailto:contact@example.com",
  github: "https://github.com/hanif-12-01",
} as const;

export const NAV_ITEMS = [
  { label: "Spawn", href: "#hero", icon: "terminal" },
  { label: "Profile", href: "#profile", icon: "user" },
  { label: "About", href: "#about", icon: "book" },
  { label: "Interests", href: "#interests", icon: "cpu" },
  { label: "Journey", href: "#journey", icon: "map" },
  { label: "Trophy Room", href: "#trophies", icon: "trophy" },
  { label: "Project Lab", href: "#projects", icon: "folder-git-2" },
  { label: "Research", href: "#research", icon: "flask" },
  { label: "Skills", href: "#skills", icon: "boxes" },
  { label: "Contact", href: "#contact", icon: "mail" },
] as const;

export const SECTION_PET_MAP = {
  hero: "wave",
  profile: "idle",
  about: "reading",
  interests: "coding",
  journey: "walk",
  trophies: "trophy",
  projects: "coding",
  research: "rocket",
  skills: "idle",
  experiments: "coding",
  contact: "wave",
} as const;

export const PET_STATE_ASSETS: Record<string, string> = {
  idle: "/pet/idle/hanif-idle.png",
  wave: "/pet/wave/hanif-wave.png",
  walk: "/pet/walk/hanif-walk.png",
  coding: "/pet/coding/hanif-code.png",
  reading: "/pet/reading/hanif-read.png",
  trophy: "/pet/trophy/hanif-trophy.png",
  microphone: "/pet/microphone/hanif-microphone.png",
  rocket: "/pet/rocket/hanif-rocket.png",
  sleep: "/pet/sleep/hanif-sleep.png",
} as const;

