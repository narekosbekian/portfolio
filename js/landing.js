/* ==========================================================================
   Landing page renderer — Figma node 99:1770
   Builds every section from window.CONTENT and mounts it into <main id="app">.
   ========================================================================== */

(function () {
  "use strict";

  /* A reload should always land back on the hero, not wherever the user had
     scrolled to — browsers restore prior scroll position on reload by
     default (history.scrollRestoration = "auto"), which would otherwise
     fight the splash animation revealing a mid-page section. Case-study
     pages don't load this script, so they keep the browser's default
     restore-on-reload behaviour. */
  if (window.history && "scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  var C = window.CONTENT;
  var el = UI.el, append = UI.append, media = UI.media, button = UI.button;

  /* Set by hero() once the hero-highlight-word handwriting SVG is ready to
     play; called by hideSplash() at the moment the page is revealed, so the
     pen starts writing right as the hero fades in rather than mid-splash. */
  var startHeroHandwriting = null;

  /* ---- Hero title handwriting -------------------------------------------
     the hero's highlighted word draws itself in stroke by stroke, then fills solid.
     Ported (no framework) from a React/opentype.js reference the site owner
     supplied. opentype.js is loaded from a CDN on first use — it's only
     needed for this one decorative word, so it stays off the critical path
     — and turns a real TTF's glyphs into SVG path data, which is the only
     way to get an actual stroke to animate (a web font itself is filled
     shapes with no outline). Degrades to the plain text already sitting in
     the <em> if the library or font fails to load: nothing is removed until
     the SVG is actually ready to replace it. */
  var HANDWRITING_FONT_URL = "assets/fonts/Inter-SemiBold.ttf";
  var OPENTYPE_CDN = "https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js";
  var SVG_NS = "http://www.w3.org/2000/svg";
  var HW_EM = 100; // arbitrary; the viewBox normalises whatever we pick

  var opentypeLibPromise = null;
  function loadOpentype() {
    if (!opentypeLibPromise) {
      opentypeLibPromise = new Promise(function (resolve, reject) {
        if (window.opentype) { resolve(window.opentype); return; }
        var script = document.createElement("script");
        script.src = OPENTYPE_CDN;
        script.async = true;
        script.onload = function () {
          if (window.opentype) resolve(window.opentype);
          else reject(new Error("opentype.js loaded but exposed nothing"));
        };
        script.onerror = function () { reject(new Error("opentype.js failed to load")); };
        document.head.appendChild(script);
      });
    }
    return opentypeLibPromise;
  }

  var handwritingFontPromise = null;
  function loadHandwritingFont() {
    if (!handwritingFontPromise) {
      handwritingFontPromise = Promise.all([
        loadOpentype(),
        fetch(HANDWRITING_FONT_URL).then(function (res) {
          if (!res.ok) throw new Error("Font request failed: " + res.status);
          return res.arrayBuffer();
        })
      ]).then(function (results) { return results[0].parse(results[1]); });
    }
    return handwritingFontPromise;
  }

  /* Builds the pen-stroke SVG for `text` inside `em` and returns a `start()`
     function that plays the draw-in the first time it's called. `em` is
     left untouched (still plain text) unless/until the SVG is fully built. */
  function enhanceHandwriting(em, text) {
    var startRequested = false;

    var svgReady = loadHandwritingFont().then(function (font) {
      var path = font.getPath(text, 0, HW_EM, HW_EM);
      var box = path.getBoundingBox();
      var pad = HW_EM * 0.12; // room for the stroke and any descenders
      var full = path.toPathData(2);
      var contours = full.split(/(?=M)/).filter(function (d) { return d.trim().length > 1; });
      var x = box.x1 - pad, y = box.y1 - pad;
      var w = (box.x2 - box.x1) + pad * 2, h = (box.y2 - box.y1) + pad * 2;
      var count = Math.max(1, contours.length);
      var delay = 0.05;
      /* Pen pace for roughly the first second, then a slower pace for the
         rest of the word — a flat linear pace across the whole thing rushed
         through the tail end instead of reading as a deliberate hand. */
      var fastSpacing = 0.0625;
      var slowSpacing = fastSpacing * 2;
      var splitIndex = Math.min(count, Math.round(1 / fastSpacing));
      function contourStart(i) {
        return i < splitIndex
          ? delay + i * fastSpacing
          : delay + splitIndex * fastSpacing + (i - splitIndex) * slowSpacing;
      }
      function contourEach(i) {
        return (i < splitIndex ? fastSpacing : slowSpacing) * 2.4;
      }

      var svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("viewBox", x + " " + y + " " + w + " " + h);
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", text);
      svg.setAttribute("class", "hw");
      /* Sized in real em units — HW_EM path units are exactly 1em — so the
         letters match the surrounding headline's font size exactly, instead of
         the whole padded bounding box being squeezed into 1em (which shrank
         them). The baseline sits at y = HW_EM in path space, so the SVG hangs
         below the text baseline by whatever its bottom edge is past that. The
         padding is given back as negative margin (which also shifts the box
         down by that much, so vertical-align adds it back) so it doesn't grow
         the line. */
      var padEm = pad / HW_EM;
      svg.style.width = (w / HW_EM).toFixed(4) + "em";
      svg.style.height = (h / HW_EM).toFixed(4) + "em";
      svg.style.verticalAlign = (padEm - (y + h - HW_EM) / HW_EM).toFixed(4) + "em";
      svg.style.marginBlock = (-padEm).toFixed(4) + "em";

      var fillPath = document.createElementNS(SVG_NS, "path");
      fillPath.setAttribute("d", full);
      fillPath.setAttribute("class", "hw__fill");
      var lastStart = contourStart(count - 1), lastEach = contourEach(count - 1);
      fillPath.style.setProperty("--start", (lastStart + lastEach * 0.55).toFixed(3) + "s");
      svg.appendChild(fillPath);

      contours.forEach(function (d, i) {
        var p = document.createElementNS(SVG_NS, "path");
        p.setAttribute("d", d);
        p.setAttribute("class", "hw__stroke");
        /* Contours overlap slightly so the stroke reads as one continuous
           pen movement rather than letters switching on in turn. */
        p.style.setProperty("--dur", contourEach(i).toFixed(3) + "s");
        p.style.setProperty("--start", contourStart(i).toFixed(3) + "s");
        svg.appendChild(p);
        /* getTotalLength() needs the path laid out in the document first —
           `svg` is appended to `em` synchronously right after this loop, so
           by the next frame it's there to measure. */
        requestAnimationFrame(function () { p.style.setProperty("--len", p.getTotalLength()); });
      });

      em.textContent = "";
      em.appendChild(svg);
      return svg;
    }).catch(function () { return null; });

    return function start() {
      if (startRequested) return;
      startRequested = true;
      svgReady.then(function (svg) {
        if (!svg) return; // font/library never loaded — plain text stayed put
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { svg.classList.add("is-drawn"); });
        });
      });
    };
  }

  /* ---- Hero ----------------------------------------------------------- */
  function hero() {
    var section = el("section", "hero");
    section.id = "top";

    var blob = el("div", "hero__blob");
    var blobImg = el("img");
    blobImg.src = "assets/brand/hero-blob.svg";
    blobImg.alt = "";
    blobImg.setAttribute("aria-hidden", "true");
    append(blob, blobImg);

    var inner = el("div", "hero__inner");

    var portrait = el("div", "hero__portrait");
    append(portrait, media(C.hero.portrait, null, true));

    var copy = el("div", "hero__copy");
    var title = el("h1", "hero__title");
    var highlight = el("em", null, C.hero.titleHighlight);
    append(title, [document.createTextNode(C.hero.titleLead), highlight, document.createTextNode(C.hero.titleTrail || "")]);
    startHeroHandwriting = enhanceHandwriting(highlight, C.hero.titleHighlight);

    var body = el("div", "hero__body");
    C.hero.body.forEach(function (line) { append(body, el("p", null, line)); });

    var actions = el("div", "hero__actions");
    C.hero.actions.forEach(function (action) { append(actions, button(action)); });

    append(copy, [title, body, actions]);
    append(inner, [portrait, copy]);

    /* Decorative liquid-glass cursor + "nare" tag over the portrait.
       Two backdrop-blur "glass" layers (matching the source SVG's exact
       arrow path and tag rect) sit behind the flat asset, so the portrait
       genuinely blurs/refracts through them — a flat <img> alone can't do
       that. Appended last so the whole group paints above the
       blob/portrait/copy. */
    var cursor = el("div", "hero__cursor");
    var arrowGlass = el("div", "hero__cursor__glass hero__cursor__glass--arrow");
    var tagGlass = el("div", "hero__cursor__glass hero__cursor__glass--tag");
    var cursorImg = el("img");
    /* Cache-busted: the file has no build step and no strong cache headers
       from the dev server, so a plain reload can otherwise keep serving a
       stale copy after this asset is edited. Bump the query when it changes
       again. */
    cursorImg.src = "assets/Cursor.svg?v=2";
    cursorImg.alt = "";
    cursorImg.setAttribute("aria-hidden", "true");
    /* Click pulse at the arrow's tip — see the "hero-cursor-tour"/
       "hero-cursor-click" keyframes in styles.css for the actual 3-stop
       tour + click choreography; this element just rides along since it's
       nested inside the group that moves. */
    var cursorClick = el("span", "hero__cursor__click");
    append(cursor, [arrowGlass, tagGlass, cursorImg, cursorClick]);

    /* Click the portrait (or the cursor decoration itself) to play the tour
       once. Ignored while already mid-tour; .is-touring is removed again on
       animationend so it's ready to replay on the next click. */
    function playCursorTour() {
      cursor.classList.add("is-touring");
    }
    cursor.addEventListener("animationend", function (event) {
      if (event.animationName === "hero-cursor-tour") cursor.classList.remove("is-touring");
    });
    portrait.addEventListener("click", playCursorTour);
    cursor.addEventListener("click", playCursorTour);

    /* Everything but the cursor stays clipped to the hero's box — the
       cursor is appended straight to `section`, outside that wrapper, so
       its click-tour can swing below the hero's edge without being cut. */
    var clip = el("div", "hero__clip");
    append(clip, [blob, inner]);

    append(section, [clip, cursor]);
    return section;
  }

  /* ---- Highlights ----------------------------------------------------- */
  function highlights() {
    var section = el("section", "section highlights");
    C.highlights.forEach(function (item) {
      var block = el("div", "highlight");
      var text = el("div", "highlight__text");
      append(text, [el("h3", null, item.title), el("p", null, item.body)]);
      append(block, text);
      append(section, block);
    });
    return section;
  }

  /* ---- Work ----------------------------------------------------------- */
  function work() {
    var section = el("section", "section work");
    section.id = "work";

    var head = el("div", "section-header");
    append(head, el("h2", null, C.work.title));
    if (C.work.subtitle) append(head, el("p", null, C.work.subtitle));

    var grid = el("div", "work-grid");
    C.work.projects.forEach(function (project) {
      if (project.hidden) return;
      var url = "case-study.html?id=" + encodeURIComponent(project.slug);

      var card = el("article", "work-card");

      var mediaBox = el("a", "work-card__media");
      mediaBox.href = url;
      mediaBox.setAttribute("tabindex", "-1");
      mediaBox.setAttribute("aria-hidden", "true");
      /* A cover can opt into a solid background instead of cropping to fill
         — for a UI-mockup cover with transparent margins rather than a
         bleed photo. */
      if (project.cover && project.cover.bg) {
        mediaBox.classList.add("work-card__media--framed");
        mediaBox.style.setProperty("--cover-bg", project.cover.bg);
      }
      if (project.cover && project.cover.fit) mediaBox.classList.add("work-card__media--fit-" + project.cover.fit);
      if (project.cover && project.cover.shiftX) mediaBox.style.setProperty("--cover-x", project.cover.shiftX);
      if (project.cover && project.cover.scale) mediaBox.style.setProperty("--cover-scale", project.cover.scale);
      append(mediaBox, media(project.cover));
      if (project.tag) append(mediaBox, el("span", "tag", project.tag));

      var meta = el("div", "work-card__meta");
      var heading = el("h3");
      var headingLink = el("a", null, project.title);
      headingLink.href = url;
      append(heading, headingLink);
      /* Visible label stays short; the accessible name names the project. */
      var exploreLink = UI.arrowLink(C.work.linkLabel, url);
      exploreLink.setAttribute("aria-label", C.work.linkLabel + ": " + project.title);

      /* The same pill tags as on the case-study page, in that case study's own
         accent colours, between the summary and the "Explore" link. */
      var tags = null;
      if (project.tags && project.tags.length) {
        tags = el("div", "cs-badges");
        var theme = (project.caseStudy && project.caseStudy.theme) || {};
        ["--cs-accent", "--cs-accent-soft"].forEach(function (name) {
          if (theme[name]) tags.style.setProperty(name, theme[name]);
        });
        project.tags.forEach(function (label) { append(tags, el("span", "cs-badge", label)); });
      }
      append(meta, [heading, el("p", null, project.summary), tags, exploreLink]);

      append(card, [mediaBox, meta]);
      append(grid, card);
    });

    append(section, [head, grid]);
    return section;
  }

  /* ---- About ---------------------------------------------------------- */
  function about() {
    var section = el("section", "section about");
    section.id = "about";

    var text = el("div", "about__text");
    append(text, el("h2", null, C.about.title));
    C.about.body.forEach(function (para) { append(text, el("p", null, para)); });

    /* A slow vertical marquee of 6 photos, each 180x180. The list is
       doubled — [1,2,3,4,5,6,1,2,3,4,5,6] — and the track animates exactly
       one set's height, so the loop point is invisible. Decorative: hidden
       from assistive tech (the photos carry no information of their own). */
    var gallery = el("div", "about__gallery");
    gallery.setAttribute("aria-hidden", "true");
    var track = el("div", "about__gallery-track");
    C.about.images.concat(C.about.images).forEach(function (img) {
      var item = el("div", "about__gallery-item");
      append(item, media(img, "sm"));
      append(track, item);
    });
    append(gallery, track);

    append(section, [text, gallery]);
    return section;
  }

  /* ---- Testimonials --------------------------------------------------- */
  /* No cards/carousel: one testimonial's quote + role is shown at a time,
     centred, and swapped (with a brief fade/blur) when a different avatar
     is picked in the switcher below it. */
  function testimonials() {
    var data = C.testimonials;
    var items = data.items;
    var section = el("section", "section testimonials");
    section.id = "testimonials";

    var head = el("div", "section-header");
    append(head, el("h2", null, data.title));

    var activeIndex = Math.min(Math.max(data.startIndex || 0, 0), items.length - 1);

    var display = el("div", "t-display");
    var quote = el("blockquote", "t-display__quote", items[activeIndex].quote);
    var role = el("p", "t-display__role", items[activeIndex].role);
    append(display, [quote, role]);

    /* Avatar "pill" switcher — each button shows just the avatar until it's
       active or hovered, at which point it expands to reveal the name. */
    var switcher = el("div", "t-switcher");
    var picks = [];
    items.forEach(function (item, i) {
      var pick = el("button", "t-switcher__item");
      pick.type = "button";
      pick.setAttribute("aria-label", "Show testimonial from " + item.name);
      append(pick, media(item.avatar, "sm", true));
      append(pick, el("span", "t-switcher__name", item.name));
      pick.addEventListener("click", function () { select(i); });
      picks.push(pick);
      append(switcher, pick);
    });

    function syncActive() {
      picks.forEach(function (pick, i) {
        if (i === activeIndex) pick.setAttribute("aria-current", "true");
        else pick.removeAttribute("aria-current");
      });
    }
    syncActive();

    var animating = false;
    function select(index) {
      if (index === activeIndex || animating) return;
      animating = true;
      display.classList.add("is-animating");
      setTimeout(function () {
        activeIndex = index;
        quote.textContent = items[index].quote;
        role.textContent = items[index].role;
        syncActive();
        display.classList.remove("is-animating");
        setTimeout(function () { animating = false; }, 400);
      }, 200);
    }

    var body = el("div", "testimonials__body");
    append(body, [display, switcher]);

    /* Every testimonial gets the height of the tallest, so the switcher below
       doesn't jump (and the fade reads as a swap) when a shorter one is
       picked. Measured with an off-screen copy at the live width, and redone
       on resize since the wrapping — and so the tallest — changes with it. */
    function equalizeHeights() {
      display.style.minHeight = "";
      var probe = display.cloneNode(true);
      probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;width:" +
        display.getBoundingClientRect().width + "px";
      probe.setAttribute("aria-hidden", "true");
      body.appendChild(probe);
      var probeQuote = probe.querySelector(".t-display__quote");
      var tallest = 0;
      items.forEach(function (item) {
        probeQuote.textContent = item.quote;
        tallest = Math.max(tallest, probe.getBoundingClientRect().height);
      });
      body.removeChild(probe);
      display.style.minHeight = tallest + "px";
    }
    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(equalizeHeights, 150);
    });
    ((document.fonts && document.fonts.ready) || Promise.resolve()).then(function () {
      requestAnimationFrame(equalizeHeights);
    });
    append(section, [head, body]);
    return section;
  }

  /* ---- Connect -------------------------------------------------------- */
  function connect() {
    var section = el("section", "connect");
    section.id = "connect";

    var bg = el("div", "connect__bg");

    var copy = el("div", "connect__copy");
    append(copy, [el("h2", null, C.connect.title), el("p", null, C.connect.subtitle)]);

    var actions = el("div", "connect__actions");
    C.connect.actions.forEach(function (action) { append(actions, button(action)); });

    append(section, [bg, copy, actions]);
    return section;
  }

  /* ---- Back to top ----------------------------------------------------
     A floating circular link back to the hero (id="top"). Hidden until the
     visitor scrolls down to the Work section, then stays visible for the
     rest of the page (including the footer). */
  function backToTop() {
    var link = el("a", "back-to-top");
    link.href = "#top";
    link.setAttribute("aria-label", "Back to top");
    /* A bare chevron, no shaft — as minimal as an "up" glyph gets. Inline
       (not an exported asset) so its color can follow `color:
       var(--c-brand-800)` on the button itself. */
    link.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M6 15l6-6 6 6"/></svg>';

    var workEl = document.getElementById("work");
    var onScroll = function () {
      if (!workEl) return;
      var workTop = workEl.getBoundingClientRect().top + window.scrollY;
      link.classList.toggle("is-visible", window.scrollY >= workTop);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return link;
  }

  /* ---- Splash --------------------------------------------------------- */
  /* The overlay itself is static markup in index.html (so it paints before
     this script runs): "Nare Kosbekian" shows first, then swaps in place to
     "Product Designer" (slide + fade), then the whole overlay fades out and
     is dropped from the DOM once transitionend fires — never left sitting
     over the page (e.g. reduced-motion, which collapses the transition to
     ~0, still fires transitionend so this doesn't get stuck). */
  function hideSplash() {
    var splash = document.getElementById("splash");
    if (!splash) return;
    var name = splash.querySelector(".splash__name");

    var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();

    fontsReady.then(function () {
      /* Let "Nare Kosbekian" register, then swap to "Product Designer". */
      setTimeout(function () {
        if (name) name.classList.add("is-swapped");
      }, 1100);

      /* Hold the swapped name for a beat, then fade the whole splash out —
         and start the hero's highlighted-word pen-writing at the same
         moment, so it plays as the page arrives instead of mid-splash. */
      setTimeout(function () {
        document.body.classList.remove("is-loading");
        splash.classList.add("is-hidden");
        splash.addEventListener("transitionend", function done(event) {
          if (event.target !== splash) return;
          splash.removeEventListener("transitionend", done);
          splash.remove();
        });
        if (startHeroHandwriting) startHeroHandwriting();
      }, 2500);
    });
  }

  /* ---- Mount ---------------------------------------------------------- */
  function init() {
    UI.setMeta(C.site.title, C.site.description);

    document.body.insertBefore(UI.header(), document.body.firstChild);

    var app = document.getElementById("app");
    app.innerHTML = "";
    append(app, [hero(), highlights(), work(), about(), testimonials(), connect()]);

    document.body.appendChild(UI.footer());
    document.body.appendChild(backToTop());

    hideSplash();
    centerSectionLinks();
  }

  /* Links to these sections land with the whole section centred below the
     fixed header (so e.g. the "Featured Case Studies" title is visible) — a
     plain anchor would put the section's top edge under the header. A section
     taller than the window falls back to sitting just under the header. */
  var CENTERED_SECTIONS = ["work", "about"];

  function centerSectionLinks() {
    function scrollToSection(id, behavior) {
      var section = document.getElementById(id);
      if (!section) return;
      var header = document.querySelector(".site-header");
      var headerH = header ? header.offsetHeight : 0;
      var free = window.innerHeight - headerH;
      var rect = section.getBoundingClientRect();
      var offset = rect.height < free ? (free - rect.height) / 2 : 0;
      window.scrollTo({ top: window.scrollY + rect.top - headerH - offset, behavior: behavior });
    }

    /* The header name is a link to index.html, which on this page would
       reload it and replay the splash — just glide back to the hero. */
    document.addEventListener("click", function (event) {
      var brand = event.target.closest && event.target.closest(".site-header .wordmark");
      if (!brand) return;
      event.preventDefault();
      if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.addEventListener("click", function (event) {
      var link = event.target.closest && event.target.closest("a[href^='#']");
      if (!link) return;
      var id = link.getAttribute("href").slice(1);
      if (CENTERED_SECTIONS.indexOf(id) === -1) return;
      event.preventDefault();
      scrollToSection(id, "smooth");
    });

    var hash = window.location.hash.slice(1);
    if (CENTERED_SECTIONS.indexOf(hash) !== -1) scrollToSection(hash, "auto");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
