export type ProjectCategory =
  | "all"
  | "ai"
  | "smart-city"
  | "web"
  | "software"
  | "research"
  | "startup";

export type ProjectStatus = "prototype" | "active" | "completed" | "experiment";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  categories: ProjectCategory[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured: boolean;
  year?: number;
  achievement?: string;
  status?: ProjectStatus;
  keyHighlights?: string[];
  architectureNotes?: string[];
}
