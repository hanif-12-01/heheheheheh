import { JourneyLevel } from "@/types/journey";

export const JOURNEY_LEVELS: JourneyLevel[] = [
  {
    semester: 1,
    title: "The Exploration Begins",
    subtitle: "Foundational immersion, campus organizations, and active learning",
    status: "completed",
    accentColor: "#5AA9FF",
    summary:
      "Entered Telkom University Purwokerto. Actively tested diverse domains through intense webinar participation, joining student association committees, and stepping into project leadership early.",
    activities: [
      {
        title: "Project Lead / Organizing Committee Chair — Responsive Program",
        category: "leadership",
        description: "Led and coordinated the flagship orientation and technical onboarding program for Informatics students.",
        highlight: true,
      },
      {
        title: "Participated in 15+ Webinars & Technical Workshops",
        category: "technology",
        description: "Rapidly absorbed foundational knowledge in algorithms, web development, and cloud computing.",
      },
      {
        title: "HIMA Informatics Internship",
        category: "organization",
        description: "Served in the student association apprenticeship to understand institutional governance.",
      },
      {
        title: "HMIF Equipment Division",
        category: "organization",
        description: "Managed logistics, inventory, and technical equipment for departmental activities.",
      },
      {
        title: "POSESIF Event Division & Host",
        category: "public-speaking",
        description: "Facilitated event production and served as official host / MC for the POSESIF initiative.",
        highlight: true,
      },
      {
        title: "Participated in 3+ Community Service Activities",
        category: "community",
        description: "Engaged directly in grassroots community empowerment and campus social outreach.",
      },
      {
        title: "PKM-K Participant",
        category: "research",
        description: "Drafted and submitted student entrepreneurial proposal under the national PKM framework.",
      },
      {
        title: "TULC Season 1 Security Staff",
        category: "organization",
        description: "Maintained venue order and logistics security during university league competition.",
      },
    ],
  },
  {
    semester: 2,
    title: "Taking More Responsibility",
    subtitle: "Executive governance, external grant funding, and national competition entry",
    status: "completed",
    accentColor: "#5DE4C7",
    summary:
      "Deepened institutional commitment at university-level student government (BEM KEMA), secured external grant funding from YIA KPP Mining, and entered GEMASTIK Smart City division.",
    activities: [
      {
        title: "Received Grant Funding from YIA KPP Mining",
        category: "achievement",
        description: "Awarded competitive project grant funding from Yayasan Inspirasi Anak Bangsa / KPP Mining.",
        highlight: true,
      },
      {
        title: "Secretary — BEM KEMA (Badan Eksekutif Mahasiswa)",
        category: "leadership",
        description: "Oversaw official documentation, administrative compliance, and organizational correspondence.",
        highlight: true,
      },
      {
        title: "BEM KEMA Internship & Event Division",
        category: "organization",
        description: "Orchestrated campus-wide executive events and student council initiatives.",
      },
      {
        title: "GEMASTIK — Smart City Division",
        category: "competition",
        description: "Prepared research proposal and prototype addressing urban challenges under GEMASTIK.",
        highlight: true,
      },
      {
        title: "School of Advocacy — BEM KEMA",
        category: "leadership",
        description: "Trained in policy formulation, student welfare advocacy, and institutional diplomacy.",
      },
      {
        title: "Continued Faculty Community Service Activities",
        category: "community",
        description: "Extended social impact programs supporting rural digital literacy and educational assistance.",
      },
    ],
  },
  {
    semester: 3,
    title: "Communication & Education",
    subtitle: "Public speaking refinement, youth education, and administrative leadership",
    status: "completed",
    accentColor: "#A78BFA",
    summary:
      "Honed public presentation and technical communication skills while serving as Education Member at Satria Muda and key organizer for TULC Season 2.",
    activities: [
      {
        title: "Host / MC — TULC Season 2",
        category: "public-speaking",
        description: "Maintained audience engagement, moderation, and speaker introductions across multi-day league.",
        highlight: true,
      },
      {
        title: "Secretary — TULC Season 2",
        category: "leadership",
        description: "Structured legal documents, participant registration datasets, and inter-team communications.",
      },
      {
        title: "Education Member — Satria Muda",
        category: "community",
        description: "Designed curriculum modules and shared learning assistance for peer study circles.",
        highlight: true,
      },
    ],
  },
  {
    semester: 4,
    title: "Competition & Research Arc",
    subtitle: "High-intensity innovation phase: national podiums, faculty research, and hackathons",
    status: "completed",
    accentColor: "#FFD166",
    summary:
      "The pivotal semester marked by multi-disciplinary competition podiums, faculty research contributions, hackathons, and presenting data science research to academic audiences.",
    activities: [
      {
        title: "3rd Place — Smart City Competition, UNITY UNY (2026)",
        category: "achievement",
        description: "Won 3rd place nationally for innovative smart-city civic data solution at Universitas Negeri Yogyakarta.",
        highlight: true,
      },
      {
        title: "Top 5 Finalist — GenBI Business Plan Competition (2026)",
        category: "achievement",
        description: "Pitched a technology-backed commercial enterprise model to banking and business judges.",
        highlight: true,
      },
      {
        title: "Speaker / Presenter — PKM Data Science",
        category: "public-speaking",
        description: "Delivered technical presentation on predictive data models and research methodologies.",
        highlight: true,
      },
      {
        title: "Participated in 2 Faculty PKM Projects",
        category: "research",
        description: "Collaborated with faculty mentors on high-impact student creativity proposals.",
        highlight: true,
      },
      {
        title: "Participated in 1 Faculty Research Project",
        category: "research",
        description: "Contributed data engineering and system testing to faculty academic publication pipeline.",
        highlight: true,
      },
      {
        title: "Hackathon x Digidaya",
        category: "competition",
        description: "Developed and submitted rapid application prototype under intensive hackathon timeframe.",
      },
      {
        title: "Sumatranomics Competition",
        category: "competition",
        description: "Authored technical-economic analytical paper addressing regional digital infrastructure.",
      },
      {
        title: "GEMASTIK — ICT Business Development",
        category: "competition",
        description: "Constructed commercial viability case and business model for software system.",
      },
      {
        title: "National Essay Competition",
        category: "competition",
        description: "Wrote critical essay evaluating technological adoption in public administrative sectors.",
      },
      {
        title: "National PKM Participation",
        category: "research",
        description: "Submitted comprehensive institutional innovation document under national guidelines.",
      },
    ],
  },
  {
    semester: 5,
    title: "Building Bigger Things",
    subtitle: "Current Level: Startup acceleration, large-scale events, and production prototypes",
    status: "current",
    accentColor: "#5DE4C7",
    summary:
      "Currently advancing startup ventures to national acceleration stages (Top 10 PLN ICE 2026) while coordinating academic seminars and inter-university study visits.",
    activities: [
      {
        title: "Top 10 Finalist — PLN ICE 2026 Startup Competition",
        category: "achievement",
        description: "Selected among the top 10 national energy & technology ventures in PLN Innovation & Clean Energy.",
        highlight: true,
      },
      {
        title: "Committee Member — Socio Information Course Seminar",
        category: "organization",
        description: "Organized departmental academic symposium examining the intersection of society and informatics.",
      },
      {
        title: "Consumption Committee — Satria Muda × MAPRES UIN SAIZU Study Visit",
        category: "organization",
        description: "Coordinated logistical hospitality and cross-institutional delegation welfare.",
      },
    ],
  },
];
