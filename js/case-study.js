/* ==========================================================================
   Case-study page renderer — Figma node 105:2141 ("Work 1")

   Layout, top to bottom, exactly as in the Figma frame:
     header · page title + subtitle + links + category badges ·
     [optional hero] · a flat sequence of blocks · footer

   caseStudy.links (optional) is an array of lines under the subtitle —
   each line an array of segments (a plain string, or { text, href } for
   an inline link) — rendered as one <br>-separated paragraph. See
   linksBlock().

   A block is one of:
     Any top-level block may also carry `spaceBefore` (e.g. "30px") — the
     gap above it, in place of the page's default 60px (see page()).
     { type: "image", image, alt, caption?, bg?, ratio?, height?, width?, align?, fit? }
       `fit: "cover"` fills a `bg` frame edge to edge (cropping) instead of
       the default letterboxed contain. `shiftX`/`shiftY` (e.g. "15px", "-15px") nudge the image sideways/vertically; `scale` (e.g. 1.3) enlarges it.
       `video` (a path instead of `image`, optional `poster` still) renders a muted, looping,
       autoplaying <video> in place of an <img> — for a screen recording
       rather than a still. Lazily assigned its src via IntersectionObserver
       (see lazyPlayVideo) since these are large files not needed until
       scrolled into view.
       `bg` frames the image on a solid colour with object-fit:contain,
       instead of cropping it edge-to-edge (see .cs-image--framed) — for a
       UI-mockup image with transparent margins rather than a bleed photo.
       `ratio` (e.g. "1353 / 707") overrides the default aspect-ratio for
       an image whose real proportions don't match the usual banner/
       thumbnail shape — otherwise object-fit:cover crops it to fit.
       `height` (e.g. "200px") sets a literal height instead of a
       width-driven ratio, for a spec given as a fixed height, full width —
       via the --cs-image-h custom property, so styles.css's ≤860px rule
       can still scale it down for mobile (a plain inline height couldn't
       be overridden by any stylesheet media query).
       `width` (e.g. "360.91px") fixes an item's own width instead of
       sharing a row equally with its siblings (see .cs-image--fixed-w) —
       for one image in an image-row/split with its own explicit size.
       `align` (e.g. "bottom", "center top") sets object-position — where
       a contain-fit image sits within its box, if not the default centre.
       Omit `image` to render as an explicit "no image yet" placeholder.
     { type: "text", heading?, variant?, body }
       `body` is an array where each item is a paragraph string, a
       { lines: [...] } paragraph (one <p>, <br> between lines; "" makes a
       blank line; a line is a string, {strong}, or an array of those), or
       { list: "ol"|"ul"|"impact"|"cards"|"insights", items, flush? }.
       "insights" is arrow + accent title + description (items:
       {title, lines}[]). `flush` drops the gap above a list; `bullets` shows disc markers. "impact" is the
       arrow-bullet highlight style (items: string[]) — used by Insight.
       "cards" is a row of icon+text cards (items: {icon, text}[]) — used
       by Impact. `variant: "note"` is the small italic disclaimer style.
     { type: "group", blocks }
       Wraps nested blocks (almost always "text") in a tighter 30px gap —
       Figma's "portfolio-grid" sections — versus the page's own 60px gap
       between top-level blocks.
     { type: "split", left, right, gap? }
       Any two blocks side by side (text+text, or text+image-row, etc.) —
       `left`/`right` are themselves block specs, rendered recursively via
       renderBlock(). Stacks on mobile (see the ≤860px rule for .cs-split).
     { type: "image-row", images }
       Two or more smaller companion images side by side — each entry in
       `images` is an "image" block's fields. Sized differently depending
       on whether it's standalone (a closing gallery strip) or nested
       inside a "split" (paired with text) — see the .cs-image-row rules.
       Stacks on mobile.

     { type: "flow", steps }
       A row of boxed steps joined by arrows (steps: {phase?, title, lines}[]);
       `phase` is a small bold label above the step's title.

   `caseStudy.theme` is a map of CSS custom properties set on the page
   (--cs-accent, --cs-accent-soft, --cs-cards-gap) to re-colour a case study.

   One template serves every project. The project is chosen by the query
   string:  case-study.html?id=<slug>   where <slug> matches a `slug` in
   CONTENT.work.projects.
   ========================================================================== */

(function () {
  "use strict";

  var C = window.CONTENT;
  var el = UI.el, append = UI.append, media = UI.media, anchor = UI.anchor;

  function findProject() {
    var id = new URLSearchParams(window.location.search).get("id");
    if (!id) return null;
    for (var i = 0; i < C.work.projects.length; i++) {
      if (C.work.projects[i].slug === id) return C.work.projects[i];
    }
    return null;
  }

  /* ---- Blocks --------------------------------------------------------- */
  /* A run of inline parts: plain strings and {strong} bold spans. */
  function inline(node, parts) {
    [].concat(parts).forEach(function (part) {
      if (typeof part === "string") node.appendChild(document.createTextNode(part));
      else if (part.strong) append(node, el("strong", null, part.strong));
    });
    return node;
  }

  /* One <p> whose lines are separated by <br> — how Figma's single text
     layers with hard returns render; "" gives a blank line. */
  function linesParagraph(item) {
    var p = el("p");
    item.lines.forEach(function (line, i) {
      if (i > 0) append(p, el("br"));
      inline(p, line);
    });
    return p;
  }

  function bodyList(item) {
    if (item.list === "cards") {
      var cards = el("div", "cs-cards");
      item.items.forEach(function (card) {
        var box = el("div", "cs-card");
        var icon = el("img");
        icon.src = card.icon;
        icon.alt = "";
        icon.setAttribute("aria-hidden", "true");
        append(box, [icon, el("span", null, card.text)]);
        append(cards, box);
      });
      return cards;
    }

    if (item.list === "insights") {
      var insights = el("ul", "cs-list--insights");
      item.items.forEach(function (entry) {
        var head = el("div", "cs-insight__head");
        var arrow = el("span", "cs-arrow");
        arrow.setAttribute("aria-hidden", "true");
        append(head, [arrow, el("span", "cs-insight__title", entry.title)]);
        append(insights, append(el("li"), [head, linesParagraph(entry)]));
      });
      return insights;
    }

    var isImpact = item.list === "impact";
    var list = el(item.list === "ol" ? "ol" : "ul", isImpact ? "cs-list--impact" : ([item.flush && "cs-list--flush", item.bullets && "cs-list--disc"].filter(Boolean).join(" ") || null));
    item.items.forEach(function (text) {
      var li = el("li");
      if (isImpact) {
        var icon = el("img");
        icon.src = "assets/icons/arrow-right.svg";
        icon.alt = "";
        icon.setAttribute("aria-hidden", "true");
        append(li, [icon, el("span", null, text)]);
      } else {
        inline(li, text);
      }
      append(list, li);
    });
    return list;
  }

  function textBlock(block) {
    var node = el("div", "cs-text" + (block.variant === "note" ? " cs-text--note" : ""));
    if (block.heading) append(node, el("h2", null, block.heading));
    (block.body || []).forEach(function (item) {
      if (typeof item === "string") append(node, el("p", null, item));
      else append(node, item.lines ? linesParagraph(item) : bodyList(item));
    });
    return node;
  }

  function imageBlock(block) {
    var frame = el("div", "cs-image" + (block.bg ? " cs-image--framed" : ""));
    if (block.bg) frame.style.setProperty("--cover-bg", block.bg);
    if (block.fit) frame.classList.add("cs-image--fit-" + block.fit);
    /* Overrides the class's own aspect-ratio for an image whose real
       proportions don't match the default banner/thumbnail shape — a
       screenshot or diagram where cropping to fit would cut off content. */
    if (block.ratio) frame.style.aspectRatio = block.ratio;
    /* A literal height (e.g. "200px") instead of a width-driven ratio —
       for a block whose spec is "this tall", full width, not "this shape".
       Set as a custom property (not a direct .style.height) so the ≤860px
       rule in styles.css can still scale it down for mobile — a plain
       inline height would out-specificity any stylesheet media query. */
    if (block.height) {
      frame.style.setProperty("--cs-image-h", block.height);
      frame.style.aspectRatio = "auto";
    }
    /* A literal width — for an item in an image-row/split that should hold
       its own fixed size instead of sharing the row equally with its
       siblings. Same custom-property approach as `height`, so it can still
       be reset to full-width on mobile (see .cs-image--fixed-w). */
    if (block.width) {
      frame.classList.add("cs-image--fixed-w");
      frame.style.setProperty("--cs-image-w", block.width);
    }
    var img = block.video ? videoEl(block) : media({ image: block.image, alt: block.alt });
    /* Where object-fit:contain parks the image within its box — defaults
       to the browser's own centered position when omitted. */
    if (block.align && img.tagName === "IMG") img.style.objectPosition = block.align;
    /* Nudges (shiftX/shiftY) and/or enlarges (scale, about the centre) the image
       within its frame — the frame clips whatever overflows. */
    var transform = [block.shiftX && "translateX(" + block.shiftX + ")", block.shiftY && "translateY(" + block.shiftY + ")", block.scale && "scale(" + block.scale + ")"].filter(Boolean).join(" ");
    if (transform) img.style.transform = transform;
    append(frame, img);
    if (!block.caption) return frame;

    var figure = el("figure", "cs-figure");
    append(figure, [frame, el("figcaption", null, block.caption)]);
    return figure;
  }

  function videoEl(block) {
    var video = el("video");
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.preload = "none";
    /* A still of the first frame — shows straight away, and stays visible if a
       phone (data saver, low-power mode) refuses to autoplay the video. */
    if (block.poster) video.poster = block.poster;
    video.setAttribute("aria-label", block.alt || "");
    lazyPlayVideo(video, block.video);
    return video;
  }

  /* Assigns `src` and starts playback only once the video scrolls near the
     viewport — these are large screen-recording files, so eagerly loading
     several on one page load would be wasteful. If the browser blocks
     autoplay, fall back to native controls so the visitor can tap play. */
  function lazyPlayVideo(video, src) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        video.preload = "metadata";
        video.src = src;
        var started = video.play();
        if (started && started.catch) started.catch(function () {
          /* Blocked (background tab, data saver, low-power mode): offer native
             controls, and retry on their own once the tab is brought forward. */
          video.controls = true;
          document.addEventListener("visibilitychange", function retry() {
            if (document.hidden) return;
            var again = video.play();
            if (again && again.then) again.then(function () { video.controls = false; }, function () {});
            document.removeEventListener("visibilitychange", retry);
          });
        });
        io.unobserve(video);
      });
    }, { rootMargin: "200px" });
    io.observe(video);
  }

  function flowBlock(block) {
    var flow = el("div", "cs-flow");
    block.steps.forEach(function (step, i) {
      if (i > 0) {
        var arrow = el("img", "cs-flow__arrow");
        arrow.src = "assets/icons/flow-arrow.svg";
        arrow.alt = "";
        arrow.setAttribute("aria-hidden", "true");
        append(flow, arrow);
      }
      var box = el("div", "cs-flow__step");
      var content = el("div");
      if (step.phase) append(content, el("strong", "cs-flow__phase", step.phase));
      var text = el("p");
      [step.title, ""].concat(step.lines).forEach(function (line, j) {
        if (j > 0) append(text, el("br"));
        text.appendChild(document.createTextNode(line));
      });
      append(content, text);
      append(box, content);
      append(flow, box);
    });
    return flow;
  }

  function renderBlock(block) {
    if (block.type === "image") return imageBlock(block);
    if (block.type === "group") {
      var grid = el("div", "cs-grid");
      append(grid, renderBlocks(block.blocks));
      return grid;
    }
    if (block.type === "split") {
      /* When a split pairs text with an image-row (A/B Test Results), the
         text column runs narrower so the paired images can run bigger —
         see .cs-split--gallery. A plain text+image or text+text split
         (Testing Focus, Problem Statement+Goals) keeps the default even
         share instead. */
      var isGallery = (block.left && block.left.type === "image-row") ||
                       (block.right && block.right.type === "image-row");
      var row = el("div", "cs-split" + (isGallery ? " cs-split--gallery" : ""));
      if (block.gap) row.style.setProperty("--cs-split-gap", block.gap);
      append(row, [renderBlock(block.left), renderBlock(block.right)]);
      return row;
    }
    if (block.type === "flow") return flowBlock(block);
    if (block.type === "image-row") {
      var imgRow = el("div", "cs-image-row");
      (block.images || []).forEach(function (img) { append(imgRow, imageBlock(img)); });
      return imgRow;
    }
    return textBlock(block);
  }

  function renderBlocks(blocks) {
    return (blocks || []).map(renderBlock);
  }

  /* Rendered as one <p> with a <br> between lines (matching the Figma
     source, which is one text layer with an embedded line break) so the
     two lines sit tight together instead of getting the header's full
     20px inter-child gap. Each line is an array of segments — a plain
     string, or { text, href } for an inline link. */
  function linksBlock(lines) {
    var p = el("p", "case-study__links");
    lines.forEach(function (line, i) {
      if (i > 0) append(p, el("br"));
      line.forEach(function (seg) {
        if (typeof seg === "string") append(p, document.createTextNode(seg));
        else append(p, anchor({ label: seg.text, href: seg.href }, "case-study__link"));
      });
    });
    return p;
  }

  /* ---- Page ----------------------------------------------------------- */
  function page(project) {
    var article = el("article", "section section--tall case-study");
    var cs = project.caseStudy || {};
    Object.keys(cs.theme || {}).forEach(function (name) {
      article.style.setProperty(name, cs.theme[name]);
    });

    var head = el("div", "case-study__header");
    append(head, [el("h1", null, project.title), el("p", null, project.summary)]);
    if (cs.links && cs.links.length) append(head, linksBlock(cs.links));
    if (cs.badges && cs.badges.length) {
      var badges = el("div", "cs-badges");
      cs.badges.forEach(function (label) { append(badges, el("span", "cs-badge", label)); });
      append(head, badges);
    }
    append(article, head);

    if (cs.hero) {
      var heroFrame = el("div", "cs-hero");
      append(heroFrame, media(cs.hero, null, true));
      append(article, heroFrame);
    }

    (cs.blocks || []).forEach(function (block) {
      var node = renderBlock(block);
      if (block.spaceBefore) node.style.marginTop = "calc(" + block.spaceBefore + " - var(--gap-xl))";
      append(article, node);
    });
    return article;
  }

  function notFound() {
    var article = el("article", "section section--tall case-study cs-notfound");
    var head = el("div", "case-study__header");
    append(head, [
      el("h1", null, "Case study not found"),
      el("p", null, "No project matches this address. Pick one from the work section.")
    ]);
    append(article, [head, UI.arrowLink("Back to all work", "index.html#work")]);
    return article;
  }

  /* ---- Mount ---------------------------------------------------------- */
  function init() {
    var project = findProject();

    UI.setMeta(
      project ? project.title + " — " + C.site.name : "Case study — " + C.site.name,
      project ? project.summary : C.site.description
    );

    document.body.insertBefore(UI.header(), document.body.firstChild);

    var app = document.getElementById("app");
    app.innerHTML = "";
    append(app, project ? page(project) : notFound());

    document.body.appendChild(UI.footer());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
