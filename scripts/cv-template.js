/** Approved Harvard CV layout. Shared by EN, ID and the browser print document. */
function generateCvHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>M. Hanif Al Faiz — Curriculum Vitae</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm 12mm 15mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: Arial, "Helvetica Neue", Helvetica, "Segoe UI", sans-serif;
      font-size: 8.8pt;
      line-height: 1.32;
      color: #1a1a1a;
      background-color: #ffffff;
      -webkit-font-smoothing: antialiased;
    }

    /* Header */
    .header {
      text-align: center;
      padding-bottom: 6px;
      margin-bottom: 8px;
      border-bottom: 1.5px solid #222222;
    }

    .header h1 {
      font-size: 17pt;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #000000;
      margin-bottom: 2px;
    }

    .header .subtitle {
      font-size: 9.5pt;
      font-weight: 600;
      color: #333333;
      margin-bottom: 3px;
    }

    .header .contact-links {
      font-size: 8.5pt;
      color: #444444;
    }

    .header .contact-links a {
      color: #111111;
      text-decoration: underline;
    }

    /* Section Styling */
    .cv-section {
      margin-bottom: 6px;
      page-break-inside: auto;
    }

    .section-title {
      font-size: 9.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #000000;
      border-bottom: 1px solid #333333;
      padding-bottom: 2px;
      margin-top: 8px;
      margin-bottom: 4px;
      page-break-after: avoid;
    }

    .item-block {
      margin-bottom: 5px;
      page-break-inside: avoid;
    }

    .summary-text {
      font-size: 8.5pt;
      line-height: 1.38;
      text-align: justify;
      color: #222222;
    }

    /* Item Headers */
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 8.8pt;
      margin-bottom: 1px;
    }

    .item-title {
      font-weight: 700;
      color: #000000;
    }

    .item-date {
      font-size: 8.5pt;
      font-weight: 600;
      color: #444444;
      white-space: nowrap;
    }

    .item-sub {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 8.3pt;
      font-style: italic;
      color: #333333;
      margin-bottom: 2px;
    }

    .item-tech {
      font-size: 8pt;
      font-weight: 600;
      color: #444444;
      margin-bottom: 2px;
    }

    /* Bullets */
    ul.bullet-list {
      list-style-type: disc;
      margin-left: 15px;
      margin-top: 1px;
      margin-bottom: 2px;
    }

    ul.bullet-list li {
      font-size: 8.3pt;
      line-height: 1.32;
      color: #222222;
      margin-bottom: 1.5px;
      text-align: justify;
    }

    ul.bullet-list li strong {
      color: #000000;
    }

    /* Skills Table */
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1px;
    }

    .skills-table tr {
      page-break-inside: avoid;
    }

    .skills-table td {
      padding: 1.5px 0;
      font-size: 8.3pt;
      vertical-align: top;
      line-height: 1.32;
    }

    .skills-category {
      font-weight: 700;
      color: #111111;
      width: 25%;
      padding-right: 8px;
    }

    .skills-items {
      color: #222222;
      width: 75%;
    }

    /* Honors Table */
    .honors-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1px;
    }

    .honors-table tr {
      page-break-inside: avoid;
    }

    .honors-table td {
      padding: 1.5px 0;
      font-size: 8.3pt;
      vertical-align: baseline;
      line-height: 1.32;
    }

    .honor-title {
      font-weight: 700;
      color: #111111;
      width: 78%;
    }

    .honor-date {
      text-align: right;
      font-weight: 600;
      color: #444444;
      width: 22%;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="header">
    <h1>M. Hanif Al Faiz</h1>
    <div class="subtitle">Informatics Undergraduate &bull; Software &amp; Intelligent Systems Prototyping</div>
    <div class="contact-links">
      <span>Telkom University Purwokerto</span>
      &bull;
      <span>GitHub: <a href="https://github.com/hanif-12-01">github.com/hanif-12-01</a></span>
    </div>
  </header>

  <!-- PROFESSIONAL SUMMARY -->
  <section class="cv-section item-block">
    <h2 class="section-title" style="margin-top: 0;">Professional Summary</h2>
    <p class="summary-text">
      Undergraduate Informatics student at Telkom University Purwokerto focusing on software engineering, intelligent systems, and civic technology. Experience includes building verifiable decision-support prototypes, client-side machine learning inference pipelines, and full-stack web applications. Recognized as a national competition finalist and podium recipient with active contributions to faculty research, student creativity initiatives, and university student governance.
    </p>
  </section>

  <!-- EDUCATION -->
  <section class="cv-section item-block">
    <h2 class="section-title">Education</h2>
    <div class="item-header">
      <span class="item-title">Telkom University Purwokerto</span>
      <span class="item-date">Purwokerto, Indonesia</span>
    </div>
    <div class="item-sub">
      <span>Bachelor of Informatics (S1 Candidate)</span>
      <span>Expected: 2027</span>
    </div>
    <ul class="bullet-list">
      <li><strong>Academic Status:</strong> Current Cumulative GPA: <strong>3.66 / 4.00</strong> | Current Status: <strong>Semester 5 (In Progress)</strong>.</li>
      <li><strong>Relevant Coursework:</strong> Data Structures &amp; Algorithms, Artificial Intelligence, Software Engineering, Database Systems, Computer Networks, Discrete Mathematics, Object-Oriented Programming.</li>
    </ul>
  </section>

  <!-- TECHNICAL SKILLS -->
  <!-- Derived 100% from canonical src/data/skills.ts (SKILLS_INVENTORY) -->
  <section class="cv-section item-block">
    <h2 class="section-title">Technical Capabilities</h2>
    <table class="skills-table">
      <tr>
        <td class="skills-category">Programming Languages:</td>
        <td class="skills-items">C, C++, Python, Java, Golang</td>
      </tr>
      <tr>
        <td class="skills-category">Software Development:</td>
        <td class="skills-items">Software Engineering Fundamentals, Application Development, Requirement Analysis, Software Testing &amp; Validation</td>
      </tr>
      <tr>
        <td class="skills-category">Developer Tools &amp; Platforms:</td>
        <td class="skills-items">Visual Studio Code, Git, GitHub, MySQL, Docker, Figma, XAMPP, Android Studio, Visual Studio</td>
      </tr>
      <tr>
        <td class="skills-category">Foundations &amp; Logic:</td>
        <td class="skills-items">Algorithmic Thinking, Programming Logic, Problem Solving, Basic Data Structures, Debugging &amp; Code Tracing</td>
      </tr>
      <tr>
        <td class="skills-category">Communication &amp; Leadership:</td>
        <td class="skills-items">Technical Communication, Public Speaking, Conference / Event Presentation, Team Leadership, Team Coordination, Project Coordination, Collaborative Problem Solving</td>
      </tr>
    </table>
  </section>

  <!-- FEATURED PROJECTS -->
  <section class="cv-section">
    <h2 class="section-title">Key Engineering Projects</h2>

    <!-- WattWise AI -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title">WattWise AI &mdash; Electricity-Cost Decision-Support Platform</span>
        <span class="item-date">2026</span>
      </div>
      <div class="item-tech">Next.js 16, React 19, TypeScript, PostgreSQL, Drizzle ORM, ONNX Runtime Web, Tesseract.js | Working MVP</div>
      <ul class="bullet-list">
        <li>Developed a working MVP decision-support platform tailored for Indonesian small property operators (kos, boarding houses) and energy-intensive SMEs to optimize utility expenses.</li>
        <li>Implemented client-side N-BEATS load forecasting executing directly in the browser via ONNX Runtime Web, eliminating remote GPU server dependency.</li>
        <li>Built privacy-preserving in-browser optical character recognition using Tesseract.js for physical meter photo scanning and tariff tier calculation.</li>
        <li>Recognized as a <strong>Top 10 Finalist</strong> in the PLN Innovation &amp; Clean Energy (ICE) 2026 Startup Competition.</li>
      </ul>
    </div>

    <!-- CIVICTWIN Semarang -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title">CIVICTWIN Semarang &mdash; Civic Intelligence Proof of Concept</span>
        <span class="item-date">2026</span>
      </div>
      <div class="item-tech">React 18, TypeScript, Vite, Tailwind CSS, Leaflet, React Router | Competition Proof of Concept (Demo Data)</div>
      <ul class="bullet-list">
        <li>Developed a civic intelligence proof of concept for Semarang linking district-priority mapping, citizen feedback, simulated OPD follow-up, and policy-scenario exploration.</li>
        <li>Implemented a browser-based demo using localStorage, mock reports, prototype district markers, and rule-based CivicSense guidance.</li>
        <li>Awarded <strong>3rd Place</strong> at the UNITY UNY 2026 Smart City Competition.</li>
      </ul>
    </div>

    <!-- Purwokerto Intelligence Layer -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title">Purwokerto Intelligence Layer &mdash; Smart City Decision-Support Prototype</span>
        <span class="item-date">2026</span>
      </div>
      <div class="item-tech">React 19, TypeScript, Vite, Tailwind CSS, Leaflet, React Router | Experimental Material (Simulated Data)</div>
      <ul class="bullet-list">
        <li>Developed an interactive Smart City decision-support prototype covering Purwokerto's four subdistricts to model civic indicators and spatial urban analytics using simulated urban indicator datasets.</li>
        <li>Implemented a Multi-Criteria Decision Making (MCDM) weighted formula enabling dynamic policy weighting across public service, economic, and infrastructure indicators.</li>
        <li>Engineered geospatial GIS visualization with Leaflet and GeoJSON subdistrict boundaries, citizen feedback logging, and policy brief drafting modules.</li>
      </ul>
    </div>

    <!-- Fuzzy Rain Risk Index -->
    <div class="item-block">
      <div class="item-header">
        <span class="item-title">Fuzzy Rain Risk Index &mdash; AI Coursework Prototype</span>
        <span class="item-date">2026</span>
      </div>
      <div class="item-tech">Python, Jupyter Notebook, NumPy, Pandas, Matplotlib, Fuzzy Logic | AI Coursework Project</div>
      <ul class="bullet-list">
        <li>Implemented both Fuzzy Mamdani (centroid defuzzification) and Fuzzy Sugeno (weighted average) inference models entirely from scratch in Python without external fuzzy libraries.</li>
        <li>Formulated custom linguistic variables and membership functions applied to Indonesian hourly meteorological records to estimate 6-hour outdoor rain risk.</li>
      </ul>
    </div>
  </section>

  <!-- HONORS & COMPETITIONS -->
  <section class="cv-section">
    <h2 class="section-title">Honors &amp; Competition Outcomes</h2>
    <table class="honors-table">
      <tr>
        <td class="honor-title">3rd Place &mdash; Smart City Competition, UNITY UNY (CIVICTWIN Semarang)</td>
        <td class="honor-date">2026</td>
      </tr>
      <tr>
        <td class="honor-title">Top 10 Finalist &mdash; PLN Innovation &amp; Clean Energy (ICE) Startup Competition, PT PLN (Persero)</td>
        <td class="honor-date">2026</td>
      </tr>
      <tr>
        <td class="honor-title">Top 5 Finalist &mdash; GenBI Business Plan Competition, Generasi Baru Indonesia</td>
        <td class="honor-date">2026</td>
      </tr>
      <tr>
        <td class="honor-title">Grant Recipient &mdash; YIA KPP Mining Project Grant, Yayasan Inspirasi Anak Bangsa &amp; PT Kalimantan Prima Persada</td>
        <td class="honor-date">2024</td>
      </tr>
      <tr>
        <td class="honor-title">Competition Participant &mdash; GEMASTIK National ICT Competition (Smart City &amp; ICT Business Divisions)</td>
        <td class="honor-date">2024</td>
      </tr>
    </table>
  </section>

  <!-- RESEARCH & ACADEMIC INITIATIVES -->
  <section class="cv-section">
    <h2 class="section-title">Academic Research &amp; Presentations</h2>
    <div class="item-block">
      <div class="item-header">
        <span class="item-title">Faculty of Informatics Research Grant</span>
        <span class="item-date">2025</span>
      </div>
      <div class="item-sub">
        <span>Student Research Contributor</span>
        <span>Telkom University Purwokerto</span>
      </div>
      <ul class="bullet-list">
        <li>Collaborated with faculty researchers on data collection, feature extraction, and algorithm execution benchmarking for grant evaluation.</li>
      </ul>
    </div>

    <div class="item-block" style="margin-top: 3px;">
      <div class="item-header">
        <span class="item-title">Program Kreativitas Mahasiswa (PKM) Initiatives</span>
        <span class="item-date">2025</span>
      </div>
      <div class="item-sub">
        <span>Proposal Contributor &amp; Developer</span>
        <span>Faculty-Sponsored</span>
      </div>
      <ul class="bullet-list">
        <li>Contributed to two faculty-supported PKM initiatives through proposal development and technical prototyping.</li>
      </ul>
    </div>

    <div class="item-block" style="margin-top: 3px;">
      <div class="item-header">
        <span class="item-title">PKM Data Science Academic Seminar</span>
        <span class="item-date">2025</span>
      </div>
      <div class="item-sub">
        <span>Session Speaker / Presenter</span>
        <span>Academic Workshop</span>
      </div>
      <ul class="bullet-list">
        <li>Presented statistical data models and empirical research findings to peer student cohorts during an academic departmental seminar.</li>
      </ul>
    </div>
  </section>

  <!-- LEADERSHIP & ORGANIZATIONAL EXPERIENCE -->
  <section class="cv-section">
    <h2 class="section-title">Leadership &amp; Organizational Experience</h2>
    <div class="item-block">
      <div class="item-header">
        <span class="item-title">Responsive Program &mdash; Informatics Student Association</span>
      </div>
      <div class="item-sub">
        <span>Project Lead / Organizing Committee Chair</span>
        <span>Telkom University Purwokerto</span>
      </div>
      <ul class="bullet-list">
        <li>Led the student organizing committee coordinating orientation and technical onboarding activities for incoming Informatics students.</li>
      </ul>
    </div>

    <div class="item-block" style="margin-top: 3px;">
      <div class="item-header">
        <span class="item-title">Badan Eksekutif Mahasiswa (BEM KEMA)</span>
      </div>
      <div class="item-sub">
        <span>Secretary</span>
        <span>Telkom University Purwokerto</span>
      </div>
      <ul class="bullet-list">
        <li>Managed organizational documentation, administrative compliance, and correspondence for the university student executive board.</li>
      </ul>
    </div>
  </section>

</body>
</html>`;
}

module.exports = { generateCvHtml };
