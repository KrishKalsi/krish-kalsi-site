// Decides, before the body is parsed, whether the loading screen plays
// (Loader.jsx, CLAUDE.md → Character A). Inlined in <head>, so:
// - first load of a session: html[data-loader="on"] shows the overlay (it is
//   in the initial HTML but hidden by default) and locks scroll — the page
//   never paints without it;
// - session flag already set, reduced motion, or no sessionStorage: nothing
//   is set, so the overlay never paints, not even for a frame.
// The timeline clock starts here rather than at hydration, and skips (any
// click, key, wheel or touch) are recorded from here too, so the loader
// never waits on React. If React never takes over, a timeout releases the
// page anyway.
function loader() {
  var html = document.documentElement;
  var KEY = "kk-loader";
  try {
    if (sessionStorage.getItem(KEY)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem(KEY, "1");
  } catch (e) {
    return;
  }

  var events = ["pointerdown", "keydown", "wheel", "touchstart"];
  var state = {
    start: performance.now(),
    skip: null,
    end: function () {
      html.setAttribute("data-loader", "done");
      events.forEach(function (type) {
        removeEventListener(type, skip, true);
      });
    },
  };
  function skip() {
    if (state.skip === null) state.skip = performance.now();
  }
  events.forEach(function (type) {
    addEventListener(type, skip, { capture: true, passive: true });
  });
  window.__kkLoader = state;
  html.setAttribute("data-loader", "on");

  setTimeout(function () {
    if (html.getAttribute("data-loader") === "on") state.end();
  }, 6000);
}

export const loaderScript = `(${loader.toString()})()`;
