# Bilingual Harvard CV guide

The website's shared `useLocale()` is the single source of truth for CV actions. `src/lib/cv.ts` resolves the selected locale to one PDF and one standalone print document. `CvActions` uses this resolver and typed control labels in `src/i18n/cv.ts`; it does not maintain a separate locale preference.

| Locale | Download | Print document |
|---|---|---|
| English (default) | `/cv/M-Hanif-Al-Faiz-CV-EN.pdf` | `/cv/print-EN.html` |
| Indonesian | `/cv/M-Hanif-Al-Faiz-CV-ID.pdf` | `/cv/print-ID.html` |

The original `/cv/M-Hanif-Al-Faiz-CV.pdf` URL remains an English alias. The previous corrupt artifact is preserved at `docs/cv-validation/original-corrupt-CV.pdf` for diagnosis; it must not be republished as a working CV.

## Shared layout and facts

`scripts/cv-template.js` preserves the approved Harvard HTML layout, typography, A4 margins, section order, curated skills, and four selected CV projects. The website still has six primary projects; the CV retains its approved selected-project scope. Both locales share this template. `scripts/cv-localization.js` contains faithful Indonesian prose translations and localized print controls; names, technical products, organizations, repository URLs, and project identifiers stay unchanged.

The generator reads canonical `profile.ts`, `skills.ts`, `projects.ts`, and `achievements.ts`. It binds personal and academic facts, the curated skill inventory, and project years, and fails if approved technology stacks or award outcomes conflict with canonical data. Additional CV-only conservative experience wording remains the approved source. It omits unconfirmed organization years. During Phase 4D.2 the owner explicitly approved retaining the conservative faculty-supported PKM contribution wording in both website languages and both CVs; the canonical website record was aligned with that decision without introducing formal national-submission claims.

## Generate and validate

Run from the repository root:

```powershell
rtk proxy node scripts/generate-cv.js
rtk proxy node scripts/audit-cv.js
rtk proxy node scripts/test-cv-browser.js http://localhost:3012
```

Generation writes both PDFs as binary browser output, writes both print HTML documents, and runs the complete audit before replacing the legacy English alias. The audit verifies conservative content and all 30 curated skills, strictly parses both PDFs, extracts substantial text from every page, checks headings and facts, and independently renders every page with Poppler. Pixel measurements reject empty or nearly empty pages. Inspect the rendered PNGs after any content/layout change; automated pixel checks do not replace layout review.

The scripts use existing Playwright, Python (`pypdf`, `Pillow`), and Poppler from the Codex bundled runtime without adding application dependencies. Other environments can install those tools and set `CV_PLAYWRIGHT` (package path), `CV_PYTHON` (executable), and `CV_PDFTOPPM` (executable). `CODEX_WORKSPACE_DEPENDENCIES` can select another runtime root. Ordinary site builds consume the generated artifacts and do not require PDF tools.

## Printing

Print opens a visible standalone white document, generated from the same CV source and CSS as its PDF. Its explicit Print button waits for fonts and two animation frames before calling `window.print()`. The portfolio UI, scenery, dark theme, and hidden app containers are absent. Controls are hidden by print CSS. Download PDF and Open PDF remain available as fallbacks.

Use A4 portrait at default scale and disable browser headers/footers. Both PDFs remain searchable, selectable, black-and-white, and two pages. Automated browser print-engine validation is recorded separately from physical printer/manual Windows dialog tests.

## Corrections and rollback

Correct canonical facts first, then approved CV prose/translation where needed. Regenerate both locales together; never edit PDF bytes through a text editor or UTF-8 string conversion. Update translation resources if changed wording causes an audit failure or an untranslated field. Preserve conservative outcomes and maturity disclosures.

For rollback, retain both validated PDFs and print documents from the same generation. The stored original PDF is corrupt and is diagnostic evidence only. Restoring the approved template source and regenerating its English artifact safely restores the format. Do not restore the corrupt legacy file to production.
