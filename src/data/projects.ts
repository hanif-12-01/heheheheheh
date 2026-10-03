import { Project } from "@/types/project";

export const FEATURED_PROJECTS: Project[] = [
  {
    slug: "wattwise-ai",
    title: "WattWise AI",
    shortDescription:
      "Intelligent energy management and decision-support startup platform for monitoring, predicting, and optimizing commercial electrical loads.",
    longDescription:
      "WattWise AI is an enterprise-oriented energy analytics platform combining IoT sensory streams with machine learning forecasting models. Built to help organizations identify high-consumption anomalies and optimize peak-load expenses, WattWise AI was selected as a Top 10 Finalist in the national PLN ICE 2026 Startup Competition.",
    categories: ["ai", "startup", "software"],
    technologies: ["Python", "FastAPI", "React", "Tailwind CSS", "Time-Series Forecasting", "IoT APIs"],
    githubUrl: "https://github.com/hanif-12-01/start-up-repo",
    featured: true,
    year: 2026,
    achievement: "Top 10 Finalist — PLN ICE 2026 Startup Competition",
    status: "active",
    keyHighlights: [
      "Top 10 national finalist in PLN Innovation & Clean Energy (ICE) 2026",
      "Predictive electrical load estimation using machine learning algorithms",
      "Actionable recommendations for enterprise energy demand shifting",
      "Integrated multi-role telemetry dashboard",
    ],
    architectureNotes: [
      "Microservice design separating high-throughput telemetry ingestion from web serving",
      "Time-series database pipeline for low-latency metric retrieval",
      "Lightweight responsive client for operations teams",
    ],
  },
  {
    slug: "purwokerto-intelligence-layer",
    title: "Purwokerto Intelligence Layer",
    shortDescription:
      "Geospatial urban analytics and civic decision-support framework unifying municipal data layers for Purwokerto.",
    longDescription:
      "The Purwokerto Intelligence Layer connects geospatial information systems (GIS) with municipal socio-economic indicators. It empowers citizens and regional administrators to visualize infrastructure distribution, identify underserved urban sectors, and make evidence-based policy allocations. This platform won 3rd Place at the national UNITY UNY 2026 Smart City Competition.",
    categories: ["smart-city", "research", "software", "web"],
    technologies: ["TypeScript", "Next.js", "GIS Mapping", "Python", "Spatial Analytics", "OpenData API"],
    githubUrl: "https://github.com/hanif-12-01/Purwokerto-intelligence-layer",
    featured: true,
    year: 2026,
    achievement: "3rd Place — Smart City Competition UNITY UNY 2026",
    status: "active",
    keyHighlights: [
      "3rd Place winner at national UNITY UNY Smart City Competition 2026",
      "Multi-layered interactive geospatial visualization for urban assets",
      "Data pipeline integrating public statistics with spatial coordinates",
      "Designed for both municipal planners and public citizen transparency",
    ],
    architectureNotes: [
      "Vector tile-based map rendering for fast mobile response",
      "Client-side geo-filtering with zero latency on standard devices",
      "Modular layer schema enabling easy integration of new civic sensors",
    ],
  },
  {
    slug: "simobs-bengkel",
    title: "SIMOBS — Bengkel Service Management",
    shortDescription:
      "Comprehensive full-stack workshop operations, inventory management, and digital customer dispatch application.",
    longDescription:
      "SIMOBS is an end-to-end service management system engineered for automotive workshops. It replaces physical paper logs with real-time technician job assignment, inventory tracking, spare-part stock alerts, and automated customer invoice generation.",
    categories: ["software", "web"],
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap / CSS", "RESTful Architecture"],
    githubUrl: "https://github.com/hanif-12-01/bengkel",
    featured: true,
    year: 2024,
    status: "completed",
    keyHighlights: [
      "Full inventory tracking with low-stock warning thresholds",
      "Technician dispatch workflow tracking vehicle status from intake to handover",
      "Relational database architecture optimized for transaction integrity",
      "Automated PDF bill generation and financial daily roll-ups",
    ],
    architectureNotes: [
      "Normalized relational schema handling orders, stock movements, and staff records",
      "Role-based access control (Admin, Cashier, Technician)",
      "Lightweight footprint designed for modest workshop POS hardware",
    ],
  },
  {
    slug: "lapor-mangan",
    title: "Lapor Mangan",
    shortDescription:
      "Location-aware culinary discovery and UMKM recommendation engine connecting local food vendors with hungry communities.",
    longDescription:
      "Lapor Mangan provides hyperlocal culinary visibility for informal micro, small, and medium culinary enterprises (UMKM). Featuring distance-based filtering, community recommendations, and vendor profile management, it acts as a grassroots digital bridge for local food entrepreneurs.",
    categories: ["web", "smart-city", "software"],
    technologies: ["JavaScript", "HTML5", "CSS3", "GIS / Geolocation", "Firebase / REST API"],
    githubUrl: "https://github.com/hanif-12-01/LAPORMANGAN",
    featured: true,
    year: 2024,
    status: "completed",
    keyHighlights: [
      "Hyperlocal discovery based on live user geolocation coordinates",
      "Targeted support for informal street food vendors and local culinary UMKM",
      "Interactive map pinpoints with price and specialty menu filters",
      "Lightweight progressive web design for mobile convenience",
    ],
    architectureNotes: [
      "Client-side proximity calculations utilizing Haversine algorithms",
      "Offline-friendly cached vendor listings for spotty mobile data connections",
      "Simplified UI tailored for non-technical street vendor listings",
    ],
  },
  {
    slug: "bernas-mbg",
    title: "Bernas MBG",
    shortDescription:
      "Civic technology multi-role dashboard engineered for public service meal tracking and institutional transparency.",
    longDescription:
      "Bernas MBG is a specialized administrative dashboard system designed to manage logistics, distribution checkpoints, and stakeholder reporting for public nutritional service initiatives. It enforces accountability across culinary providers, school coordinators, and administrative auditors.",
    categories: ["software", "web", "smart-city"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Role-Based Auth", "Analytics Charts"],
    githubUrl: "https://github.com/hanif-12-01/Bernas-MBG",
    featured: true,
    year: 2025,
    status: "active",
    keyHighlights: [
      "Multi-role role-based dashboard (Providers, Coordinators, Auditors)",
      "Daily meal batch verification with tamper-evident audit logs",
      "Distribution metric summaries with automated chart visualizations",
      "Strict data validation preventing duplicate distribution entries",
    ],
    architectureNotes: [
      "Server-side rendered dashboard views with strict access boundaries",
      "Real-time summary metric aggregations",
      "Accessible high-contrast UI compliant with administrative desk usage",
    ],
  },
  {
    slug: "ai-course-project",
    title: "AI Foundations — Algorithmic Experiments",
    shortDescription:
      "Academic research benchmark exploring search algorithms, heuristic optimization, and knowledge representation.",
    longDescription:
      "A comprehensive academic exploration of artificial intelligence fundamentals created during informatics coursework. Includes comparative evaluations between uninformed search algorithms (BFS, DFS) and informed heuristics (A*, Greedy Best-First), alongside rule-based inference models.",
    categories: ["ai", "research"],
    technologies: ["Python", "Jupyter Notebook", "NumPy", "Matplotlib", "Algorithm Design"],
    githubUrl: "https://github.com/hanif-12-01/Tubes-Dasar-Kecerdasan-Artificial",
    featured: true,
    year: 2025,
    status: "completed",
    keyHighlights: [
      "Comparative execution benchmarks across classic AI pathfinding algorithms",
      "Custom heuristic formulation with step-by-step visual state traversals",
      "Detailed theoretical analysis of space-time algorithmic complexity",
      "Reproducible Jupyter documentation and automated test suites",
    ],
    architectureNotes: [
      "Modular Python package structuring state graphs, cost functions, and solvers",
      "Plotting routines measuring node expansion counts vs path optimality",
    ],
  },
];

export const GITHUB_EXPERIMENTS: Project[] = [
  {
    slug: "sorting-algorithm-visualizer",
    title: "Algorithm Traversal & Sorting Lab",
    shortDescription: "Visual exploration of data structure sorting mechanics and time complexity.",
    categories: ["software"],
    technologies: ["C++", "Algorithms", "Data Structures"],
    featured: false,
    year: 2024,
    status: "experiment",
  },
  {
    slug: "computational-logic-sim",
    title: "Propositional Logic Solver",
    shortDescription: "Discrete mathematics truth table generator and clause validator.",
    categories: ["research"],
    technologies: ["Python", "Logic Systems"],
    featured: false,
    year: 2024,
    status: "experiment",
  },
  {
    slug: "micro-network-probe",
    title: "Socket Network Protocol Testbed",
    shortDescription: "Low-level socket programming experiments exploring packet exchange in TCP/UDP.",
    categories: ["software"],
    technologies: ["C", "Networking", "Linux"],
    featured: false,
    year: 2024,
    status: "experiment",
  },
];
