# Education That Inspires (Astro Starter)

Minerva-inspired redesign starter for `educationthatinspires.com`.

## Included
- `src/pages/index.astro`: homepage prototype layout and draft copy
- `src/pages/about.astro`: brand and mission page
- `src/pages/curriculum.astro`: curriculum and rigor page
- `src/pages/thecreativeworld.astro`: creative program page
- `src/pages/materials.astro`: teaching-materials architecture and history-sequence overview
- `src/pages/evidence.astro`: action-research evidence and student voices
- `src/pages/contact.astro`: contact and intake page
- `src/styles/global.css`: visual system (typography, color tokens, spacing, motion)
- `docs/homepage-blueprint.md`: section-by-section strategic blueprint
- `docs/program-architecture.md`: current grade-band and AP sequence definition
- `docs/style-tile.md`: design language reference
- `docs/migration-checklist.md`: preservation-first migration workflow
- `docs/photo-workflow.md`: dedupe and curation steps for incoming photos
- `docs/photo-selections.md`: current chosen image mapping for live slots
- `docs/source-extracts-teleodynamic.md`: quote/source traceability for current copy
- `docs/source-extracts-history.md`: source traceability for teaching-materials copy
- `scripts/prepare-photo-library.sh`: deduplicates images into a reusable library

## Local Development
```bash
cd /Users/thescepter/Desktop/canvas-codex-project/educationthatinspires-site
npm install
npm run dev
```

## Next Build Pass
1. Run `./scripts/prepare-photo-library.sh` after photos land in `photos`.
2. Curate five featured images into `public/images/library` using the names in `docs/photo-workflow.md`.
3. Confirm publication consent for named student quotations and dialogue excerpts.
4. Review `materials.astro` copy against current AP policies and publication preferences.
5. Add production redirects and deploy to Cloudflare Pages.
