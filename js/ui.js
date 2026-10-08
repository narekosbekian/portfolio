/* ==========================================================================
   Shared rendering helpers: header, footer, buttons and the image-stub
   fallback. Loaded by both index.html and case-study.html.
   No dependencies, no build step.
   ========================================================================== */

window.UI = (function () {
  "use strict";

  var C = window.CONTENT;

  /* True on the case-study page, where in-page "#work" anchors have to hop
     back to the landing page first. */
  var hashBase = document.body.dataset.hashBase || "";

  /* ---- tiny DOM helper ------------------------------------------------ */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function append(parent, children) {
    (Array.isArray(children) ? children : [children]).forEach(function (child) {
      if (child) parent.appendChild(child);
    });
    return parent;
  }

  /* ---- images with a visible "file missing" fallback ------------------ */
  /* `eager` opts out of lazy-loading. Use it for above-the-fold images — the
     hero portrait and the case-study banner — since lazy-loading the largest
     visible image delays the largest contentful paint. Everything below the
     fold stays lazy. */
  function media(spec, modifier, eager) {
    if (!spec || !spec.image) return stub("No image set", "", modifier);

    var img = el("img");
    /* `loading` must be set before `src`, or the fetch may start regardless. */
    img.loading = eager ? "eager" : "lazy";
    img.decoding = "async";
    img.alt = spec.alt || "";
    img.addEventListener("error", function () {
      if (img.parentNode) img.parentNode.replaceChild(stub("Add image", spec.image, modifier), img);
    });
    img.src = spec.image;
    return img;
  }

  function stub(label, path, modifier) {
    var box = el("div", "img-stub" + (modifier ? " img-stub--" + modifier : ""));
    append(box, [el("span", "img-stub__label", label), path ? el("span", "img-stub__path", path) : null]);
    return box;
  }

  /* ---- links ---------------------------------------------------------- */
  function href(spec) {
    var url = spec.social && C.site[spec.social] ? C.site[spec.social] : spec.href;
    if (!url) return null;
    if (url.charAt(0) === "#") return hashBase + url;
    return url;
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  function anchor(spec, className) {
    var url = href(spec);
    var node = el(url ? "a" : "span", className, spec.label);
    if (url) {
      node.href = url;
      if (spec.download) node.setAttribute("download", "");
      if (isExternal(url) || spec.newTab) { node.target = "_blank"; node.rel = "noopener noreferrer"; }
    }
    if (spec.ariaLabel) node.setAttribute("aria-label", spec.ariaLabel);
    return node;
  }

  var BUTTON_STYLES = {
    cta: "btn btn--cta",
    secondary: "btn btn--secondary",
    dark: "btn btn--dark",
    ghost: "btn btn--ghost"
  };

  function button(spec) {
    return anchor(spec, BUTTON_STYLES[spec.style] || BUTTON_STYLES.ghost);
  }

  /* ---- the "Explore case study →" link -------------------------------- */
  function arrowLink(label, url) {
    var link = el("a", "link");
    link.href = url;
    append(link, el("span", null, label));
    var icon = el("img", "link__icon");
    icon.src = "assets/icons/arrow-right.svg";
    icon.alt = "";
    icon.setAttribute("aria-hidden", "true");
    append(link, icon);
    return link;
  }

  /* ---- header --------------------------------------------------------- */
  function header() {
    var head = el("header", "site-header");
    var inner = el("div", "site-header__inner");

    var brand = el("a", "wordmark", C.site.name);
    brand.href = hashBase || "index.html";

    var nav = el("nav", "site-nav");
    nav.setAttribute("aria-label", "Main");

    var links = el("div", "site-nav__links");
    links.id = "nav-links";
    C.nav.links.forEach(function (link) {
      append(links, anchor(link, "btn btn--ghost"));
    });
    var toggle = el("button", "nav-toggle");
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "nav-links");
    toggle.setAttribute("aria-label", "Toggle navigation");
    append(toggle, el("span", "nav-toggle__bar"));
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    append(nav, [links, toggle]);
    append(inner, [brand, nav]);
    append(head, inner);

    /* Solid background once the page scrolls past the hero top. */
    var onScroll = function () {
      head.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return head;
  }

  /* ---- footer --------------------------------------------------------- */
  function footer() {
    var foot = el("footer", "site-footer");
    var inner = el("div", "site-footer__inner");

    var top = el("div", "footer-top");

    var brand = el("div", "footer-brand");
    var logoGroup = el("div", "footer-brand__logo");
    var mark = el("img");
    mark.src = C.footer.mark.image;
    mark.alt = C.footer.mark.alt || "";
    if (!C.footer.mark.alt) mark.setAttribute("aria-hidden", "true");
    append(logoGroup, [mark, el("span", "wordmark", C.site.name)]);
    append(brand, [logoGroup, el("p", null, C.footer.blurb)]);

    var linksSide = el("div", "footer-links");
    C.footer.columns.forEach(function (column) {
      var col = el("div", "footer-links__col");
      append(col, el("h3", null, column.heading));
      column.items.forEach(function (item) {
        append(col, anchor(item, null));
      });
      append(linksSide, col);
    });

    append(top, [brand, linksSide]);
    append(inner, [top, el("div", "footer-bottom", C.site.copyright)]);
    append(foot, inner);
    return foot;
  }

  /* ---- document head -------------------------------------------------- */
  function setMeta(title, description) {
    document.title = title;
    var tag = document.querySelector('meta[name="description"]');
    if (tag && description) tag.setAttribute("content", description);
  }

  return {
    el: el,
    append: append,
    media: media,
    anchor: anchor,
    button: button,
    arrowLink: arrowLink,
    href: href,
    header: header,
    footer: footer,
    setMeta: setMeta,
    hashBase: hashBase
  };
})();
