# HANIF.EXE — Living Pixel World asset audit

14 October 2026 · Source originals preserved · Owner visual approval pending.

## Inventory and provenance

Two original scenes were produced using the built-in image_gen tool. Exact prompts and
source destinations are recorded in [generation-prompts.json](visual-review/generation-prompts.json).
No reference image, copied source illustration, train, house design, or third-party artwork
was used. The supplied references were textual descriptions and methodology references.
Generated originals are retained in assets-source/Living Pixel World/:

| Source | Dimensions | Bytes |
| --- | --- | --- |
| woodland-workshop-original.png | 1672 × 941 | 2,186,661 |
| workshop-interior-original.png | 1448 × 1086 | 2,370,218 |

The deterministic Sharp pipeline is scripts/prepare-living-world.cjs. Nearest-neighbor
resize, 64 colors, zero dithering, lossless WebP. Hero logical size is 768 × 432;
interior is 384 × 288. Character trim retains alpha and reduces each existing pose
to 144px tall. Existing props use 32px UI, 192px items, and 384px city/sheet canvases.
CSS uses image-rendering: pixelated. The nine states keep the same existing context.
The two SVG layers use integer coordinates and shape-rendering: crispEdges; they are
secondary decorations, not substitutes for the signature raster artwork.

| Production file | Dimensions | Bytes | Origin / preparation |
| --- | --- | --- | --- |
| `public/pixel/environment/clouds.svg` | 768 × 160 | 419 | Original crisp-edge SVG layer |
| `public/pixel/environment/foreground.svg` | 768 × 96 | 593 | Original crisp-edge SVG layer |
| `public/pixel/environment/woodland-workshop.webp` | 768 × 432 | 182,736 | Original generated scene, 64-color logical-grid export |
| `public/pixel/environment/workshop-interior.webp` | 384 × 288 | 72,902 | Original generated scene, 64-color logical-grid export |
| `public/pet/optimized/coding.webp` | 68 × 144 | 4,978 | Existing owner sprite, alpha-trimmed 144px export |
| `public/pet/optimized/idle.webp` | 55 × 144 | 5,038 | Existing owner sprite, alpha-trimmed 144px export |
| `public/pet/optimized/microphone.webp` | 72 × 144 | 5,086 | Existing owner sprite, alpha-trimmed 144px export |
| `public/pet/optimized/reading.webp` | 64 × 144 | 5,046 | Existing owner sprite, alpha-trimmed 144px export |
| `public/pet/optimized/rocket.webp` | 79 × 144 | 5,546 | Existing owner sprite, alpha-trimmed 144px export |
| `public/pet/optimized/sleep.webp` | 101 × 144 | 8,820 | Existing owner sprite, alpha-trimmed 144px export |
| `public/pet/optimized/trophy.webp` | 66 × 144 | 5,050 | Existing owner sprite, alpha-trimmed 144px export |
| `public/pet/optimized/walk.webp` | 69 × 144 | 5,052 | Existing owner sprite, alpha-trimmed 144px export |
| `public/pet/optimized/wave.webp` | 66 × 144 | 5,352 | Existing owner sprite, alpha-trimmed 144px export |
| `public/pixel/journey/semester-1-backpack.webp` | 160 × 192 | 16,152 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/journey/semester-2-organization-building.webp` | 192 × 124 | 11,148 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/journey/semester-3-book.webp` | 192 × 133 | 12,668 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/journey/semester-3-microphone.webp` | 174 × 192 | 10,046 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/journey/semester-4-research-document.webp` | 192 × 169 | 16,522 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/journey/semester-4-research-flask.webp` | 146 × 192 | 11,462 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/journey/semester-4-trophy.webp` | 164 × 192 | 12,142 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/journey/semester-5-rocket.webp` | 171 × 192 | 10,858 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/achievements/achievement-confetti.webp` | 192 × 147 | 9,332 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/achievements/achievement-laurel.webp` | 192 × 175 | 14,276 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/achievements/achievement-medal.webp` | 126 × 192 | 12,312 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/achievements/achievement-sheet.webp` | 384 × 283 | 38,378 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/achievements/achievement-sparkle.webp` | 192 × 173 | 8,684 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/achievements/achievement-trophy.webp` | 173 × 192 | 13,916 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/tech/tech-ai-chip.webp` | 192 × 177 | 16,612 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/tech/tech-code-editor.webp` | 192 × 137 | 15,232 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/tech/tech-database.webp` | 160 × 192 | 12,894 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/tech/tech-gis-map.webp` | 192 × 150 | 15,480 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/tech/tech-server.webp` | 192 × 159 | 18,060 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/tech/tech-smart-city.webp` | 384 × 280 | 42,436 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-arrow-down.webp` | 32 × 32 | 962 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-arrow-left.webp` | 32 × 32 | 1,020 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-arrow-right.webp` | 32 × 32 | 1,022 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-check.webp` | 32 × 32 | 924 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-checkpoint.webp` | 32 × 32 | 922 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-code.webp` | 32 × 32 | 806 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-external-link.webp` | 32 × 32 | 1,142 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-folder.webp` | 32 × 32 | 1,084 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-map-pin.webp` | 32 × 32 | 982 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-sparkle.webp` | 32 × 32 | 988 | Existing authorized pixel prop, 32 / 192 / 384px export |
| `public/pixel/ui/ui-star.webp` | 32 × 32 | 1,028 | Existing authorized pixel prop, 32 / 192 / 384px export |

Production exports total **636,108 bytes**: environment 256,650; companion poses 49,968;
reused props 329,490. Their original prop PNGs total 14,125,615 bytes and remain untouched.
The city changes from 1,436,704 to 42,436 bytes. These are disk weights, not Core Web Vitals.

## Visual conversion classification

| Family / source | Class | Treatment and verification | Owner decision |
| --- | --- | --- | --- |
| New woodland and workshop originals | A — generated pixel artwork | Silhouette-led composition, 64-color export. Scene previews and actual browser screenshots reviewed for detail, cool shadows, gold focal light. Generated pixel art is not claimed to be hand drawn. | Review scene composition. |
| Existing journey, tech, trophy and UI PNGs | A — authorized pixel artwork; drawing authorship not independently established | Originals retained. Nearest logical-grid WebP exports inspected at intended size; transparent edges preserved. City, book, trophy and character samples visually checked. | Normal visual review. |
| public/Foto Profil hanif.jpeg and public/profile/hanif-portrait.jpeg | C — owner photograph | Existing config/register authenticate media. Files are SHA-256 identical. Unchanged photo appears only in Recruiter Mode. | No new publication inferred from filename. |
| Portrait conversion study | C-derived | Source crop x530,y500,650×1000 → 104×160 nearest; 24 colors, no dither; 3× nearest export. Kept in docs/visual-review/portrait-study. It retains photographic clutter and soft face detail. Withheld from production. | A finished portrait would need owner review; current study is not approved artwork. |
| Lucide controls / social logos | D — smooth semantic marks | Retained where menu, mode, visibility or recognizable social identity assists usability. Prominent decorative icons use pixel props; footer and pet sparkle now pixel assets. | Small semantic control exceptions documented. |
| CV, HTML text, code / source evidence | E / F | Readable, unchanged. No filters or rasterization. Public projects use descriptions and real repositories, with no screenshots or schematic captures. | None introduced by conversion. |
| Previously archived environment / character / world sheets | A — archived authorized source | Unreferenced originals preserved; 31 original archive files / 30,738,134 bytes remain outside new source directory. | None. |

## Reference application

[Saint11 cluster sketching](https://saint11.art/pixel_art_articles/article2/) informed
large connected silhouettes and far-to-near layering. [Saint11 color theory](https://saint11.art/pixel_art_articles/article6/)
informed controlled saturation and cool shadow / warm light hierarchy. [Aseprite scaling](https://www.aseprite.org/api/command/SpriteSize)
informed nearest-neighbor enlargement. [Lospec](https://lospec.com/pixel-art-tutorials/)
provided a craft reference for background composition. [Ali Taee](https://www.alitaee.dev/)
and [Pablo's Room](https://pablo.fail/how-i-built-pablos-room) informed the concept of
an explorable portfolio place; no branding, source art or interaction was copied.

This supersedes stale environment/screenshot/portrait readiness statements in the older
ASSET_MANIFEST.md; immutable prior-phase records are retained as historical documentation.

