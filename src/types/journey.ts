export type JourneyActivityCategory =
  | "leadership"
  | "organization"
  | "competition"
  | "research"
  | "technology"
  | "public-speaking"
  | "community"
  | "achievement"
  | "startup";

export interface JourneyActivity {
  title: string;
  category: JourneyActivityCategory;
  description?: string;
  highlight?: boolean;
}

export interface JourneyLevel {
  semester: number;
  title: string;
  subtitle?: string;
  status?: "completed" | "current" | "upcoming";
  accentColor?: string;
  summary?: string;
  activities: JourneyActivity[];
}
