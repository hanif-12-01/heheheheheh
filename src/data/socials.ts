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
    url: "https://www.linkedin.com/in/hanif-faiz-05b36b31a",
    handle: "hanif-faiz-05b36b31a",
    iconName: "linkedin",
    isPlaceholder: false,
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:mhanifalfaiz@student.telkomuniversity.ac.id",
    handle: "mhanifalfaiz@student.telkomuniversity.ac.id",
    iconName: "mail",
    isPlaceholder: false,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/a.nippp__05",
    handle: "a.nippp__05",
    iconName: "instagram",
    isPlaceholder: false,
  },
];

export const CONTACT_COPY = {
  heading: "LET'S BE FRIENDS!",
  tagline: "Open to discussions around software engineering, research, AI prototypes, and civic technology.",
  subtext:
    "Whether exploring collaborative software builds, academic research, competition initiatives, or technology development, feel free to reach out via available public channels.",
};
