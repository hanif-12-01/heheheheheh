# Grand Atelier — Professional room expansion

Owner review build: http://localhost:3012/#profile

This refinement responds to the owner's feedback that the sections after the liked Hero felt less monumental. The Hero and portrait are preserved. No deployment, commit, or push is authorized or performed.

## Analysis and internet references

The previous composition lost its architectural identity immediately below the Hero. A navy field, thin dividers, small isolated props, and similar text grids established readability but little spatial continuity. The correction gives the academic profile, journey, honors, projects, research, skills, and reception distinct spatial compositions.

References researched on 15 October 2026:

- [British Museum — Great Court](https://www.britishmuseum.org/collection/galleries/great-court): a central reading-room landmark, a soaring glazed enclosure, and gallery circulation. The design interpretation uses a scholarly rotunda, architectural scale, and a clear central focal point. The official search-index text was accessible; the direct page returned HTTP 403.
- [Sea of Stars — official site](https://seaofstarsgame.co/): pixel environments, layered world composition, and lighting as a source of atmosphere. The design interpretation uses depth, deliberate foreground/middle/background planes, and cool light within the original HANIF.EXE palette. No game artwork is imported.
- [The Game Kitchen — official site](https://thegamekitchen.com/): monumental architectural pixel landscapes and the studio's published art-direction material. The interpretation is limited to scale, silhouette, and detail hierarchy; the portfolio uses its own nonreligious architectural world.

These are visual design references, not copied assets or claims of affiliation. All four new environment illustrations were generated originally with the built-in `image_gen` tool, using the existing HANIF.EXE Grand Atelier illustration as a style reference.

## Implemented composition

| Area | Refinement |
|---|---|
| Academic profile | Large library rotunda beside an opaque academic record; GPA and university remain real HTML; supporting capabilities use restrained open dividers. |
| About | A stepped architectural window frames the editorial quotation, balancing the narrative column. |
| Interests | Existing domain-specific pixel objects introduce each discipline; the primary discipline has greater visual weight. |
| Journey | A broad five-arch colonnade stages the five native semester controls; selected content and its real activity timeline remain accessible. |
| Honors | Four original artifacts sit on individual pedestal details within a grand gallery; exact outcomes remain 3rd Place, Top 10 Finalist, Top 5 Finalist, and Grant Recipient. |
| Projects | A monumental exhibition entrance, larger illustrated domain objects for the two featured works, and pedestal landmarks for the four supporting projects. No project screenshots or preview placeholders are introduced. |
| Research | A tall observatory landmark accompanies the filtered contribution records; on mobile it becomes an introductory scene above the records. |
| Skills | An observatory frontispiece introduces compact category-based capabilities, with no invented ratings or experience durations. |
| Experiments | A quieter inset technical archive retains the original repositories and coursework status. |
| Contact | A final panoramic archway and a clear foreground contact/CV area complete the architectural sequence. |

## Artwork, origins, and performance decisions

The complete prompts and processing record are saved in [generation-prompts.json](../assets-source/Grand%20Atelier%20Expansion/generation-prompts.json). Original generated PNGs are archived unchanged in `assets-source/Grand Atelier Expansion/`.

Production files are lossless WebP with a 64-color palette and zero dithering. Sharp nearest-neighbor processing preserves deliberate pixel edges. All new scenery is decorative, noninteractive, and lazy loaded; all critical content stays in HTML. Reused scenes share the same URL and can use the browser cache. Native `<picture>` sources serve smaller mobile assets at widths below 768px.

| Room | Desktop 960×640 | Mobile 480×320 |
|---|---:|---:|
| Library | 449,882 bytes | 129,372 bytes |
| Arcade | 378,156 bytes | 112,408 bytes |
| Gallery | 402,046 bytes | 117,540 bytes |
| Observatory | 427,902 bytes | 121,902 bytes |
| Four unique scenes total | 1,657,986 bytes | 481,222 bytes |

Mobile variants reduce the unique architecture payload by 70.98% compared with the desktop variants. These totals describe file bytes, not total page transfer or Lighthouse scores. No dependencies or fonts were added. The existing Georgia display and readable sans-serif hierarchy are preserved.

The original brand tokens remain navy `#0B1020`, surfaces `#151B2E`/`#1D263D`, border `#26324D`, teal `#5DE4C7`, blue `#5AA9FF`, purple `#A78BFA`, gold `#FFD166`, foreground `#F1F5F9`, and muted `#94A3B8`. Architectural raster shades derive from this palette. Text is placed on solid or nearly opaque navy surfaces; decorative pixels are excluded from the accessibility tree.

## Verification

Executed successfully:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build` — 13 generated static pages
- `node scripts/audit-cv.js` — both locale PDFs parse strictly, have two pages with extractable text, and independently render visible ink on every page
- `node scripts/audit-i18n.cjs` — 911 dictionary entries, no missing audited descriptive strings; original text/surface contrast pairs range from 5.52:1 to 17.28:1

Final production browser findings are recorded in [browser-results.json](atelier-expansion/browser-results.json). Visual evidence is saved in `docs/atelier-expansion/before/` and `docs/atelier-expansion/after/`. The baseline includes 40 screenshots and 123 protected-file hashes. The automated browser suite covers four mode/language combinations, eight widths (1440, 1280, 1024, 768, 430, 390, 375, 320), native controls, case studies, locale-specific CV downloads/print pages, keyboard navigation, mobile navigation, reduced motion, and asset loading.

Final result: **48/48 checks pass**, all 32 mode/language/viewport combinations pass, and 18 route checks pass. Console errors, runtime exceptions, failed network requests, unexpected HTTP errors, broken images, horizontal overflow, and horizontally clipped controls were all zero in this run. Professional Mode renders eight decorative architectural compositions using four unique rooms; Pixel Mode renders none. Every tested width and locale selected the correct mobile or desktop image source and loaded it successfully.

All 123 protected hashes match the pre-refinement baseline. Hero content pixels below the 65px navigation band are identical in all four EN/ID × 1440/390 before/after comparisons. Minor navigation hover/focus differences are outside that comparison; see [hero-preservation.json](atelier-expansion/hero-preservation.json).

Measured in Chromium 151.0.7922.34 against localhost with fresh browser contexts, cold cache, and no CPU/network throttling:

| Professional locale / width | LCP | CLS |
|---|---:|---:|
| English / 1440px | 532 ms | 0.00395 |
| Indonesian / 1440px | 608 ms | 0.00337 |
| English / 390px | 468 ms | 0 |
| Indonesian / 390px | 628 ms | 0 |

These are local browser measurements, not field performance or a Lighthouse score. Full resource measurements and Pixel Mode samples are retained in the browser results JSON.

Review [desktop before/after](atelier-expansion/review.png) and [mobile before/after](atelier-expansion/review-mobile.png). Manual inspection confirmed visible architectural landmarks, readable foreground content, and a coherent room sequence. The QA run downloaded both locale-specific PDFs and opened their print HTML pages; it did not invoke a native printer dialog.

Physical printer output, a full assistive-technology audit, and release Lighthouse/SEO QA are not represented as completed by this refinement. Formal CV formatting and generator code are unchanged.

## Files for this refinement

Modified application/configuration files:

- `.gitignore` — retain this review evidence
- `src/app/globals.css` — import the new stylesheet after existing Atelier styles
- `src/components/atelier/AtelierSections.tsx` — decorative room staging around existing canonical content and controls
- `src/components/sections/ProjectLab.tsx` — Professional-only exhibition scene

Created implementation files:

- `src/components/atelier/AtelierRoomScene.tsx`
- `src/styles/atelier-expansion.css`
- `scripts/prepare-atelier-expansion.cjs`
- `scripts/qa-atelier-expansion.cjs`
- `public/pixel/environment/atelier-library.webp`
- `public/pixel/environment/atelier-library-compact.webp`
- `public/pixel/environment/atelier-arcade.webp`
- `public/pixel/environment/atelier-arcade-compact.webp`
- `public/pixel/environment/atelier-gallery.webp`
- `public/pixel/environment/atelier-gallery-compact.webp`
- `public/pixel/environment/atelier-observatory.webp`
- `public/pixel/environment/atelier-observatory-compact.webp`
- `assets-source/Grand Atelier Expansion/library-original.png`
- `assets-source/Grand Atelier Expansion/arcade-original.png`
- `assets-source/Grand Atelier Expansion/gallery-original.png`
- `assets-source/Grand Atelier Expansion/observatory-original.png`
- `assets-source/Grand Atelier Expansion/generation-prompts.json`
- `docs/ATELIER_EXPANSION_REPORT.md`
- `docs/atelier-expansion/` — asset manifest, protected hashes, screenshots, browser diagnostics, and comparison sheets

The checkout already contains extensive uncommitted work from earlier phases. Those changes were preserved. The files listed above describe this refinement, not every change relative to Git HEAD. No canonical factual database, CV, original photograph, existing pixel asset, Hero source, or existing Pixel stylesheet was intentionally modified.

## Owner review

READY FOR OWNER VISUAL REVIEW. The remaining visual decision is whether the owner approves the grandeur, density, and composition of the new rooms on desktop and mobile. Existing portrait likeness approval from the earlier phase is unaffected by this task. No final visual approval is claimed.

After owner review, proceed to final SEO, Lighthouse, and release QA. Do not deploy automatically.
