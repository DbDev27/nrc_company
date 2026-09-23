// The footer markup is fetched by include.js, so initialize after includesLoaded.
document.addEventListener("includesLoaded", () => {
  const scene = document.querySelector(".js-footer-scene");
  if (!scene) return;

  const sticky = scene.querySelector(".footer-scene__sticky");
  const cta = scene.querySelector(".footer-cta");
  const panel = scene.querySelector(".js-footer-panel");
  const pageTop = scene.querySelector(".footer-panel__page-top");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  pageTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? "auto" : "smooth",
    });
  });

  if (!sticky || !cta || !panel || reducedMotion.matches) return;

  let frame = null;

  const clamp = (value) => Math.max(0, Math.min(1, value));
  const smoothStep = (value) => value * value * (3 - 2 * value);

  function update() {
    frame = null;

    const travel = Math.max(1, scene.offsetHeight - sticky.offsetHeight);
    const progress = clamp(-scene.getBoundingClientRect().top / travel);

    // First 38%: lift the CTA to reveal the map.
    const ctaProgress = smoothStep(clamp(progress / 0.38));
    const ctaY = -(sticky.offsetHeight + 12) * ctaProgress;
    cta.style.setProperty("--footer-cta-y", `${ctaY}px`);

    // 38% to 65%: keep the map in view.
    // Last 35%: raise the footer panel over the map.
    const panelProgress = smoothStep(clamp((progress - 0.65) / 0.35));
    const panelY = (panel.offsetHeight + 12) * (1 - panelProgress);
    panel.style.setProperty("--footer-panel-y", `${panelY}px`);
  }

  function requestUpdate() {
    if (frame !== null) return;
    frame = window.requestAnimationFrame(update);
  }

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("load", requestUpdate, { once: true });
});
