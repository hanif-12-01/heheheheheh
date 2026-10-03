import { PlayerProfileData } from "@/types/profile";

export const PROFILE_DATA: PlayerProfileData = {
  name: "M. Hanif Al Faiz",
  handle: "HANIF.EXE",
  tagline: "Code. Lead. Build. Explore.",
  university: "Telkom University Purwokerto",
  degree: "Bachelor of Informatics",
  expectedGraduation: 2027,
  gpa: "3.66 / 4.00",
  currentLevel: 5,
  bioShort:
    "Informatics student at Telkom University Purwokerto exploring artificial intelligence, smart city technology, software engineering, and community-driven innovation.",
  bioExtended: [
    "I am an undergraduate student currently at Level 05 (Semester 5) with a strong passion for solving real-world challenges through technology.",
    "My focus centers on developing intelligent software architectures, civic data applications, and competitive business models. I actively engage in academic research, national competitions, organizational governance, and technical leadership.",
    "Rather than treating code as isolated syntax, I treat every project as an interactive system built to provide tangible decision support for communities, institutions, and users.",
  ],
  positioning: [
    "Informatics Student",
    "Technology Builder",
    "AI Explorer",
    "Smart City Enthusiast",
    "Software Developer",
    "Research & Competition Enthusiast",
  ],
  stats: [
    {
      id: "competitions",
      name: "Competitions",
      category: "competitions",
      rank: "National Finalist",
      highlight: "3rd Place UNITY UNY 2026, Top 10 PLN ICE 2026, Top 5 GenBI 2026",
      tags: ["Smart City", "Startup", "Business Plan", "Hackathon"],
    },
    {
      id: "leadership",
      name: "Leadership",
      category: "leadership",
      rank: "Project & Organization Lead",
      highlight: "Project Lead Responsive Program, BEM KEMA Secretary, Division Roles",
      tags: ["Team Lead", "Governance", "Event Coordination"],
    },
    {
      id: "research",
      name: "Research & PKM",
      category: "research",
      rank: "Academic Contributor",
      highlight: "2 Faculty PKMs, 1 Faculty Research Project, PKM Data Science Presenter",
      tags: ["PKM-K", "Faculty Research", "Data Science"],
    },
    {
      id: "software",
      name: "Software & Systems",
      category: "software",
      rank: "Full-Stack Builder",
      highlight: "Purwokerto Intelligence Layer, WattWise AI, SIMOBS, Bernas MBG, Lapor Mangan",
      tags: ["Full-Stack", "GIS", "AI Prototypes", "Decision Support"],
    },
    {
      id: "public-speaking",
      name: "Communication",
      category: "public-speaking",
      rank: "Host & Presenter",
      highlight: "PKM Data Science Speaker, Host TULC Season 2, Host POSESIF",
      tags: ["Public Speaking", "Master of Ceremony", "Technical Sharing"],
    },
  ],
};
