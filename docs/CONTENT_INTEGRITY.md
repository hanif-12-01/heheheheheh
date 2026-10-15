# HANIF.EXE Content Integrity Audit

> **Phase 2.5 — Credibility & Data-Quality Pass**  
> Audit Date: October 2026  
> Purpose: Align all technical claims, project descriptions, roles, competition outcomes, tech stacks, and architecture notes in `HANIF.EXE` with actual source material and verified repository evidence.

---

## 1. Evidence Classification Framework

All facts and claims across the portfolio are categorized under three distinct evidence classes:

1. **`REPO_VERIFIED`**: The claim, technology stack, system architecture, or feature set is directly supported and corroborated by public Git repository source code, commit history, configuration files, and package manifests.
2. **`USER_PROVIDED`**: Personal activities, leadership appointments, or competition awards that originate from the portfolio dataset but cannot be independently verified through a public software repository alone.
3. **`NEEDS_REVIEW`**: The data has minor timeline or naming ambiguities, lacks public corroboration, or requires direct owner confirmation before elevation. (Kept conservative in public UI; never exposed as raw "NEEDS_REVIEW" badges to visitors).

---

## 2. Projects Audit Ledger

> **Owner authorship correction — 15 October 2026:** SIMOBS (`simobs-bengkel`) was developed by the owner's friend, not by M. Hanif Al Faiz. The owner explicitly requested its removal. It is excluded from both portfolio modes, the project directory and case studies, the profile summary, and both language-specific CVs. Repository hosting or technical source verification does not establish authorship. Do not reintroduce this project as the owner's work.

> **Owner award-attribution correction — 15 October 2026:** The 3rd Place Smart City UNITY UNY 2026 result belongs to **CIVICTWIN Semarang**, repository [`hanif-12-01/Unity-semarang`](https://github.com/hanif-12-01/Unity-semarang). Purwokerto Intelligence Layer remains in the portfolio as **Experimental material / Bahan eksperimen**, without a competition award. The exact placement and event remain owner-provided; repository inspection verifies the technical implementation, not the award independently.

### 1. WattWise AI

- **Portfolio Slug**: `wattwise-ai`
- **Source Repository**: [`https://github.com/hanif-12-01/start-up-repo`](https://github.com/hanif-12-01/start-up-repo)
- **Active Directory**: `wattwise-vercel/`
- **Current Stage**: Ideation–Pre-Seed / Working MVP (Competition & Pilot Validation).
- **Target Audience & Purpose**: Electricity-cost decision-support platform tailored for Indonesian small property operators (kos / boarding houses, rental ruko) and energy-intensive SMEs (laundries, F&B, frozen-food storage, photocopy shops, workshops). Transforms manual meter readings, billing records, and meter photos into consumption transparency, browser-local N-BEATS load forecasting, and actionable appliance audit recommendations.
- **Verified Scope**:
  - Utility billing history and tariff tier tracking (R-1, B-1, etc.).
  - Browser-local electricity meter OCR scanning and digitization via Tesseract.js.
  - Client-side time-series load forecasting using ONNX Runtime Web executing an N-BEATS neural network model locally without remote GPU servers.
  - Appliance audit checklist, peak demand shifting guides, and expense reduction scenarios.
- **Verified Stack**:
  - `Next.js 16` (App Router)
  - `React 19`
  - `TypeScript` (strict)
  - `Tailwind CSS v4`
  - `PostgreSQL` (Neon Serverless)
  - `Drizzle ORM`
  - `Better Auth`
  - `ONNX Runtime Web` (`onnxruntime-web`)
  - `Tesseract.js`
  - `Zod`, `Vitest`, `GSAP`
- **Removed / Corrected Claims**:
  - *Removed*: Python / FastAPI backend (historical prototype in `wattwise-laravel`/unfeatured repo).
  - *Removed*: Enterprise-scale energy infrastructure, official PLN operational system, or certified energy auditor claims.
  - *Removed*: Real-time smart meter hardware platform, IoT sensory streams, and high-throughput telemetry ingestion pipelines.
  - *Removed*: Time-series database pipeline and microservices architecture claims.
- **Evidence Class**: `REPO_VERIFIED`

---

### 2. CIVICTWIN Semarang

- **Portfolio Slug**: `civictwin-semarang`
- **Source Repository**: [`https://github.com/hanif-12-01/Unity-semarang`](https://github.com/hanif-12-01/Unity-semarang)
- **Technical Sources**: [README](https://github.com/hanif-12-01/Unity-semarang/blob/main/README.md), [package.json](https://github.com/hanif-12-01/Unity-semarang/blob/main/package.json), [project documentation](https://github.com/hanif-12-01/Unity-semarang/blob/main/PROJECT_DOCUMENTATION.md), and [application routes](https://github.com/hanif-12-01/Unity-semarang/blob/main/src/App.tsx).
- **Current Stage**: Competition proof of concept.
- **Verified Scope**: Semarang district-priority exploration, prototype centroid mapping, simulated citizen feedback, rule-based CivicSense triage, policy simulation and policy-brief drafting, OPD follow-up demonstrations, and public transparency.
- **Verified Stack**: React 18, TypeScript, Vite, Tailwind CSS, React Router, Leaflet / React Leaflet.
- **Mandatory Disclosures**: Demonstration data; localStorage role demo and local state; prototype centroid markers rather than official GIS boundaries. No production backend, database, authentication, external AI API, or live government feed is claimed.
- **Award**: 3rd Place — Smart City Competition UNITY UNY 2026 (`USER_PROVIDED`, corrected directly by the owner).
- **Technical Evidence Class**: `REPO_VERIFIED`.

---

### 3. Purwokerto Intelligence Layer

- **Portfolio Slug**: `purwokerto-intelligence-layer`
- **Source Repository**: [`https://github.com/hanif-12-01/Purwokerto-intelligence-layer`](https://github.com/hanif-12-01/Purwokerto-intelligence-layer)
- **Current Stage / Caption**: Experimental material / Bahan eksperimen. Uses simulated data. No competition placement is attributed to this project.
- **Verified Scope**:
  - Interactive Smart City civic intelligence decision-support prototype for Purwokerto (covering 4 central subdistricts: Purwokerto Barat, Purwokerto Timur, Purwokerto Selatan, Purwokerto Utara).
  - Multi-Criteria Decision Making (MCDM) weighted formula ($\sum I_i \times W_i$) allowing users to dynamically adjust policy weights across infrastructure, economic, environmental, and public health indicators.
  - Citizen feedback signal logging, policy brief drafting, and resolution accountability tracking.
  - **Mandatory Disclosure**: The urban indicators and municipal statistics are mock / simulation datasets generated for academic competition modeling. It is an academic prototype, NOT an official government operational system.
- **Verified Stack**:
  - `React 19`
  - `TypeScript`
  - `Vite 8`
  - `Tailwind CSS v4`
  - `Leaflet` & `React Leaflet`
  - `React Router v7`
  - `Lucide React`
- **Removed / Corrected Claims**:
  - *Removed*: Next.js framework claim.
  - *Removed*: Python backend and OpenData API ingestion pipeline.
  - *Removed*: Vector tile-based map rendering claims (Leaflet raster tiles + GeoJSON overlays are used).
  - *Removed*: Real-time civic sensor integration and live municipal government data feeds.
  - *Disclosed*: Explicit prototype and simulated data status clearly indicated in project highlights.
- **Evidence Class**: `REPO_VERIFIED`

---

### 4. Lapor Mangan

- **Portfolio Slug**: `lapor-mangan`
- **Source Repository**: [`https://github.com/hanif-12-01/LAPORMANGAN`](https://github.com/hanif-12-01/LAPORMANGAN)
- **Verified Scope**:
  - Hyperlocal culinary discovery web prototype for informal street food and UMKM vendors in Purwokerto.
  - Client-side proximity calculations utilizing the Haversine trigonometric formula from user GPS coordinates.
  - Live weather integration via Open-Meteo REST API delivering weather-appropriate culinary recommendations (e.g., hot soups/beverages when precipitation is detected).
  - Rule-based interactive recommendation assistant (`MakanBot` in `chatbot.js`).
  - Leaflet mapping with categorized vendor markers and LocalStorage bookmarking.
- **Verified Stack**:
  - `HTML5`
  - `CSS3`
  - `JavaScript (ES6+)`
  - `Leaflet JS`
  - `HTML5 Geolocation API`
  - `Open-Meteo Weather API`
  - `LocalStorage`
- **Removed / Corrected Claims**:
  - *Removed*: Firebase / Cloud database backend claims (application runs entirely client-side with Open-Meteo API and browser LocalStorage).
  - *Removed*: Commercial production scale claims; accurately labeled as a functional community prototype.
- **Evidence Class**: `REPO_VERIFIED`

---

### 5. Bernas MBG

- **Portfolio Slug**: `bernas-mbg`
- **Source Repository**: [`https://github.com/hanif-12-01/Bernas-MBG`](https://github.com/hanif-12-01/Bernas-MBG)
- **Verified Scope**:
  - Multi-dashboard proof-of-concept (PoC) prototype simulating stakeholder transparency for the national Makan Bergizi Gratis (MBG) program.
  - 6 Role-tailored dashboard views under `apps/`:
    1. `apps/guru.html` (School Coordinator / Teacher)
    2. `apps/murid.html` (Student nutritional review)
    3. `apps/pemda.html` (Local Government regional allocation)
    4. `apps/super_admin.html` (System administrator)
    5. `apps/vendor.html` (Catering logistics and kitchen batching)
    6. `apps/wali.html` (Parent oversight and allergen notification)
  - Synchronized via browser LocalStorage (`mbg_poc_state_v1`, `mbg_sso_session`).
  - **Mandatory Disclosure**: Prototype proof of concept using simulated stakeholder records and browser local storage.
- **Verified Stack**:
  - `HTML5`
  - `React 18` (UMD Standalone)
  - `Babel Standalone`
  - `Tailwind CSS` (CDN)
  - `LocalStorage State Synchronization`
- **Removed / Corrected Claims**:
  - *Removed*: Next.js framework claim.
  - *Removed*: TypeScript claim.
  - *Removed*: Server-Side Rendering (SSR) claim.
  - *Removed*: Production SQL/NoSQL database and production multi-tenant auth claims.
- **Evidence Class**: `REPO_VERIFIED`

---

### 6. Fuzzy Rain Risk Index (Tugas Besar Dasar Kecerdasan Artificial)

- **Portfolio Slug**: `ai-course-project`
- **Source Repository**: [`https://github.com/hanif-12-01/Tubes-Dasar-Kecerdasan-Artificial`](https://github.com/hanif-12-01/Tubes-Dasar-Kecerdasan-Artificial)
- **Verified Scope**:
  - Coursework project for *Dasar Kecerdasan Artificial* exploring rule-based Fuzzy Logic to estimate 6-hour rain risk levels for outdoor activities in Indonesia.
  - Implemented entirely *from scratch* in Python without using third-party fuzzy libraries (`scikit-fuzzy`).
  - Implements two classical fuzzy inference methods:
    1. **Fuzzy Mamdani** (centroid defuzzification)
    2. **Fuzzy Sugeno** (weighted average defuzzification)
  - Evaluated against Kaggle dataset: *Indonesia Hourly Weather for Rain Prediction* covering meteorological parameters (humidity, temperature, pressure, cloud cover, wind speed).
- **Verified Stack**:
  - `Python`
  - `Jupyter Notebook` (`tubes.ipynb`)
  - `NumPy`
  - `Pandas`
  - `Matplotlib`
  - `Fuzzy Logic (From Scratch)`
- **Removed / Corrected Claims**:
  - *Corrected Title*: Updated from generic "AI Foundations — Algorithmic Experiments" to "Fuzzy Rain Risk Index — AI Coursework".
  - *Removed*: Pathfinding algorithms (BFS, DFS, A*, Greedy Best-First) which were previously placeholder hallucinations.
  - *Removed*: Heuristic graph traversal claims; accurately replaced with Fuzzy Mamdani & Sugeno inference engine implementation.
- **Evidence Class**: `REPO_VERIFIED`

---

### 7. GitHub Experiments

- **Algorithm Traversal & Sorting Lab**:
  - Repository: [`https://github.com/hanif-12-01/Practice-algorithms`](https://github.com/hanif-12-01/Practice-algorithms)
  - Stack: `C++`, `Algorithms`, `Data Structures`
  - Evidence: `REPO_VERIFIED`
- **Socket Client-Proxy Network Testbed**:
  - Repository: [`https://github.com/hanif-12-01/tubes-jarkom-client-proxy-server`](https://github.com/hanif-12-01/tubes-jarkom-client-proxy-server)
  - Stack: `C`, `Networking`, `Sockets`
  - Evidence: `REPO_VERIFIED`
- **Propositional Logic Solver**:
  - Discrete mathematics truth table generator.
  - Evidence: `USER_PROVIDED`

---

## 3. Personal Experience & Achievements Audit

| Claim | Portfolio Locations | Evidence Type | Consistency Result | Resolution / Action |
| :--- | :--- | :--- | :--- | :--- |
| **3rd Place Smart City UNITY UNY 2026** | `achievements.ts`, `journey.ts` (Sem 4), `projects.ts` (`civictwin-semarang`), `profile.ts`, `researchCompetitions.ts` (`rc-1`) | `USER_PROVIDED` award / `REPO_VERIFIED` technical implementation | **CORRECTED** to CIVICTWIN Semarang on 15 October 2026 | Preserved exactly: 3rd Place, 2026, UNITY UNY (Universitas Negeri Yogyakarta). PIL remains experimental without this award. |
| **Top 10 Finalist PLN ICE 2026** | `achievements.ts`, `journey.ts` (Sem 5), `projects.ts` (`wattwise-ai`), `profile.ts`, `researchCompetitions.ts` (`rc-2`) | `USER_PROVIDED` / `REPO_VERIFIED` (Repo exists) | **CONSISTENT** across all 5 files | Preserved exactly: Top 10 Finalist, 2026, PT PLN (Persero) Innovation & Clean Energy. |
| **Top 5 Finalist GenBI Business Plan 2026** | `achievements.ts`, `journey.ts` (Sem 4), `profile.ts`, `researchCompetitions.ts` (`rc-3`) | `USER_PROVIDED` | **CONSISTENT** across all 4 files | Preserved exactly: Top 5 Finalist, 2026, Generasi Baru Indonesia. |
| **YIA KPP Mining Project Grant Recipient (2024)** | `achievements.ts`, `journey.ts` (Sem 2) | `USER_PROVIDED` | **CONSISTENT** across both files | Preserved exactly: Grant Recipient, 2024, Yayasan Inspirasi Anak Bangsa & PT KPP Mining. |
| **Speaker / Presenter PKM Data Science (2025)** | `journey.ts` (Sem 4), `researchCompetitions.ts` (`rc-4`), `profile.ts` | `USER_PROVIDED` | **CONSISTENT** across all 3 files | Preserved: Academic seminar presenter on predictive modeling methodologies. |
| **2 Faculty PKM Projects & 1 Faculty Research Project (2025)** | `journey.ts` (Sem 4), `researchCompetitions.ts` (`rc-5`, `rc-6`), `profile.ts` | `USER_PROVIDED` | **CONSISTENT** across all 3 files | Preserved: Collaborated on two faculty-sponsored PKM proposals and one faculty research project. |
| **GEMASTIK Smart City & ICT Business (2024)** | `journey.ts` (Sem 2 & 4), `researchCompetitions.ts` (`rc-7`) | `USER_PROVIDED` | **CONSISTENT** | Preserved: GEMASTIK participant across Smart City and ICT Business divisions. |
| **Responsive Program Project Lead / Chair (Sem 1)** | `journey.ts` (Sem 1), `profile.ts` | `USER_PROVIDED` | **CONSISTENT** | Preserved: Organizing Committee Chair for department orientation. |
| **Secretary BEM KEMA (Sem 2)** | `journey.ts` (Sem 2), `profile.ts` | `USER_PROVIDED` | **CONSISTENT** | Preserved: Student Executive Board secretarial governance role. |
| **Host / MC TULC Season 2 & POSESIF** | `journey.ts` (Sem 1 & 3), `profile.ts` | `USER_PROVIDED` | **CONSISTENT** | Preserved: Master of ceremony and event moderation roles. |

---

## 4. Role & Attribution De-inflation Adjustments

To prevent grandiose or speculative titles, all role descriptors across `researchCompetitions.ts` and `profile.ts` were audited and adjusted to conservative, evidence-based wording:

| Item ID / Section | Previous Role / Label | Adjusted Role / Label | Rationale |
| :--- | :--- | :--- | :--- |
| `rc-1` (UNITY UNY) | `Lead Developer & Presenter` | `Developer & Presenter` | De-inflated "Lead" prefix; accurately reflects core engineering and presentation delivery. |
| `rc-2` (PLN ICE) | `Hacker / Technical Co-founder` | `Technical Team Member / Developer` | Replaced startup buzzwords ("Hacker / Technical Co-founder") with conservative, professional title. |
| `rc-3` (GenBI) | `Team Leader` | `Team Member & Presenter` | Grounded title focusing on verifiable contribution to business plan pitching. |
| `rc-4` (PKM Data Science) | `Key Presenter / Speaker` | `Session Speaker / Presenter` | Removed "Key" self-elevating adjective. |
| `rc-5` (Faculty Research) | `Student Research Assistant` | `Student Research Contributor` | Clarifies student contribution role. |
| `rc-6` (Faculty PKM) | `Project Member & Developer` | `Proposal Contributor & Developer` | Accurately describes PKM proposal co-authoring and prototyping. |
| `rc-7` (GEMASTIK) | `Software & Business Analyst` | `Competition Participant (Software & Business)` | Accurately reflects competition track participation. |
| `rc-8` (Hackathon) | `Full-Stack Builder` | `Prototype Developer` | Replaced marketing term with precise engineering role. |
| `profile.ts` (Stats) | `Rank: National Finalist` | `Rank: Competition Finalist` | Evidence-based qualification. |
| `profile.ts` (Stats) | `Rank: Project & Organization Lead` | `Rank: Project & Team Lead` | Clear, professional qualification. |
| `profile.ts` (Stats) | `Rank: Academic Contributor` | `Rank: Academic & PKM Contributor` | Reflects PKM and faculty research contributions. |
| `profile.ts` (Stats) | `Rank: Full-Stack Builder` | `Rank: Application & Prototype Developer` | Replaced buzzword with grounded engineering title. |
| `profile.ts` (Stats) | `Rank: Host & Presenter` | `Rank: Event Host & Presenter` | Evidence-based communication role. |

---

## 5. Duplicate Profile Data Consolidation

- **Canonical Source of Truth**: `src/data/profile.ts` (`PROFILE_DATA`)
- **Consolidation Changes**:
  - `src/lib/constants.ts` (`SITE_CONFIG`): Updated to directly derive personal academic attributes (`name`, `university`, `degree`, `expectedGraduation`, `gpa`, `tagline`, `identity`) from `PROFILE_DATA`.
  - `src/components/sections/Hero.tsx`:
    - Replaced hardcoded `"Telkom University Purwokerto"` with `{PROFILE_DATA.university}`.
    - Replaced hardcoded `"GPA: 3.66"` with dynamic expression derived from `{PROFILE_DATA.gpa}`.
    - Replaced hardcoded `"CLASS OF 2027"` with `{PROFILE_DATA.expectedGraduation}`.
  - `src/components/sections/PlayerProfile.tsx`:
    - Replaced hardcoded `"Telkom Univ Purwokerto"` with `{PROFILE_DATA.university}`.
    - Replaced hardcoded `"Informatics"` with `{PROFILE_DATA.degree}`.

---

## 6. Needs Manual Review Items

The following items are preserved conservatively in code and documented here for manual review by the portfolio owner:

1. **LinkedIn & Instagram Profile URLs**:
   - Status: Kept as explicit placeholders (`isPlaceholder: true`, `url: "#"`) in `src/data/socials.ts`.
   - Action needed: Provide actual public profile URLs when ready to publish.
2. **Official Contact Email**:
   - Status: Kept as placeholder `hanif [at] placeholder.com`.
   - Action needed: Provide preferred public contact email address.
3. **Faculty Research Publication / Pre-print Reference**:
   - Status: Recorded in `rc-5` as "Faculty Research Project Assistance" with completed status.
   - Action needed: If a formal paper DOI or university publication link becomes available, it can be attached.
