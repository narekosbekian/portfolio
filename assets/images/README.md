# Images

Every image on the site is referenced by a path in `js/content.js`.
Drop a file at the path listed there and it appears — no code changes needed.
While a file is missing, the site draws a dashed placeholder box showing the
exact path it expects, so you can always see what is still outstanding.

## What the site is currently asking for

| Path | Used for | Suggested size |
| --- | --- | --- |
| `assets/images/hero-portrait.webp` | Hero portrait (left of the headline) | 1803 × 1872, cut-out WebP (quality 95, transparent) |
| `assets/images/about/gallery-1.jpg` … `gallery-6.jpg` | "About me" scrolling photo strip | 180 × 180 (square) |
| `assets/images/highlights/research.png` | Icon — "Research that reaches" | 200 × 200 |
| `assets/images/highlights/practice.png` | Icon — "Built the practice…" | 200 × 200 |
| `assets/images/highlights/directions.png` | Icon — "Design across directions" | 200 × 200 |
| `assets/images/avatars/cedric-maalouf.jpg` | Testimonial avatar | 112 × 112 (square) |
| `assets/images/avatars/lama-zaher.jpg` | Testimonial avatar | 112 × 112 (square) |
| `assets/images/avatars/mohammad-ali-elhussein.jpg` | Testimonial avatar | 112 × 112 (square) |
| `assets/images/work/<slug>-cover.jpg` | Work card cover | 1330 × 660 (2 : 1) |
| `assets/images/work/<slug>-hero.jpg` | Case-study banner | 2706 × 700 |
| `assets/images/work/<slug>-01.jpg` … | Case-study body images | 2706 × 800 (approx 3.4 : 1) |

`<slug>` is the project's `slug` in `js/content.js`: `research-system`,
`verification-flow`, `project-three`, `project-four`.

## Adding an image somewhere new

1. Put the file under `assets/images/`.
2. Point a `image:` field in `js/content.js` at it.
3. Give it a meaningful `alt:` — it is read aloud by screen readers.

Images are lazy-loaded and cropped with `object-fit: cover`, so anything close
to the listed aspect ratio works. Export at roughly 2× the display size for
sharp rendering on high-density screens, and keep files under ~400 KB.

## Not in this folder

`assets/brand/` holds the artwork exported straight from the Figma file — the
hero blob, the logo mark and the footer photo. Leave those
alone unless the design changes.
