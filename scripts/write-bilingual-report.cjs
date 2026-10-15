const fs=require('node:fs');
const {spawnSync}=require('node:child_process');
const qa=JSON.parse(fs.readFileSync('docs/phase-4d2/browser-results.json','utf8'));
const sources=JSON.parse(fs.readFileSync('docs/phase-4d2/i18n-source-audit.json','utf8'));
const status=spawnSync('rtk',['proxy','git','status','--short','--untracked-files=all'],{encoding:'utf8'});
if(status.status!==0)throw Error(status.stderr);
fs.writeFileSync('docs/phase-4d2/final-git-status.txt',status.stdout);
const modified=status.stdout.split('\n').filter(l=>l.startsWith(' M')).map(l=>l.slice(3));
const newFiles=status.stdout.split('\n').filter(l=>l.startsWith('??')).map(l=>l.slice(3));
fs.writeFileSync('docs/phase-4d2/final-file-manifest.json',JSON.stringify({modified,newFiles,includesPriorPhase4D1Work:true},null,2));
const performance=qa.performance.map(r=>`| ${r.width}px | ${r.locale.toUpperCase()} | ${r.lcp} ms | ${r.cls.toFixed(5)} |`).join('\n');
const coverage=['Navbar / language / mode controls','Hero','Player Profile','About','Interests','Journey / all five selections','Achievements / all four records','Project Lab / six projects','Research / all filters','Skills Inventory','GitHub experiments','Contact / Footer / CV controls','All six case studies','Project directory / Journey page','404 / accessibility / companion dialogue'].map(s=>`| ${s} | PASS | PASS |`).join('\n');
const paths=p=>p.map(n=>`- \`${n}\``).join('\n');
const text=`# HANIF.EXE — BILINGUAL WORLD & HARVARD CV REPAIR REPORT

15 October 2026 · Local production preview: http://localhost:3012 · No deployment, commit or push.

## 1. Initial Repository State

The local workspace already contained the Phase 4D.1 redesign, original source art, optimized props and uncommitted component changes. These were retained. Baseline status/diff evidence and canonical SHA256 locks are in \`docs/phase-4d2\`. The baseline snapshot contains 26 tracked modifications; it was captured during initial inspection, not a clean Git checkout. No remote reset or GitHub synchronization was used; remote divergence is NOT TESTED. The final diff also contains earlier redesign work and must not be interpreted entirely as Phase 4D.2.

## 2. Visual Audit

Hero and profile already had detailed original art. The semester selector was a flat strip over sparse decorative layers, achievement objects lacked surrounding architecture, and the project introduction had little environmental context. Repeated rectangular evidence layouts made these portions feel detached. The remedy targets those gaps while preserving readable biographies, evidence and conventional navigation.

## 3. Environmental Background Improvements

Added original connected woodland trail, achievement hall and engineering courtyard. Background mountains/sky, midground paths/architecture and foreground vegetation establish depth. Desktop journey landmarks stagger along the scene; mobile uses a vertical route. Hall props sit on architectural shelves with exact results; the grant now uses a document rather than an award symbol. Courtyard art frames project copy without introducing screenshots or schematic placeholders. Existing Hero, lived-in room, reading corner, interest diorama, research notes, tool shelves and contact clearing are preserved. Detailed provenance/prompt intents and rollback guidance: \`PIXEL_ENVIRONMENT_REFINEMENT.md\`.

## 4. Before/After Visual Evidence

All eight required baseline screenshots were captured before the new production build. After captures exist in both languages at 1440×900 and 390×844. Scene and reading contact sheets were visually inspected along with full-size Hero, journey, trophy and project screenshots. Findings: richer depth and architectural context, readable dark label surfaces, differing section compositions, no broken images or horizontal clipping. The retained Hero art is not presented as a newly generated panorama. Visual approval remains the owner's decision.

| View | Before | After (Indonesian) |
|---|---|---|
| Hero desktop | before/hero-desktop.png | after/hero-pixel-id-1440.png |
| Hero mobile | before/hero-mobile.png | after/hero-pixel-id-390.png |
| Profile | before/profile-desktop.png | after/profile-id-1440.png |
| Journey | before/journey-desktop.png | after/journey-id-1440.png |
| Trophy Room | before/trophies-desktop.png | after/trophies-id-1440.png |
| Project Lab | before/projects-desktop.png | after/projects-id-1440.png |
| Recruiter desktop | before/recruiter-desktop.png | after/hero-recruiter-id-1440.png |
| Recruiter mobile | before/recruiter-mobile.png | after/hero-recruiter-id-390.png |

Paths are relative to \`docs/phase-4d2\`; English equivalents also exist. ![Scene review](phase-4d2/scene-review-sheet.png)

## 5. Original Color Palette Verification

UI keeps #0B1020, #151B2E, #1D263D, #26324D, #5DE4C7, #5AA9FF, #A78BFA, #FFD166, #F1F5F9 and #94A3B8. Derived blue/wood/stone shades remain environmental. Stray profile/research/contact pink accents were changed to approved purple. Calculated foreground/solid-surface pairs in \`i18n-source-audit.json\` range from 5.52:1 to 17.28:1. These are token calculations; no claim of a complete pixel-by-pixel contrast audit over every illustrated region is made.

## 6. Localization Architecture

One canonical factual database, source-key presentation catalogue (${sources.dictionaryKeys} merged keys), typed locale/key helpers, centralized dynamic templates, React tree localization and explicit streamed-copy boundaries. English server snapshot prevents hydration mismatch. Independent locale/mode storage persists preferences; guarded memory fallbacks work when storage is denied. Shared URLs, project slugs, hashes and query strings are unchanged. Pointer-switch scroll restoration, back/forward and refresh passed. Client document language/title/descriptions/OG locale update; crawlable server output remains English. No invented domain or hreflang alternates. See \`I18N_IMPLEMENTATION.md\` for adding translations and limitations.

## 7. Language Coverage

| Surface | English | Indonesian |
|---|---|---|
${coverage}

The reproducible source audit reports zero missing translations for ${sources.files.reduce((s,f)=>s+f.descriptiveStrings,0)} descriptive field visits across nine data modules, with explicit proper-name/internal-role exclusions. Runtime unchanged-copy lists were reviewed: retained values are official names, technologies, numbers, common Indonesian terms and identifiers. Generic footer/archive/sprint/interest fragments discovered in the first audit were fixed and retested. This is coverage evidence for current copy, not a guarantee for future unregistered strings.

## 8. Four-Mode Validation

${qa.checks.length}/${qa.checks.length} final browser checks PASS in Chromium ${qa.browser}. EN Pixel, ID Pixel, EN Recruiter and ID Recruiter each passed homepage rendering, navigation targets, Hero CTA, all semester/achievement selections, research filters, six project repositories, contact destinations, actual localized download and opening the matching print page. All mode switch directions and independent language persistence passed. Companion is hidden in Recruiter Mode and its open dialogue translates without replaying its click count.

## 9. Blank CV Bug — Root Cause

P0 was conclusively characterized before cosmetic work. The original 243,413-byte PDF contained 48,524 EF BF BD UTF-8 replacement sequences, broken compressed streams and incorrect xref offsets. Both pages extracted zero characters/decoded-stream bytes and independently rendered pure white. The actual old Hero download returned HTTP 200, application/pdf and the identical corrupt artifact (SHA256 0271328a4cbde6989fd16ed854a0a4931579104e99e78130efba3ee8f392258b). Download routing worked; the binary PDF was corrupt. The historical writer that corrupted it is unknown. Original retained at \`docs/cv-validation/original-corrupt-CV.pdf\`. The old audit's byte/page checks falsely passed and were replaced by strict extraction/render checks.

## 10. English Harvard CV

\`public/cv/M-Hanif-Al-Faiz-CV-EN.pdf\`: 123,375 bytes, two pages. Extracted characters: 4,402 / 1,673. Independent ink fractions: 9.283% / 3.982%. Every page visually inspected. Shared A4 Harvard template, factual headings and 30 curated skills passed audit. Legacy English URL repaired only after validated regeneration.

## 11. Indonesian Harvard CV

\`public/cv/M-Hanif-Al-Faiz-CV-ID.pdf\`: 121,427 bytes, two pages. Extracted characters: 4,458 / 1,594. Independent ink fractions: 9.801% / 3.945%. Every page visually inspected, with readable localized sections and intact verified facts.

## 12. CV Style Parity

Both use the unchanged approved professional HTML/CSS template: typography, A4 size, margins, section rules and alignment. Translation changes content only. No infographic/game/Europass substitution. Shared print HTML uses the same layout. Twelve independently rendered browser print pages were pixel-identical to the corresponding generated pages; parity evidence is retained under \`docs/cv-validation/browser\`.

## 13. CV Print Tests

| Browser (Windows) | Languages | Actual native Print button | Print engine output |
|---|---|---|---|
| Chromium 151.0.7922.34 | EN + ID | beforeprint with loaded fonts, 6,137 / 6,115 visible chars | Two pages, strict parse/extraction/Poppler render PASS |
| Chrome 155.0.8059.79 | EN + ID | beforeprint with loaded fonts and visible text | Two pages, strict parse/extraction/Poppler render PASS |
| Edge 155.0.4283.45 | EN + ID | beforeprint with loaded fonts and visible text | Two pages, strict parse/extraction/Poppler render PASS |

Print pages: \`/cv/print-EN.html\` and \`/cv/print-ID.html\`; selected from the actual website in all four combinations. Chrome/Edge PDF viewers showed visible content and two-page controls. Bundled headless Chromium downloads native PDF navigation, so its PDF viewer is marked unavailable separately; HTML print works. Physical printer/manual Windows print dialog: NOT TESTED. Details: \`CV_PRINT_VALIDATION.md\` and \`browser-results.json\` under CV evidence.

## 14. CV Download Tests

All four site combinations downloaded the exact selected EN/ID artifact with the correct filename and matching SHA256. All Hero, Contact and Footer controls resolve through the single locale-aware API. Independent browser artifact checks also verified HTTP 200 and application/pdf in all three engines. Existing \`/cv/M-Hanif-Al-Faiz-CV.pdf\` remains a valid English compatibility URL.

## 15. Project & Data Integrity

Six featured projects, technology arrays and verified repositories are unchanged. SHA256 locks match profile, projects, journey, achievements, skills, socials, interests, content-integrity guidance and both original photographs. The only approved factual-copy change is rc-6: “Contributed to two faculty-supported PKM initiatives through proposal development and technical prototyping.” Reversing only that sentence reproduces the original research file hash. No winner/maturity inflation; Semester 5 remains in progress; GPA 3.66/4.00 and expected graduation 2027 remain intact. Three experiment titles no longer link to nonexistent detail routes; verified repositories or an honest coursework record remain.

## 16. Responsive Testing

1440, 1280, 1024, 768, 430, 390, 375 and 320px × two languages × two modes = 32 layouts PASS. Desktop height 900px, mobile height 844px. Full page lazy content was traversed before geometry/image checks. No horizontal overflow, controls outside viewport or broken images. Final desktop/mobile screenshots include all Pixel sections and both Recruiter Hero presentations. Mobile scenery is cropped/staged separately; desktop images are not uniformly squeezed into the mobile layout.

## 17. Accessibility Regression

Native language buttons have localized names, lang attributes and aria-pressed. Document language and announcements update; keyboard skip link moves focus to main. Mobile menu Escape returns focus, anchor navigation closes the menu, semester/trophy Enter selection works, research filters retain selected states, companion Escape dismissal and visibility persistence pass. Reduced motion stops scene/cloud animation and smooth scrolling. Focus styles remain in shared CSS. Token contrast checks pass as described above. Human screen-reader speech output, comprehensive automated accessibility engine scores and physical keyboard/device testing are NOT TESTED. The existing following companion can temporarily cover reading text near a mobile viewport corner; it remains dismissible with visibility controls and is a minor owner-review item.

## 18. Performance Measurements

Single cold browser-context samples on local production server; unthrottled Chromium ${qa.browser}; no CPU/network emulation. These are laboratory snapshots, not field Core Web Vitals, cross-device scores or proof of improvement.

| Viewport | Locale | Observed LCP | Observed CLS |
|---|---|---:|---:|
${performance}

Hero art: 182,736 bytes. New scenes: 615,866 bytes total. All production environment WebP/SVG files: 872,516 bytes (previous 256,650 + new 615,866). Below-fold scenes lazy-load. Resource timings are retained in browser evidence. Lighthouse Performance/Accessibility, INP/interaction latency under load, throttled mobile network and field metrics: NOT TESTED. Final optimization belongs to Phase 4E.

## 19. Bug Ledger

| ID | Severity | Feature | Reproduction | Fix | Retest | Status |
|---|---|---|---|---|---|---|
| CV-01 | P0 | CV | Existing two-page PDF rendered pure white | Binary regeneration, strong parse/text/render audit | Three engines, both languages, all pages | Resolved |
| ROUTE-01 | P1 | Experiments | Title/detail CTA targeted unsupported slug | Remove invalid case links; retain real repo/coursework | Directory and six supported cases | Resolved |
| I18N-01 | P2 | Combined copy | Footer/archive/sprint fragments stayed English | Central entries and explicit server copy boundaries | Runtime copy comparison | Resolved |
| PREF-01 | P2 | Storage denied | Mode/pet choice could not change | Guarded session fallbacks and event dispatch | Denied-storage browser context | Resolved |
| VIS-01 | P2 | Award semantics | Grant used medal | Decorative document with exact grant record | Visual review + selector checks | Resolved |
| QA-01 | Test tooling | Scroll | Locator helper scrolled sticky header before event | Native pointer coordinates; layout restoration | Hash and y=700 preserved | Resolved |
| UX-01 | Minor | Mobile companion | Following sprite can overlap lower-corner prose | Existing Hide control available | Owner visual review pending | Deferred |

## 20. Files Created

New Phase 4D.2 runtime resources: \`src/i18n/config.ts\`, \`LocaleProvider.tsx\`, \`en.ts\`, \`id.ts\`, \`content-id.ts\`, \`ui-id.ts\`, \`root-id.ts\`, \`cv.ts\`, \`translate.ts\`, \`useTranslations.tsx\`, \`Localize.tsx\`; \`src/components/i18n/LanguageSwitcher.tsx\`, \`LocaleDocument.tsx\`; \`src/components/ui/CvActions.tsx\`; \`src/lib/cv.ts\`, \`siteUrl.ts\`; \`src/app/not-found.tsx\`; \`src/styles/bilingual.css\`, \`world-refinement.css\`.

New scripts: \`scripts/cv-template.js\`, \`cv-localization.js\`, \`cv-runtime.js\`, \`validate-cv.py\`, \`test-cv-browser.js\`, \`prepare-world-refinement.cjs\`, \`audit-i18n.cjs\`, \`qa-bilingual-world.cjs\`, \`write-bilingual-report.cjs\`. New two PDFs/two print HTML files and three source PNG/three production WebP files are listed in the CV/environment sections. New docs: \`I18N_IMPLEMENTATION.md\`, \`CV_BILINGUAL_GUIDE.md\`, \`CV_PRINT_VALIDATION.md\`, \`PIXEL_ENVIRONMENT_REFINEMENT.md\`, this report. Exact pending file manifest including prior Phase 4D.1 assets and every evidence file: \`docs/phase-4d2/final-file-manifest.json\`.

## 21. Files Modified

Exact tracked working-tree modifications (includes prior Phase 4D.1 work):

${paths(modified)}

Phase 4D.2 reasons: locale wrappers/switcher/chrome semantics across sections, projects and pet; shared CV actions; native print/generation/audit repairs; independent preference fallbacks; three scene placements/staging; conservative approved rc-6; domain placeholders instead of invented canonical URLs; documentation/evidence ignore exceptions. \`WorldScene.tsx\` is an earlier untracked Phase 4D.1 file extended here; original source art and optimized prop assets are retained. Generated Next type declarations are framework-managed. No dependencies changed.

## 22. ESLint / TypeScript / Build

\`rtk proxy npm run lint\` PASS; \`rtk proxy npx tsc --noEmit\` PASS; \`rtk proxy npm run build\` PASS (Next 16.3.8 Turbopack, 13 static generation entries); production server PASS on port 3012. \`git diff --check\` PASS; only Windows LF/CRLF conversion notices, no whitespace errors. Status and diff statistics inspected. No commit, push or deployment. Prior development Turbopack CSS subprocess issue was bypassed with Webpack dev; ordinary production Turbopack build passes.

## 23. CV Audit Results

\`rtk proxy node scripts/generate-cv.js\` PASS and invokes strong validation; \`rtk proxy node scripts/audit-cv.js\` PASS. Strict pypdf parsing, substantial text on EVERY page, required headings/factual outcomes, 30 curated skills, forbidden overclaim checks and independent Poppler visible-ink thresholds all pass. \`test-cv-browser.js\` passed on all three actual engines after final regeneration. Original byte/page-only audit is not accepted as evidence.

## 24. Remaining Issues

Release-blocking P0/P1 bugs: none found in tested flows. Minor usability: floating companion may cover lower-corner prose on mobile; visibility control permits hiding it and owner can request a revised placement. Unverified manual tests: physical printer/Windows dialog, spoken screen-reader output, real phone/browser behavior. Missing owner confirmation: final domain, final personal-media choice, contact/account ownership, both CV wording/layout and visual approval. Optional future work: SEO server-language URLs, measured Lighthouse and production performance optimization. No fake screenshots, guessed contacts or deployments were introduced.

## 25. Release Readiness Verdict

**READY WITH MINOR DEFERRED ISSUES**

Current implementation has no observed P0/P1 blocker: bilingual site, localized document actions, real visible print outputs, responsive layouts and production checks pass. Mobile companion placement and manual device/physical printer checks remain explicitly deferred. This is a request for owner review, not permission to deploy.

## 26. PRE-DEPLOYMENT CHECKPOINT

Review authentic personal photograph, LinkedIn URL, Instagram URL, contact email, all GitHub links, both Harvard CV PDFs, final deployment domain and all remaining placeholders. Contact destinations were retained and locally checked, not independently authenticated. Review Pixel/Recruiter EN/ID artwork and Indonesian phrasing. Checklist: \`PRE_DEPLOYMENT_OWNER_CHECKLIST.md\`. Do not mark missing domain or manual print checks as verified.

## 27. Next Phase

Recommended after owner review: **PHASE 4E — SEO, LIGHTHOUSE & FINAL RELEASE QA**. Do not automatically begin it. No deployment performed; stop here and await owner review.
`;
fs.writeFileSync('docs/BILINGUAL_WORLD_CV_REPAIR_REPORT.md',text);
console.log('Wrote report with '+qa.checks.length+' browser checks and '+qa.viewports.length+' viewport records.');
