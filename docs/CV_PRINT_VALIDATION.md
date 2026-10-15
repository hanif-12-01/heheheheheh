# CV print validation — Phase 4D.2

## Reproduction and root cause

On the baseline production application at `http://localhost:3012`, click Hero **Download CV**. Chromium 151.0.7922.34 downloaded `M-Hanif-Al-Faiz-CV.pdf`. The request returned HTTP 200 and `application/pdf`; its response and download hashes exactly matched the local artifact (`0271328a4cbde6989fd16ed854a0a4931579104e99e78130efba3ee8f392258b`). URL resolution, loading, download bytes, and response type were correct. No separate print function existed in the baseline UI.

The PDF itself was damaged: 243,413 bytes contained 48,524 UTF-8 replacement sequences (`EF BF BD`), including within compressed content streams. Its first zlib stream starts with replacement bytes after `x`; the xref pointer claims offset 143,156 despite byte expansion. `pypdf` reported an incorrect startxref and decompression errors; both pages yielded zero text characters and zero decoded stream bytes. Poppler reported malformed Flate streams and rendered both pages entirely white (non-white bounding box: none). The byte signature conclusively characterizes lossy binary-to-text conversion; it does not identify the historical tool/writer responsible.

The original audit reported PASS because it checked file size and `/Count 2` without decoding or rendering content. That was a false positive. Evidence: `cv-validation/baseline-browser.json`, `baseline-blank-page-1.png`, `baseline-blank-page-2.png`, and preserved `original-corrupt-CV.pdf`.

## Correction

Both languages now share the unchanged approved Harvard HTML/CSS template. Playwright's Chromium print engine writes binary PDF artifacts directly. Generation validates both PDFs before replacing the legacy URL. A locale resolver selects all download/print links. The new standalone print documents contain the visible CV itself, wait for fonts and layout before printing, hide only their controls, and provide PDF download/open fallbacks.

## Artifact validation

| Artifact | Pages | Bytes | Page text characters | Ink pixel fraction |
|---|---:|---:|---|---|
| English PDF | 2 | 123,375 | 4,402 / 1,673 | 9.283% / 3.982% |
| Indonesian PDF | 2 | 121,427 | 4,458 / 1,594 | 9.801% / 3.945% |

Both parsed in strict mode, contained the expected name, university, GPA, ongoing Semester 5, expected 2027 graduation, all seven localized headings, conservative award outcomes, and simulated-data disclosure. Every page independently rendered with visible text. All four final page images were inspected: no clipping, overlapping paragraphs, damaged glyphs, or missing-font artifacts observed. A4 format, original typography, margins, headings, grayscale layout, and curated scope are shared. `scripts/audit-cv.js` preserves the previous forbidden-claim checks and verifies all 30 curated skills against canonical data.

## Browser print and download tests

Results are recorded in `cv-validation/browser/browser-results.json`. Tests ran against the production server at `http://localhost:3012`, with a 1280×900 browser viewport. Each test requested the PDF, verified HTTP/type/hash, opened the correct localized print document, invoked its actual Print button, recorded native `beforeprint` events with loaded fonts and substantial visible content, saved the browser print-engine PDF via CDP, then strictly parsed/extracted/rendered that output. It also clicked Download and verified the localized filename and binary hash.

| Browser | Language | HTTP/type/download | Native Print event | CDP print output | PDF viewer |
|---|---|---|---|---|---|
| Chromium 151.0.7922.34 | EN | PASS | PASS; loaded fonts, 6,137 characters | PASS; two visible pages | Headless viewer unavailable; navigation downloads PDF |
| Chromium 151.0.7922.34 | ID | PASS | PASS; loaded fonts, 6,115 characters | PASS; two visible pages | Headless viewer unavailable; navigation downloads PDF |
| Chrome 155.0.8059.79 | EN | PASS | PASS; loaded fonts, 6,137 characters | PASS; two visible pages | PASS; native viewer screenshot inspected |
| Chrome 155.0.8059.79 | ID | PASS | PASS; loaded fonts, 6,115 characters | PASS; two visible pages | PASS; native viewer screenshot inspected |
| Edge 155.0.4283.45 | EN | PASS | PASS; loaded fonts, 6,137 characters | PASS; two visible pages | PASS; native viewer screenshot inspected |
| Edge 155.0.4283.45 | ID | PASS | PASS; loaded fonts, 6,115 characters | PASS; two visible pages | PASS; native viewer screenshot inspected |

The installed Chrome and Edge native viewers showed document text and a two-page document. Both locales' viewer screenshots were visually inspected. Every saved print-engine PDF independently passed strict parsing, heading/fact extraction, substantial page text, and nonblank Poppler rendering. The 12 independently rendered printed pages (three browsers × two languages × two pages) were pixel-identical to their corresponding generated PDF pages at 1,600px render size; see `cv-validation/browser/print-pixel-parity.json`. This verifies the browser print document produces the same visible CV as the selected PDF. Bundled headless Chromium's viewer limitation is isolated from its passing standalone CV print path. Website mode/locale integration is tested separately in the complete application matrix after the final source build.

The owner explicitly confirmed the conservative PKM contribution wording during this phase; both CVs retain it and omit unconfirmed organization role years.

Physical printer output and manual Windows print-dialog operation: **NOT TESTED**. Automated CDP output proves printed page content from the browser engine; it does not claim that a physical printer or Windows dialog was manually operated.
