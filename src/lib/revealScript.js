// Once-on-scroll reveals for panels (fade + 12px rise, 400ms) and panel titles
// (slide up from behind a mask, 500ms). Inlined in <head> so it runs before
// the body is parsed: elements are observed as the parser inserts them, so
// above-the-fold content shows on first paint instead of waiting for React to
// hydrate. Elements added later (client-side navigation) are picked up by the
// MutationObserver.
//
// Whatever is already on screen while the page is loading appears at once
// (data-revealed="instant"); only content scrolled to afterwards animates
// (data-revealed="fade"). Fading the first screen in would hold back Largest
// Contentful Paint by the length of the fade.
//
// The hiding and the animation live in globals.css behind html[data-reveal-ready]
// and prefers-reduced-motion: no-preference, so without JS, without
// IntersectionObserver, or under reduced motion, everything is simply visible.
// The script only ever adds data-revealed, an attribute React never renders,
// so hydration is unaffected.
function reveal() {
  if (!("IntersectionObserver" in window)) return;
  var html = document.documentElement;
  html.setAttribute("data-reveal-ready", "");
  var loading = true;
  addEventListener("load", function () {
    loading = false;
  });

  function observer(options) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute("data-revealed", loading ? "instant" : "fade");
        io.unobserve(entry.target);
      });
    }, options);
    return io;
  }

  // Panels can be taller than the viewport, so trigger on any overlap with the
  // lower edge pulled in, rather than on a fraction of the panel.
  var panels = observer({ rootMargin: "0px 0px -10% 0px" });
  var titles = observer({ threshold: 0.5 });

  var queued = false;
  function scan() {
    queued = false;
    var els = document.querySelectorAll("[data-reveal]:not([data-revealed])");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      (el.getAttribute("data-reveal") === "title" ? titles : panels).observe(el);
    }
  }
  new MutationObserver(function () {
    if (!queued) {
      queued = true;
      requestAnimationFrame(scan);
    }
  }).observe(html, { childList: true, subtree: true });
}

export const revealScript = `(${reveal.toString()})()`;
