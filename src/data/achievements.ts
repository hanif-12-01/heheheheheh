import { Achievement } from "@/types/achievement";

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "smart-city-uny-2026",
    title: "Smart City Competition",
    organizer: "UNITY UNY (Universitas Negeri Yogyakarta)",
    result: "3rd Place",
    year: 2026,
    description:
      "Awarded 3rd Place nationally for developing an integrated smart-city civic data solution designed to improve urban public service accessibility.",
    relatedProject: "purwokerto-intelligence-layer",
    featured: true,
    category: "competition",
    badgeIcon: "trophy",
  },
  {
    id: "pln-ice-2026",
    title: "PLN ICE Startup Competition",
    organizer: "PT PLN (Persero)",
    result: "Top 10 Finalist",
    year: 2026,
    description:
      "Selected as a top 10 national finalist in the PLN Innovation & Clean Energy (ICE) 2026 Startup Competition with WattWise AI, focused on electricity-cost decision support and forecasting for Indonesian small businesses and property operators.",
    relatedProject: "wattwise-ai",
    featured: true,
    category: "startup",
    badgeIcon: "award",
  },
  {
    id: "genbi-2026",
    title: "GenBI Business Plan Competition",
    organizer: "Generasi Baru Indonesia (GenBI)",
    result: "Top 5 Finalist",
    year: 2026,
    description:
      "Recognized in the top 5 national finalists for designing a viable, technology-driven business model with quantifiable financial and social impact.",
    featured: true,
    category: "competition",
    badgeIcon: "star",
  },
  {
    id: "yia-kpp-mining",
    title: "YIA KPP Mining Project Grant",
    organizer: "Yayasan Inspirasi Anak Bangsa & PT Kalimantan Prima Persada",
    result: "Grant Recipient",
    year: 2024,
    description:
      "Secured competitive development funding to implement community technology initiatives and student-led development projects.",
    featured: true,
    category: "grant",
    badgeIcon: "check-circle",
  },
];
