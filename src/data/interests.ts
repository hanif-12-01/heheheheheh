import { InterestTopic } from "@/types/interest";

export const INTERESTS_DATA: InterestTopic[] = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    summary:
      "Investigating predictive algorithms, recommendation frameworks, and machine learning models designed to assist humans in data-informed decision making.",
    iconName: "brain-circuit",
    keyFocus: "Decision Support & Predictive Systems",
    color: "#5DE4C7",
    topics: [
      "Forecasting & Predictive Modeling",
      "Recommendation Systems",
      "Intelligent Applications",
      "AI-Assisted Decision Support",
    ],
  },
  {
    id: "smart-city",
    title: "Smart City & Civic Tech",
    summary:
      "Bridging geospatial information systems (GIS), urban metrics, and public service infrastructures to enhance citizen transparency and municipal workflow.",
    iconName: "map-pin",
    keyFocus: "Urban Intelligence & Civic Infrastructure",
    color: "#5AA9FF",
    topics: [
      "Urban Intelligence & Dashboards",
      "Geographic Information Systems (GIS)",
      "Public Services & Municipal Tech",
      "Civic Decision-Support Systems",
    ],
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    summary:
      "Constructing resilient full-stack applications, scalable APIs, and modular architectures with a focus on clean maintainability and responsive UX.",
    iconName: "code-xml",
    keyFocus: "Full-Stack Web & Modular Architecture",
    color: "#A78BFA",
    topics: [
      "Web Application Development",
      "Application Architecture",
      "Frontend & Interactive UI",
      "Backend & RESTful APIs",
      "Full-Stack Integrated Systems",
    ],
  },
  {
    id: "startup-product",
    title: "Product & Startup Development",
    summary:
      "Transforming socio-technical challenges into sustainable MVP prototypes with disciplined problem-solution validation and market testing.",
    iconName: "rocket",
    keyFocus: "MVP Prototyping & Business Validation",
    color: "#FFD166",
    topics: [
      "Minimum Viable Product (MVP)",
      "Problem-Solution Validation",
      "Product Experimentation",
      "Technology-Based Business Solutions",
    ],
  },
  {
    id: "research-experimentation",
    title: "Research & Experimentation",
    summary:
      "Conducting rigorous academic research, participating in student creativity programs (PKM), and testing novel algorithmic hypotheses in competitions.",
    iconName: "flask-conical",
    keyFocus: "Academic Inquiry & Prototype R&D",
    color: "#38BDF8",
    topics: [
      "PKM (Program Kreativitas Mahasiswa)",
      "Academic Faculty Research",
      "National Competitions & Hackathons",
      "Experimental Prototypes & Benchmarks",
    ],
  },
];
