export interface ResearchCompetitionItem {
  id: string;
  title: string;
  category: "Research" | "PKM" | "Hackathon" | "Business Competition" | "Smart City" | "GEMASTIK" | "Public Speaking";
  role: string;
  event: string;
  year: number;
  highlight?: string;
  status: "Completed" | "Podium" | "Finalist" | "Published / Presented";
}

export const RESEARCH_COMPETITIONS_DATA: ResearchCompetitionItem[] = [
  {
    id: "rc-1",
    title: "Smart City Urban Infrastructure Analytics",
    category: "Smart City",
    role: "Developer & Presenter",
    event: "UNITY UNY National Competition",
    year: 2026,
    highlight: "3rd Place Nationally. Focused on spatial civic intelligence for public service delivery.",
    status: "Podium",
  },
  {
    id: "rc-2",
    title: "WattWise AI Startup Acceleration",
    category: "Business Competition",
    role: "Technical Team Member / Developer",
    event: "PLN Innovation & Clean Energy (ICE) 2026",
    year: 2026,
    highlight: "Top 10 Finalist nationally in clean energy and technology category.",
    status: "Finalist",
  },
  {
    id: "rc-3",
    title: "Technology Business Plan Model",
    category: "Business Competition",
    role: "Team Member & Presenter",
    event: "GenBI National Business Plan Competition",
    year: 2026,
    highlight: "Top 5 Finalist nationally with commercialized software viability proposal.",
    status: "Finalist",
  },
  {
    id: "rc-4",
    title: "Predictive Analytics & Model Validation",
    category: "Public Speaking",
    role: "Session Speaker / Presenter",
    event: "PKM Data Science Academic Seminar",
    year: 2025,
    highlight: "Presented statistical data models and empirical research findings.",
    status: "Published / Presented",
  },
  {
    id: "rc-5",
    title: "Faculty Research Project Assistance",
    category: "Research",
    role: "Student Research Contributor",
    event: "Faculty of Informatics Research Grant",
    year: 2025,
    highlight: "Collaborated on data collection, feature extraction, and algorithm execution benchmarking.",
    status: "Completed",
  },
  {
    id: "rc-6",
    title: "Faculty PKM Project (Two Initiatives)",
    category: "PKM",
    role: "Proposal Contributor & Developer",
    event: "Program Kreativitas Mahasiswa (Faculty-Sponsored)",
    year: 2025,
    highlight: "Co-authored two formal scientific project proposals for national review.",
    status: "Completed",
  },
  {
    id: "rc-7",
    title: "GEMASTIK Smart City & ICT Business Development",
    category: "GEMASTIK",
    role: "Competition Participant (Software & Business)",
    event: "GEMASTIK National ICT Competition",
    year: 2024,
    highlight: "Dual-track participation in Smart City solutions and ICT Business Development.",
    status: "Completed",
  },
  {
    id: "rc-8",
    title: "Hackathon x Digidaya Rapid Prototype",
    category: "Hackathon",
    role: "Prototype Developer",
    event: "Hackathon x Digidaya",
    year: 2024,
    highlight: "48-hour sprint building functional digital prototype for civic engagement.",
    status: "Completed",
  },
];
