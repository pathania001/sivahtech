import { initNavigation } from "../components/navigation.js";
import { initCarousel } from "../components/carousel.js";
import { initNewsletter } from "../components/newsletter.js";
import { initRevealEffects } from "../effects/reveal.js";
import { initDepthScene } from "../effects/depth-scene.js";

const boot = () => {
  initNavigation();
  initRevealEffects();
  initDepthScene();
  initCarousel();
  initNewsletter();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
