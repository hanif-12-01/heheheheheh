# HANIF.EXE — Owner Media Integration Guide

Phase 4D.1 · 14 October 2026 · Direct static files and verified configuration.

## Portrait originals and pixel treatment

The existing authorized portrait is `public/profile/hanif-portrait.jpeg`, configured by `MEDIA_CONFIG.portrait` in `src/lib/mediaConfig.ts`. Its bytes match `public/Foto Profil hanif.jpeg`. Preserve both originals unchanged. Recruiter Mode may display the authentic photograph.

A Pixel Mode portrait treatment must be a separate asset, for example `public/profile/hanif-portrait-pixel.png`. Inspect the actual photograph before conversion, crop intentionally, reduce to a logical pixel canvas, quantize a controlled palette and enlarge with nearest-neighbor. Inspect facial fidelity and silhouettes at the intended display size. The conversion must not invent facial features or change identity.

If a conversion fails visual review, keep it out of the live UI and retain the honest approved portrait placeholder until the owner reviews a satisfactory study. `image-rendering: pixelated` alone does not constitute conversion. Record the input/output paths, parameters, dimensions, byte sizes and review status in the asset audit.

## Projects: descriptions and repository links

Project screenshots and schematic previews are no longer part of the public presentation. The owner requirement is verified descriptions plus actual GitHub repository links, with technology labels, maturity/status and exact achievements where applicable. These canonical records remain in `src/data/projects.ts`.

| Project | Actual repository |
| --- | --- |
| WattWise AI | https://github.com/hanif-12-01/start-up-repo |
| Purwokerto Intelligence Layer | https://github.com/hanif-12-01/Purwokerto-intelligence-layer |
| SIMOBS | https://github.com/hanif-12-01/bengkel |
| Lapor Mangan | https://github.com/hanif-12-01/LAPORMANGAN |
| Bernas MBG | https://github.com/hanif-12-01/Bernas-MBG |
| Fuzzy Rain Risk Index | https://github.com/hanif-12-01/Tubes-Dasar-Kecerdasan-Artificial |

Homepage chapters, `/projects`, and all six `/projects/[slug]` case studies consume those same records. Decorative pixel domain props have empty alt text and are hidden from assistive technology; they do not imply a captured application interface. Source-code evidence, highlights and engineering notes remain readable without artwork.

The legacy `MEDIA_CONFIG.projectScreenshots` fields and `ProjectPreviewViewport.tsx` remain optional unused source. Adding a screenshot there does not automatically display it. Screenshots are not mandatory before launch and no six-image capture task is outstanding. Any later request to reintroduce real software captures must be separately authorized and must never use fabricated dashboards.

## Contact channels

Current GitHub, LinkedIn, Instagram and email values were supplied by the owner and are active in `src/data/socials.ts`. Preserve those verified records. If the owner later withdraws a value, set the respective channel to its honest non-interactive placeholder state; do not infer replacements or use dead anchors.

## Original environmental artwork

Store optimized original production scenes under `public/pixel/environment/`, with generation/source provenance and dimensions in the asset inventory. Preserve Phase 4C `assets-source/` originals. Environment illustrations support the portfolio; they are not software evidence or personal photographs. Keep essential content in semantic HTML, lazy-load below-fold decorative media and use intentional responsive cropping.

## Local checks after any authorized media change

1. Run the local development server and inspect both Pixel Mode and Recruiter Mode.
2. Inspect desktop and narrow mobile layouts for cropping, crisp pixel scale, readable content and overflow.
3. Check all rendered images load and decorative media uses empty alt text.
4. Verify real repository links, case-study routes and CV download still work.
5. Preserve canonical facts and CV files, and keep unapproved portrait studies out of production presentation.

This guide does not authorize deployment or Phase 4E work.
