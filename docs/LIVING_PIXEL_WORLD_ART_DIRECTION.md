# HANIF.EXE — Living Pixel World art direction

Phase 4D.1 · 14 October 2026 · Implementation plan, not owner visual approval.

## Audit and atmosphere

The clean baseline uses a split-grid hero, framed photograph, repeated terminal bars,
bordered academic matrices, equally weighted capability cards and application schematic
previews. The environment has little visual weight; the companion floats in a separate box.
The redesign is a peaceful blue-hour woodland where a small illuminated engineering
workshop anchors a continuous journey. Open reading areas and varied section compositions
carry the verified portfolio. Visitors never need to play a game to read it.

## Color, scale and composition

UI tokens remain #0B1020, #151B2E, #1D263D, #26324D, #5DE4C7, #5AA9FF,
#A78BFA, #FFD166, #F1F5F9 and #94A3B8. Environmental shadows use navy/purple;
foliage uses muted teal; distant forms use blue; small windows use gold. No daylight
green/orange theme. Text sits on clear navy areas, never in raster artwork.

The signature landscape uses a 768 × 432 logical canvas. Large contiguous silhouettes,
layered clouds, far mountains, a midground cabin and dark foreground foliage establish
depth before texture. Secondary objects use 48–192 logical pixels, displayed crisply
with nearest-neighbor rendering. Avoid isolated pixel noise, smooth decorative vectors,
scanlines and dot grids. The existing character occupies about one doorway's height;
one companion instance shares the existing state/context and docks at the hero path.

## Chapters

| Chapter | Composition |
| --- | --- |
| Beginning / hero | Full environmental stage, open name and concise introduction in a text-safe zone, Projects and CV actions, cabin/path focal point on right. Mobile stacks copy above a deliberate cabin crop. |
| Profile | Cozy workshop illustration beside one academic dossier; capability evidence in open rows. |
| About | Narrative chapter, research/book props and a small list of principles. |
| Interests | One prominent city diorama and varied readable domain groups. |
| Journey | Continuous path connecting five native semester buttons and existing milestone props; vertical trail on mobile; semester 5 visibly in progress. |
| Achievements | Open trophy shelf and a selected evidence panel preserving exact rankings and grant status. |
| Projects | Engineering chapters with small illustrative props, descriptions, maturity, technology labels, prominent real GitHub links and existing case studies. No preview viewports. |
| Research | Field notes with existing filters, result distinctions and readable evidence. |
| Skills | Open toolshelf groups with exact skills and supporting evidence. |
| Experiments / contact | Lightweight repository exploration and a calm closing clearing with existing verified contact links and CV. |

## Asset inventory and conversion strategy

Generate original woodland-workshop landscape and original interior workshop. Preserve
generated originals separately from optimized production exports under public/pixel/environment.
Reuse owner-provided journey, achievement and technology props. Author small stepped
cloud/foreground layers locally for continuity rather than five separate full backgrounds.
Archive existing assets-source files untouched. Audit image dimensions, bytes and provenance.

The two portrait files have identical SHA-256
6f1955d0913e7431d27d31e42233c566e5b66e458666085ce4f08b1ae726726e;
existing media configuration and documentation identify them as authentic owner media.
Keep the original in Recruiter Mode. Create a separate deterministic low-resolution,
palette-reduced portrait study only after inspecting the source; withhold any unsatisfactory
conversion from the live UI and flag it for owner review. Never rasterize text or CV.
Replace prominent decorative Lucide icons with existing pixel props. Preserve recognizable
semantic control icons and social marks where needed for usability.

## Motion, accessibility and responsive behavior

Use only slow transform-based cloud drift and restrained window light. No scroll hijacking,
canvas engine or expensive layout animation. Reduced motion freezes ambience. Decorative
images use empty alt and aria-hidden; all facts survive failed image loading. Keep skip link,
heading order, focus indicators, native links/buttons, trophy aria-pressed, journey selection,
research filters and dialogue dismissal. Recruiter Mode hides environment layers and pet,
retains professional layouts, and uses the same canonical records and persisted mode.

Test both modes at 1440, 1280, 1024, 768, 430, 390, 375 and 320px. Mobile scenery is
recomposed instead of shrinking a desktop layout; there is no horizontal scroll trap.
Prioritize only essential hero art; below-fold scenes are lazy, lossless WebP where suitable.
Report actual bytes and browser timing; make no unmeasured Core Web Vitals claims.

## Reference methodology

Adopt silhouette-first clusters and restrained texture from [Saint11 cluster sketching](https://saint11.art/pixel_art_articles/article2/),
cool shadow / warm light hierarchy from [Saint11 color theory](https://saint11.art/pixel_art_articles/article6/),
nearest-neighbor discipline from [Aseprite](https://www.aseprite.org/api/command/SpriteSize),
and background/tree/cloud craft from [Lospec](https://lospec.com/pixel-art-tutorials/).
[Ali Taee](https://www.alitaee.dev/) and [Pablo's Room](https://pablo.fail/how-i-built-pablos-room)
inform the idea of a portfolio as a place; no source artwork, branding or interactions are copied.
Owner's image references are available as textual descriptions only.

## Implementation sequence

1. Capture baseline browser views and establish this plan.
2. Generate/inspect original art; build the hero and reusable environment component.
3. Dock the existing companion naturally without a duplicate character system.
4. Replace profile/about/interests dashboard compositions.
5. Connect journey and achievements; simplify secondary chapters.
6. Remove all project preview dependencies and update media documentation.
7. Audit artwork and preserve source / content / CV hashes.
8. Run lint, production build, TypeScript, CV audit and actual responsive/interaction QA.
9. Capture screenshots, report qualitative scores and await owner review. No commit, push,
deployment, or Phase 4E work is authorized by this phase.
