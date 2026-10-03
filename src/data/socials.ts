export interface SocialLink {
  id: string;
  name: string;
  url: string;
  handle: string;
  iconName: string;
  isPlaceholder?: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/hanif-12-01",
    handle: "hanif-12-01",
    iconName: "github",
    isPlaceholder: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "#",
    handle: "M. Hanif Al Faiz (Pending URL)",
    iconName: "linkedin",
    isPlaceholder: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "#",
    handle: "@hanif (Pending URL)",
    iconName: "instagram",
    isPlaceholder: true,
  },
  {
    id: "email",
    name: "Email",
    url: "#",
    handle: "hanif [at] placeholder.com",
    iconName: "mail",
    isPlaceholder: true,
  },
  {
    id: "other",
    name: "Other Link",
    url: "#",
    handle: "TBA",
    iconName: "link-2",
    isPlaceholder: true,
  },
];

export const CONTACT_COPY = {
  heading: "LET'S BE FRIENDS!",
  tagline: "I'm always open to meeting new people, discussing ideas, and building something cool.",
  subtext:
    "Whether you want to discuss AI models, smart city frameworks, collaborate on a competition, or simply connect as a fellow developer, feel free to reach out!",
};
