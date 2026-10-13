const fs = require("fs");
const path = require("path");

const cvScript = fs.readFileSync(path.join(__dirname, "generate-cv.js"), "utf8");

// Global forbidden terms (should not appear anywhere in CV source)
const forbiddenTerms = [
  "Semester 5 completed",
  "August 2027",
  "June 2027",
  "Municipal Spatial Datasets",
  "parts tracking",
  "Software Development & UX",
  "Regional level",
  "National level",
  "nationally",
  "Postman",
  "Linux/Bash",
  "Applied Machine Learning",
  "Spatial Data / GIS",
  "Lead Developer",
  "Technical Co-founder",
  "Published Researcher",
  "Principal Investigator",
  "production-scale",
  "enterprise-grade",
  "FastAPI",
  "Python backend",
  "IoT",
  "smart meter hardware",
  "Firebase",
  "BFS",
  "DFS",
  "A*",
  "inventory alerts",
  "POS",
  "PDF billing",
  // Phase 3G.2 additions:
  "competition review",
  "proposals submitted"
];

console.log("=== 1. CV CONTENT INTEGRITY AUDIT (FORBIDDEN TERMS) ===");
let violations = 0;
for (const term of forbiddenTerms) {
  const regex = new RegExp("\\b" + term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
  const matches = cvScript.match(regex);
  if (matches) {
    console.error(`[VIOLATION] Found forbidden term: "${term}" (${matches.length} occurrence(s))`);
    violations++;
  }
}

if (violations === 0) {
  console.log("[PASS] 0 forbidden or unverified terms found in generate-cv.js!");
} else {
  console.log(`[FAIL] ${violations} violation(s) found.`);
}

console.log("\n=== 2. TARGETED PHASE 3G.2 FACTUAL CHECKS ===");

// Check Responsive Program year (must be omitted / pending)
const responsiveHeaderMatch = cvScript.match(/Responsive Program[\s\S]*?<\/div>/);
if (responsiveHeaderMatch) {
  if (responsiveHeaderMatch[0].includes("item-date") || responsiveHeaderMatch[0].includes("2023")) {
    console.error("[VIOLATION] Responsive Program header contains unverified year (should be omitted).");
    violations++;
  } else {
    console.log("[PASS] Responsive Program year is omitted (pending manual confirmation).");
  }
} else {
  console.error("[VIOLATION] Responsive Program section not found.");
  violations++;
}

// Check BEM KEMA year (must be omitted / pending)
const bemHeaderMatch = cvScript.match(/Badan Eksekutif Mahasiswa \(BEM KEMA\)[\s\S]*?<\/div>/);
if (bemHeaderMatch) {
  if (bemHeaderMatch[0].includes("item-date") || bemHeaderMatch[0].includes("2024")) {
    console.error("[VIOLATION] BEM KEMA header contains unverified year (should be omitted).");
    violations++;
  } else {
    console.log("[PASS] BEM KEMA year is omitted (pending manual confirmation).");
  }
} else {
  console.error("[VIOLATION] BEM KEMA section not found.");
  violations++;
}

// Check PKM contribution bullet (must not claim formal submission)
const pkmBlockMatch = cvScript.match(/Program Kreativitas Mahasiswa \(PKM\) Initiatives[\s\S]*?<\/ul>/);
if (pkmBlockMatch) {
  if (pkmBlockMatch[0].toLowerCase().includes("submitted") || pkmBlockMatch[0].toLowerCase().includes("national competition review")) {
    console.error("[VIOLATION] PKM block contains unverified submission claims.");
    violations++;
  } else if (pkmBlockMatch[0].includes("Contributed to two faculty-supported PKM initiatives through proposal development and technical prototyping")) {
    console.log("[PASS] PKM block uses conservative contribution wording.");
  } else {
    console.warn("[WARNING] PKM wording differs from expected conservative statement.");
  }
}

// Check Purwokerto Intelligence Layer block (must NOT contain Next.js)
const pilBlockMatch = cvScript.match(/Purwokerto Intelligence Layer[\s\S]*?<\/div>\s*<\/div>/);
if (pilBlockMatch) {
  if (pilBlockMatch[0].includes("Next.js")) {
    console.error("[VIOLATION] PIL block incorrectly contains Next.js.");
    violations++;
  } else if (pilBlockMatch[0].includes("React 19") && pilBlockMatch[0].includes("Vite")) {
    console.log("[PASS] PIL block uses verified React/Vite stack.");
  }
}

// Check SIMOBS block (must use JavaScript, not TypeScript)
const simobsBlockMatch = cvScript.match(/SIMOBS[\s\S]*?<\/div>\s*<\/div>/);
if (simobsBlockMatch) {
  if (simobsBlockMatch[0].includes("TypeScript")) {
    console.error("[VIOLATION] SIMOBS block incorrectly contains TypeScript.");
    violations++;
  } else if (simobsBlockMatch[0].includes("JavaScript")) {
    console.log("[PASS] SIMOBS block uses verified JavaScript frontend stack.");
  }
}

// Check skills in generate-cv.js against src/data/skills.ts
const skillsFile = fs.readFileSync(path.join(__dirname, "..", "src", "data", "skills.ts"), "utf8");
console.log("\n=== 3. SKILLS AUDIT AGAINST src/data/skills.ts ===");
const skillsTableMatch = cvScript.match(/<table class="skills-table">([\s\S]*?)<\/table>/);
if (skillsTableMatch) {
  const tableContent = skillsTableMatch[1];
  const itemsMatches = [...tableContent.matchAll(/<td class="skills-items">([\s\S]*?)<\/td>/g)];
  let totalSkillsChecked = 0;
  let invalidSkills = 0;
  for (const match of itemsMatches) {
    const list = match[1].split(",").map(s => s.trim().replace(/&amp;/g, "&"));
    for (const item of list) {
      totalSkillsChecked++;
      if (!skillsFile.includes(item)) {
        console.error(`[SKILL NOT IN skills.ts] "${item}"`);
        invalidSkills++;
        violations++;
      }
    }
  }
  console.log(`Total skills checked in CV table: ${totalSkillsChecked}`);
  console.log(`Invalid skills not in skills.ts: ${invalidSkills}`);
}

// Check PDF file existence, size, and page count
console.log("\n=== 4. PDF ARTIFACT INTEGRITY ===");
const pdfPath = path.join(__dirname, "..", "public", "cv", "M-Hanif-Al-Faiz-CV.pdf");
if (fs.existsSync(pdfPath)) {
  const stats = fs.statSync(pdfPath);
  const pdfData = fs.readFileSync(pdfPath);
  const pdfStr = pdfData.toString("binary");
  const countMatch = pdfStr.match(/\/Count\s+(\d+)/);
  const pageCount = countMatch ? parseInt(countMatch[1], 10) : 0;
  console.log(`PDF File Exists: YES (${stats.size} bytes)`);
  console.log(`PDF Page Count: ${pageCount}`);
  if (pageCount !== 2) {
    console.error(`[VIOLATION] PDF page count is ${pageCount}, expected exactly 2.`);
    violations++;
  } else {
    console.log("[PASS] PDF has exactly 2 pages.");
  }
} else {
  console.error("PDF File Exists: NO");
  violations++;
}

console.log("\n=== AUDIT SUMMARY ===");
if (violations === 0) {
  console.log("OVERALL RESULT: [PASS] All checks succeeded with 0 violations.\n");
  process.exit(0);
} else {
  console.error(`OVERALL RESULT: [FAIL] Found ${violations} violation(s).\n`);
  process.exit(1);
}
