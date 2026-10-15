# Phase 4D.2 environmental refinement

The existing Hero panorama and cozy profile room already established the visual language. The largest gaps were the flat semester strip, floating achievement props and visually empty project introduction. This phase retains the strongest existing art and introduces three original scenes, generated with the built-in image_gen tool using the existing panorama solely as a style reference.

| Scene | Composition and prompt intent | Production bytes |
|---|---|---:|
| `connected-trail.webp` | Five clear trail landings, layered blue mountains, teal woodland, stepped paths, lanterns, mist, ferns and stream; no text or milestone props baked in | 199,710 |
| `achievement-hall.webp` | Timber and stone hall, arched forest windows, lanterns, empty niches and shelves; no fabricated awards or text | 215,180 |
| `engineering-courtyard.webp` | Research workshop with lit windows, observatory dome, workbench, paths and garden; calm left area for project copy, no screenshots or diagrams | 200,976 |

All source PNGs remain in `assets-source/Living Pixel World/*-original.png`; previous archived originals are untouched. `scripts/prepare-world-refinement.cjs` produces 768×432, 64-color, no-dither, lossless WebP files through nearest-neighbor sampling. Three originals total 7,560,666 bytes; production outputs total 615,866 bytes. These are file payload measurements, not a claim of faster page loading. Exact manifests: `docs/phase-4d2/environment-assets.json`.

The trail has staggered desktop landmarks and a vertical mobile route. Existing semester sprites and their five factual milestones remain unchanged. Current Semester 5 stays in progress. The hall separates podium trophy, finalist medal, finalist laurel and grant document; selecting an object exposes its exact record. Labels have dark reading surfaces and native buttons. The project courtyard frames the introductory copy, while descriptions, technology stacks, status and verified repositories remain HTML editorial rows. No screenshot or schematic placeholder is reintroduced.

`WorldScene` owns decorative, aria-hidden image layers. `world-refinement.css` owns the scene-specific staging, responsive crops and readable label surfaces. Hero, room, reading corner, engineering interests, research notes, tool shelves and contact retain their existing differentiated compositions. The scene system remains an ordinary scrolling portfolio. Recruiter Mode retains restrained presentation. Below-fold scene images load lazily; Hero preload and subtle cloud motion are preserved. Reduced motion disables scene animation.

UI tokens retain #0B1020, #151B2E, #1D263D, #26324D, #5DE4C7, #5AA9FF, #A78BFA, #FFD166, #F1F5F9 and #94A3B8. Derivative stone/wood shades live in artwork, not a new UI palette. Stray pink accents in profile/research/contact were returned to purple.

Before evidence: `docs/phase-4d2/before`. After evidence: `docs/phase-4d2/after`, in both languages at 1440 and 390px. Hero environment itself is retained: its change is bilingual copy/CV actions, not a fabricated new panorama. Visual quality remains subject to owner approval. To roll back only new scenes, remove the three new WorldScene variants, their section placements and `world-refinement.css` import; preserve archived sources and prior artwork. Do not revert the entire dirty project.
