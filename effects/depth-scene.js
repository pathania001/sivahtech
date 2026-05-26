export function initDepthScene() {
  const scene = document.querySelector("[data-depth-scene]");
  if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layers = [...scene.querySelectorAll("[data-depth]")];
  let frame = 0;

  const update = (event) => {
    if (window.innerWidth < 900) return;
    cancelAnimationFrame(frame);

    frame = requestAnimationFrame(() => {
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      layers.forEach((layer) => {
        const depth = Number.parseFloat(layer.dataset.depth || "0");
        layer.style.setProperty("--depth-x", `${x * depth * 120}px`);
        layer.style.setProperty("--depth-y", `${y * depth * 90}px`);
      });
    });
  };

  const reset = () => {
    layers.forEach((layer) => {
      layer.style.removeProperty("--depth-x");
      layer.style.removeProperty("--depth-y");
    });
  };

  layers.forEach((layer) => {
    layer.style.translate = "var(--depth-x, 0) var(--depth-y, 0)";
    layer.style.transition = "translate 420ms cubic-bezier(0.16, 1, 0.3, 1)";
  });

  scene.addEventListener("pointermove", update, { passive: true });
  scene.addEventListener("pointerleave", reset);
}
