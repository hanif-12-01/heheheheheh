# Internal Development QA Routes Archive

> **Location:** `tools/dev-route-archive/`  
> **Archived Routes:** `/dev/pixel-assets`, `/dev/world-assets`  
> **Phase:** Phase 4C — Production Hygiene

---

## 1. Why These Routes Were Archived

During Phase 2A and 2B, two development QA inspectors were created:
1. `pixel-assets`: Interactive visual inspector for Pixel Hanif character poses, scales, baselines, and states against the 1600×1600 master canvas.
2. `world-assets`: Visual grid inspector for all 30 approved Journey props, Achievement medals, Tech domain illustrations, and UI pixel icons across light/dark/checkerboard backgrounds.

In production builds, Next.js App Router automatically discovers any `page.tsx` within `src/app/`. To prevent internal QA pages from being exposed to the public internet, these components have been archived outside `src/app/`.

---

## 2. How to Temporarily Restore for Local Development

When you need to visually audit normalized sprites or world assets during future development:

```bash
# 1. Ensure you are at the project root:
cd D:\LOMBA\Portofolio

# 2. Re-create the dev directory under src/app:
mkdir src/app/dev

# 3. Move the archived routes back into src/app/dev:
git mv tools/dev-route-archive/pixel-assets src/app/dev/pixel-assets
git mv tools/dev-route-archive/world-assets src/app/dev/world-assets

# 4. Start the dev server:
npm run dev

# 5. Access the inspectors locally:
#    http://localhost:3000/dev/pixel-assets
#    http://localhost:3000/dev/world-assets
```

---

## 3. How to Archive Again Before Publishing / Production Build

When QA is complete:

```bash
# 1. Move the routes back to the tools archive:
git mv src/app/dev/pixel-assets tools/dev-route-archive/pixel-assets
git mv src/app/dev/world-assets tools/dev-route-archive/world-assets

# 2. Remove the empty src/app/dev directory:
rmdir src/app/dev

# 3. Verify clean production build:
npm run build
```
