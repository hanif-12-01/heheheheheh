import { SkillCategory } from "@/types/skill";

export const SKILLS_INVENTORY: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming Languages",
    badge: "Core Stack",
    description: "Multi-paradigm languages applied in coursework, algorithmic problem solving, and software development.",
    items: ["C", "C++", "Python", "Java", "Golang"],
  },
  {
    id: "fundamentals",
    name: "Programming Fundamentals",
    badge: "Discipline",
    description: "Theoretical and algorithmic building blocks underpinning computational efficiency.",
    items: [
      "Algorithmic Thinking",
      "Programming Logic",
      "Problem Solving",
      "Basic Data Structures",
      "Debugging & Code Tracing",
    ],
  },
  {
    id: "software-dev",
    name: "Software Development",
    badge: "Engineering",
    description: "Methodologies for structuring, engineering, and verifying functional software solutions.",
    items: [
      "Software Engineering Fundamentals",
      "Application Development",
      "Requirement Analysis",
      "Software Testing & Validation",
    ],
  },
  {
    id: "tools",
    name: "Developer Tools & Platforms",
    badge: "Toolbox",
    description: "Environments, containerization tools, databases, and versioning pipelines.",
    items: [
      "Visual Studio Code",
      "Git",
      "GitHub",
      "MySQL",
      "Figma",
      "XAMPP",
      "Visual Studio",
      "Android Studio",
      "Docker",
    ],
  },
  {
    id: "communication",
    name: "Teaching & Communication",
    badge: "Outreach",
    description: "Conveying technical concepts clearly across academic, peer, and public symposiums.",
    items: [
      "Technical Communication",
      "Public Speaking",
      "Conference / Event Presentation",
      "Peer Mentorship & Assistance",
      "Knowledge Sharing",
    ],
  },
  {
    id: "leadership",
    name: "Leadership & Collaboration",
    badge: "Governance",
    description: "Organizing multidisciplinary teams towards shared deadlines, events, and deliverables.",
    items: [
      "Team Leadership",
      "Team Coordination",
      "Project Coordination",
      "Time Management",
      "Collaborative Problem Solving",
    ],
  },
];
