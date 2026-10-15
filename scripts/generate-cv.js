/** Generate both Harvard CVs from one approved template, then audit before replacing the legacy URL. */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { execFileSync } = require('child_process');
const { generateCvHtml: approvedHtml } = require('./cv-template');
const { translateCvHtml, CONTROLS } = require('./cv-localization');
const { playwright, loadCanonicalData } = require('./cv-runtime');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(ROOT, 'public', 'cv');
const EVIDENCE = path.join(ROOT, 'docs', 'cv-validation');
const LOCALES = ['en', 'id'];
const filename = locale => `M-Hanif-Al-Faiz-CV-${locale.toUpperCase()}.pdf`;
const escape = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function applyCanonicalFacts(html) {
  const { PROFILE_DATA: profile, SKILLS_INVENTORY: skills, FEATURED_PROJECTS: projects, ACHIEVEMENTS_DATA: achievements } = loadCanonicalData();
  html = html.replaceAll('M. Hanif Al Faiz', escape(profile.name)).replaceAll('Telkom University Purwokerto', escape(profile.university))
    .replaceAll('3.66 / 4.00', escape(profile.gpa)).replaceAll('Expected: 2027', `Expected: ${profile.expectedGraduation}`)
    .replaceAll('Semester 5 (In Progress)', `Semester ${profile.currentLevel} (In Progress)`);
  // The curated CV inventory retains the approved selection and ordering; values come from skills.ts.
  const group = id => skills.find(item => item.id === id).items;
  const curated = [group('programming'), group('software-dev'), [0,1,2,3,8,4,5,7,6].map(index => group('tools')[index]), group('fundamentals'), [...group('communication').slice(0,3), ...[0,1,2,4].map(index => group('leadership')[index])]];
  let skillIndex = 0;
  html = html.replace(/(<td class="skills-items">)[\s\S]*?(<\/td>)/g, (_, start, end) => `${start}${curated[skillIndex++].map(escape).join(', ')}${end}`);
  const selected = ['wattwise-ai', 'civictwin-semarang', 'purwokerto-intelligence-layer', 'ai-course-project'].map(slug => {
    const project = projects.find(item => item.slug === slug);
    if (!project) throw Error(`Selected CV project missing from canonical data: ${slug}`);
    return project;
  });
  // Curated stack/version strings are locked to the approved CV, and checked against canonical stacks.
  const stacks = [
    ['Next.js 16','React 19','TypeScript','PostgreSQL','Drizzle ORM','ONNX Runtime Web','Tesseract.js'],
    ['React 18','TypeScript','Vite','Tailwind CSS','Leaflet','React Router'],
    ['React 19','TypeScript','Vite','Tailwind CSS','Leaflet','React Router'],
    ['Python','Jupyter Notebook','NumPy','Pandas','Matplotlib','Fuzzy Logic'],
  ];
  stacks.forEach((stack, index) => stack.forEach(technology => {
    const canonicalName = technology.replace(/ \d+$/, '');
    if (!selected[index].technologies.includes(canonicalName)) throw Error(`CV technology not canonical: ${technology}`);
  }));
  let projectIndex = 0;
  html = html.replace(/(<span class="item-date">)(2026|2024)(<\/span>)(\s*<\/div>\s*<div class="item-tech">)/g, (_, start, year, end, rest) => `${start}${selected[projectIndex++].year}${end}${rest}`);
  // Fail rather than silently elevating a changed award or academic status.
  for (const [id, outcome] of [['smart-city-uny-2026','3rd Place'],['pln-ice-2026','Top 10 Finalist'],['genbi-2026','Top 5 Finalist'],['yia-kpp-mining','Grant Recipient']]) {
    if (achievements.find(item => item.id === id)?.result !== outcome) throw Error(`Approved CV outcome conflicts with canonical record: ${id}`);
  }
  if (achievements.find(item => item.id === 'smart-city-uny-2026')?.relatedProject !== 'civictwin-semarang') {
    throw Error('UNITY UNY award must be attributed to CIVICTWIN Semarang in canonical data.');
  }
  return html;
}

function printHtml(locale) {
  let html = translateCvHtml(applyCanonicalFacts(approvedHtml()), locale);
  const copy = CONTROLS[locale];
  html = html.replace('</style>', `
    .print-controls { font-family: Arial, sans-serif; padding: 16px; margin-bottom: 24px; border: 1px solid #aaa; font-size: 12px; line-height: 1.5; }
    .print-controls nav { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; }
    .print-controls button, .print-controls a { color: #111; background: white; border: 1px solid #555; padding: 8px 12px; font: inherit; cursor: pointer; }
    .print-controls :focus-visible { outline: 3px solid #111; outline-offset: 3px; }
    @media screen { body { max-width: 210mm; margin: 24px auto; padding: 12mm 15mm; } }
    @media print { .print-controls { display: none !important; } body { margin: 0; padding: 0; } }
  </style>`);
  const controls = `<aside class="print-controls"><nav aria-label="${locale === 'id' ? 'Tindakan CV' : 'CV actions'}"><button id="print-cv" type="button">${copy.print}</button><a href="/cv/${filename(locale)}" download="${filename(locale)}">${copy.download}</a><a href="/cv/${filename(locale)}" target="_blank" rel="noopener noreferrer">${copy.open}</a></nav><p id="print-status" role="status">${copy.ready}</p></aside>`;
  const script = `<script>
    document.getElementById('print-cv').addEventListener('click', async function () {
      const button = this;
      const status = document.getElementById('print-status');
      button.disabled = true;
      status.textContent = ${JSON.stringify(copy.preparing)};
      try {
        await document.fonts.ready;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        window.print();
        status.textContent = ${JSON.stringify(copy.ready)};
      } catch (_) { status.textContent = ${JSON.stringify(copy.failed)}; }
      finally { button.disabled = false; }
    });
  </script>`;
  return html.replace('<body>', `<body>${controls}`).replace('</body>', `${script}</body>`);
}

async function main() {
  fs.mkdirSync(OUTPUT, { recursive: true });
  fs.mkdirSync(EVIDENCE, { recursive: true });
  const legacy = path.join(OUTPUT, 'M-Hanif-Al-Faiz-CV.pdf');
  const preserved = path.join(EVIDENCE, 'original-corrupt-CV.pdf');
  if (fs.existsSync(legacy) && !fs.existsSync(preserved)) fs.copyFileSync(legacy, preserved);
  const { chromium } = playwright();
  const browser = await chromium.launch({ headless: true });
  try {
    for (const locale of LOCALES) {
      const htmlPath = path.join(OUTPUT, `print-${locale.toUpperCase()}.html`);
      fs.writeFileSync(htmlPath, printHtml(locale), 'utf8');
      const page = await browser.newPage();
      await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ media: 'print' });
      await page.pdf({ path: path.join(OUTPUT, filename(locale)), printBackground: true, preferCSSPageSize: true, displayHeaderFooter: false });
      await page.close();
      console.log(`Generated ${filename(locale)} from shared approved HTML.`);
    }
  } finally { await browser.close(); }
  // Binary-safe writes plus mandatory parser/text/render checks. Never replace legacy with an unverified artifact.
  execFileSync(process.execPath, [path.join(__dirname, 'audit-cv.js')], { stdio: 'inherit' });
  fs.copyFileSync(path.join(OUTPUT, filename('en')), legacy);
  console.log('Both PDFs passed extraction and rendering audit. Legacy English URL repaired; original preserved.');
}

if (require.main === module) main().catch(error => { console.error(error); process.exit(1); });
module.exports = { printHtml, applyCanonicalFacts };
