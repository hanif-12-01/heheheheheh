# Professional architectural expansion: browser evidence

Executed against the updated production build at `http://localhost:3012` on 15 October 2026, using headless Chromium 151.0.7922.34. The full machine-readable evidence is `browser-results.json`.

## Executed results

- **48/48 checks passed.**
- All **32 combinations** of Pixel/Professional, English/Indonesian, and 1440/1280/1024/768/430/390/375/320px passed document-width, clipped-control, and broken-image checks.
- All **eight** Professional architectural scene instances rendered at every width in both languages. Native `picture` selection resolved to **480×320** compact sources below 768px and **960×640** main sources at 768px and above. The actual `currentSrc`, native dimensions, load completion, and rendered geometry are recorded for each viewport.
- Pixel Mode rendered **zero** new architectural scene instances.
- All **123 protected file hashes** matched the baseline, including canonical data, the existing Hero, original photographs, pixel portrait, Harvard CV artifacts/generator, existing Pixel artwork, and existing non-Atelier stylesheets. New artwork and the new expansion stylesheet are separate files. `src/app/globals.css` was not part of the baseline hash inventory.
- Six case-study routes were exercised in both modes with English/Indonesian switching, with the expected repository links and unchanged URLs. Projects and Journey index routes were also checked; nonexistent development and project routes correctly returned 404.
- Five semester selectors, four trophy selectors, four research filters, Hero project navigation, social destinations, actual PDF downloads, locale-specific print HTML, language/mode persistence, browser history, mobile menu, companion dialogue/visibility, denied-storage fallback, skip link, and reduced-motion behavior passed.
- No console errors, runtime exceptions, failed network requests, or unexpected asset HTTP errors were recorded.

## Hero preservation

`hero-preservation.json` compares actual before/after PNG pixels for Professional English/Indonesian at 1440px and 390px. Every Hero area below the 65px navigation bar is pixel-identical. Small differences inside the navigation bar come from hover/focus states; no composition or portrait difference was found. The Hero source and portrait asset hashes also match.

## Measured local performance

These are individual cold-context, unthrottled local Chromium measurements. They are not field data, simulated slow-mobile results, or Lighthouse scores.

| Mode | Locale | Width | LCP | CLS |
|---|---|---:|---:|---:|
| Pixel | EN | 1440 | 340ms | 0.00367 |
| Pixel | ID | 1440 | 288ms | 0.00492 |
| Pixel | EN | 390 | 288ms | 0.01910 |
| Pixel | ID | 390 | 332ms | 0.03891 |
| Professional | EN | 1440 | 532ms | 0.00395 |
| Professional | ID | 1440 | 608ms | 0.00337 |
| Professional | EN | 390 | 468ms | 0 |
| Professional | ID | 390 | 628ms | 0 |

## Visual evidence

- `before/`: 40 baseline Professional screenshots (Hero plus nine sections, both languages, desktop/mobile).
- `after/`: 80 current screenshots (both modes, both languages, desktop/mobile).
- `review.png`: side-by-side Professional Indonesian profile, honors, and research at 1440px; 2960×3236px composite of actual browser screenshots.
- `review-mobile.png`: the same before/after comparison at 390px; 860×2980px composite.

The contact sheets and representative full screenshots were visually inspected. Academic architecture, honors staging, and the research observatory now create distinct pixel-art rooms while preserving readable factual text and functional controls.

## Test limits

The expansion QA opened the localized print HTML and verified visible content. It did **not** invoke the operating-system print dialog or a physical printer. PDF artifact byte preservation and the separate PDF audit provide the CV regression evidence. This run did not collect a new Lighthouse score, field performance, a screen-reader session, or a new full contrast audit. Production console testing does not inspect Next.js development-only issue panels.

## Reproduction

```text
rtk proxy node scripts/qa-atelier-expansion.cjs
rtk proxy node scripts/qa-atelier-expansion.cjs --review
rtk proxy node scripts/qa-atelier-expansion.cjs --hero-check
```

Do not rerun `--baseline` after implementation: it intentionally replaces the before screenshots and hash inventory.
