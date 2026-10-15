/** Integrity audit: shared approved content plus parser, text extraction and independent pixel rendering. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { printHtml } = require('./generate-cv');
const { dependencies, loadCanonicalData } = require('./cv-runtime');

const FORBIDDEN = ['Semester 5 completed','August 2027','June 2027','Municipal Spatial Datasets','parts tracking','Software Development & UX','Regional level','National level','nationally','Postman','Linux/Bash','Applied Machine Learning','Spatial Data / GIS','Lead Developer','Technical Co-founder','Published Researcher','Principal Investigator','production-scale','enterprise-grade','FastAPI','Python backend','IoT','smart meter hardware','Firebase','BFS','DFS','A*','inventory alerts','POS','PDF billing','competition review','proposals submitted'];
// Ownership correction: this friend-developed project must not return to any CV output.
FORBIDDEN.push('SIMOBS', 'simobs-bengkel', 'github.com/hanif-12-01/bengkel');
const assert = (condition, message) => { if (!condition) throw Error(message); };

for (const locale of ['en','id']) {
  const html = printHtml(locale);
  const publicHtml = fs.readFileSync(path.join(__dirname,'..','public','cv',`print-${locale.toUpperCase()}.html`),'utf8');
  assert(html === publicHtml, `Print HTML ${locale} is stale: regenerate both documents.`);
  for (const term of FORBIDDEN) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    assert(!new RegExp(`\\b${escaped}\\b`,'i').test(html), `Unverified/forbidden term (${locale}): ${term}`);
  }
  for (const marker of ['Responsive Program','Badan Eksekutif Mahasiswa (BEM KEMA)']) {
    const block = html.slice(html.indexOf(marker),html.indexOf('</div>',html.indexOf(marker)));
    assert(!block.includes('item-date') && !/20\d{2}/.test(block), `Unconfirmed organization year introduced: ${marker}`);
  }
  assert(html.includes(locale === 'en' ? 'Contributed to two faculty-supported PKM initiatives through proposal development and technical prototyping' : 'Berkontribusi pada dua kegiatan PKM yang didukung fakultas melalui pengembangan proposal dan prototipe teknis'), `Conservative PKM wording missing (${locale}).`);
  const projects = html.match(/<!-- FEATURED PROJECTS -->([\s\S]*?)<!-- HONORS & COMPETITIONS -->/)[1];
  assert((projects.match(/class="item-title"/g) || []).length === 4, `Expected four selected CV projects (${locale}).`);
  for (const name of ['WattWise AI', 'CIVICTWIN Semarang', 'Purwokerto Intelligence Layer', 'Fuzzy Rain Risk Index']) {
    assert(projects.includes(name), `Selected CV project missing (${locale}): ${name}`);
  }
  const pil = html.slice(html.indexOf('Purwokerto Intelligence Layer'),html.indexOf('<!-- Fuzzy Rain Risk Index -->'));
  assert(pil.includes('React 19') && pil.includes('Vite') && !pil.includes('Next.js'), `Incorrect PIL stack (${locale}).`);
  assert(pil.includes(locale === 'en' ? 'Experimental Material (Simulated Data)' : 'Bahan Eksperimen (Data Simulasi)'), `PIL experimental disclosure missing (${locale}).`);
  assert(!/3rd Place|Juara 3|UNITY|Awarded|Meraih/.test(pil), `Competition award wrongly attached to PIL (${locale}).`);
  const civictwin = html.slice(html.indexOf('<!-- CIVICTWIN Semarang -->'),html.indexOf('<!-- Purwokerto Intelligence Layer -->'));
  assert(civictwin.includes('React 18') && !civictwin.includes('React 19') && civictwin.includes('localStorage'), `Incorrect CIVICTWIN stack/demo disclosure (${locale}).`);
  assert(civictwin.includes(locale === 'en' ? 'rule-based CivicSense' : 'CivicSense berbasis aturan'), `CIVICTWIN rule-based disclosure missing (${locale}).`);
  assert(civictwin.includes(locale === 'en' ? '<strong>3rd Place</strong>' : '<strong>Juara 3</strong>') && civictwin.includes('UNITY UNY 2026'), `Correct CIVICTWIN award missing (${locale}).`);
  console.log(`[PASS] ${locale.toUpperCase()}: ownership correction, four selected projects, CIVICTWIN award, experimental PIL without award, original forbidden terms, conservative PKM, omitted organization years, verified project stacks.`);
}
const canonicalSkills = loadCanonicalData().SKILLS_INVENTORY.flatMap(group=>group.items);
const table = printHtml('en').match(/<table class="skills-table">([\s\S]*?)<\/table>/)[1];
const curated = [...table.matchAll(/<td class="skills-items">([^<]+)<\/td>/g)].flatMap(match=>match[1].replaceAll('&amp;','&').split(',').map(item=>item.trim()));
assert(curated.length === 30, 'Approved curated 30-skill inventory changed.');
curated.forEach(skill=>assert(canonicalSkills.includes(skill),`CV skill not canonical: ${skill}`));
console.log(`[PASS] ${curated.length} curated skills all match src/data/skills.ts.`);

const runtime = dependencies();
execFileSync(runtime.python,[path.join(__dirname,'validate-cv.py')],{stdio:'inherit', env:{...process.env,CV_PDFTOPPM:runtime.pdftoppm,CV_FORBIDDEN_TERMS:JSON.stringify(FORBIDDEN)}});
console.log('[PASS] Both PDFs parsed strictly, extracted substantial text on EVERY page, and independently rendered with visible ink.');
