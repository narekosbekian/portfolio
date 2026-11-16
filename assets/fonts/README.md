# Fonts

The fonts section of `css/styles.css` loads these files by exact name. Inter covers the entire
site now, and it's freely licensed.

| File | Family / weight | Used for | Size |
| --- | --- | --- | --- |
| `Inter-Regular.woff2` | Inter 400 | body copy, hero paragraph, footer links | 23 KB |
| `Inter-Medium.woff2` | Inter 500 | 64px display headings (hero, CTA band) | 24 KB |
| `Inter-SemiBold.woff2` | Inter 600 | buttons, "Explore case study" links | 24 KB |
| `Inter-Bold.woff2` | Inter 700 | section/work-card/case-study headings, tags, footer headings | 24 KB |

Total ≈ 95 KB.

`Inter-SemiBold.ttf` (66 KB) is separate from the `@font-face` set above — it's
not used for CSS text rendering. It's loaded once, at runtime, by the hero's
"product strategy." handwriting animation (`js/landing.js`), which parses it
with opentype.js to get real glyph outlines to stroke/fill as SVG paths. It
has to be a TTF/OTF (opentype.js can't decode WOFF2's Brotli compression on
its own), which is why it's a separate file from the WOFF2 set above rather
than reusing `Inter-SemiBold.woff2`.

`BricolageGrotesque-ExtraBold.woff2` is still sitting in this folder but is no
longer referenced anywhere — work-card and case-study titles moved to Inter
Bold. Safe to delete if you want the file gone; nothing will break either way.

## Where these came from

Inter is released under the
[SIL Open Font License 1.1](https://openfontlicense.org), which explicitly
permits self-hosting and redistribution — no licence to buy, nothing to track.

This is the Latin subset published by the [Fontsource](https://fontsource.org)
project (`@fontsource/inter@5`), fetched from the jsDelivr CDN. It covers Latin
only. If you ever need Armenian, Cyrillic or Greek glyphs, pull the matching
`-armenian-`, `-cyrillic-` or `-greek-` subset files from the same package and
add another `@font-face` block with a `unicode-range`.

## About Helvetica Neue

The original Figma design specifies Helvetica Neue for display, headings and
body. It is **not** used here. It is licensed by Monotype, and a desktop font
licence does not grant the right to serve the font to site visitors — that
needs a separate, paid webfont licence. Rather than carry that exposure on a
public site, the design's display face was switched to Inter, which is already
in use for buttons and tags and is licence-free.

If you ever buy the webfont licence and want to switch back:

1. Drop `HelveticaNeue-Regular.woff2`, `-Medium.woff2` and `-Bold.woff2` in here.
2. Add three `@font-face` blocks in the fonts section of `css/styles.css` at weights 400 / 500 / 700.
3. Point `--font-display` in the tokens section of `css/styles.css` at `"Helvetica Neue"`.

`--font-display` and `--font-ui` are kept as separate tokens precisely so that
swap stays a one-line change.

## Why `local()` comes first

Every `@font-face` lists `local(...)` before `url(...)`, so a visitor who
already has Inter installed renders instantly and downloads nothing. Everyone
else fetches the WOFF2. If a file is ever missing, it falls through to the
stack in the tokens section of `css/styles.css` (`-apple-system`, `Segoe UI`, `Roboto`, `Arial`).
