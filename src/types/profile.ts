export type PlayerPositioning =
  | "Informatics Student"
  | "Technology Builder"
  | "AI Explorer"
  | "Smart City Enthusiast"
  | "Software Developer"
  | "Research & Competition Enthusiast";

export interface PlayerStatItem {
  id: string;
  name: string;
  category: "competitions" | "leadership" | "research" | "software" | "public-speaking";
  rank: string; // Qualitative rank e.g. "Active Contender", "Team Lead", "Investigator"
  highlight: string;
  tags: string[];
}

export interface PlayerProfileData {
  name: string;
  handle: string;
  tagline: string;
  university: string;
  degree: string;
  expectedGraduation: number;
  gpa: string;
  currentLevel: number;
  bioShort: string;
  bioExtended: string[];
  positioning: PlayerPositioning[];
  stats: PlayerStatItem[];
}
