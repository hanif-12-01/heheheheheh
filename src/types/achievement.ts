export interface Achievement {
  id: string;
  title: string;
  organizer?: string;
  result: string;
  year?: number;
  description?: string;
  relatedProject?: string;
  featured?: boolean;
  category?: "competition" | "grant" | "startup" | "academic";
  badgeIcon?: string;
}
