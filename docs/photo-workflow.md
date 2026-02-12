# Photo Workflow

## 1) Drop Source Photos
- Put all phone images in:
  - `/Users/thescepter/Desktop/canvas-codex-project/educationthatinspires-site/photos`

## 2) Build Deduplicated Library
- Run:
```bash
cd /Users/thescepter/Desktop/canvas-codex-project/educationthatinspires-site
./scripts/prepare-photo-library.sh
```

- Output locations:
  - Deduplicated library: `public/images/library/raw`
  - Manifest (includes duplicates): `docs/photo-manifest.tsv`

## 3) Curate Featured Images
Copy your selected images from `public/images/library/raw` to these names used by the site:
- `public/images/library/hero.jpg`
- `public/images/library/story-socratic.jpg`
- `public/images/library/story-creative.jpg`
- `public/images/library/about-hero.jpg`
- `public/images/library/creative-hero.jpg`

## 4) Review
After those five files exist, pages automatically switch from SVG placeholders to real photos.
