# Nare Kosbekian — Portfolio

Static HTML/CSS/JS portfolio built from the Figma file
[Portfolio](https://www.figma.com/design/XKcjU4rvYiUxGTobyWxgXw/Portfolio)
(`Landing Page` → `index.html`, `Work 2` → `case-study.html`).

No framework, no build step, no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 4173
```

Then visit <http://localhost:4173>.

## Layout

```
index.html            Landing page shell
case-study.html       Case-study template — one page serves every project
css/
  styles.css          One stylesheet: design tokens, @font-face, then all site styles
js/
  content.js          ← ALL site copy, image paths and case studies live here
  ui.js               Shared header, footer, buttons, image fallback
  landing.js          Renders the landing page
  case-study.js       Renders a case study from ?id=<slug>
assets/
  brand/              Artwork exported from Figma (hero blob, logo mark, footer photo)
  icons/              arrow-right.svg
  images/             Your photos — see assets/images/README.md
  fonts/              Your .woff2 files — see assets/fonts/README.md
```

## Editing content

`js/content.js` is the only file you need for day-to-day changes. It holds
every string, every link and every image path on the site.

### Adding a case study

Append one object to `work.projects` in `js/content.js`:

```js
{
  slug: "new-project",                 // becomes case-study.html?id=new-project
  tag: "Product · Design",
  title: "New project",
  summary: "One line describing it",
  cover: { image: "assets/images/work/new-project-cover.jpg", alt: "…" },
  caseStudy: {
    hero: { image: "assets/images/work/new-project-hero.jpg", alt: "…" },
    blocks: [
      { type: "text",  heading: "The problem", body: ["Paragraph.", "Another."] },
      { type: "image", image: "assets/images/work/new-project-01.jpg", alt: "…" },
      { type: "text",  heading: "The outcome", body: ["Paragraph."] }
    ]
  }
}
```

The card appears in the work grid and its case-study page starts working
immediately. `blocks` accepts any number of `text` and `image` entries in any
order; `image` blocks take an optional `caption`.

### Adding images

Put the file under `assets/images/` and point a `image:` field at it.
Any path with no file behind it renders as a labelled placeholder showing the
expected filename, so the layout never collapses. Full manifest with suggested
sizes: [`assets/images/README.md`](assets/images/README.md).

### Still to fill in

- `site.linkedinUrl` is still the `"#"` placeholder.
- `about.body` and the last two projects still carry the Figma placeholder copy.
- Fonts are Inter + Bricolage Grotesque, both self-hosted and open-licensed.
  The Figma specifies Helvetica Neue for display type; it was swapped for Inter
  to avoid the commercial webfont licence — see
  [`assets/fonts/README.md`](assets/fonts/README.md).
