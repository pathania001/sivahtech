const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const backToTop = document.querySelector(".back-to-top");
const revealItems = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setHeaderState = () => {
  const scrolled = window.scrollY > 20;
  header?.classList.toggle("is-stuck", scrolled);
  backToTop?.classList.toggle("is-visible", window.scrollY > 540);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navPanel?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

navPanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navPanel.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -40px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const scrollProjects = (grid, direction) => {
  if (!grid) return;
  const card = grid.querySelector(".project-card");
  const amount = card ? card.getBoundingClientRect().width + 18 : 260;
  grid.scrollBy({ left: amount * direction, behavior: "smooth" });
};

document.querySelectorAll("[data-slider]").forEach((slider) => {
  const grid = slider.querySelector("[data-project-grid], [data-scroll-grid]");
  slider.querySelector(".slider-prev")?.addEventListener("click", () => scrollProjects(grid, -1));
  slider.querySelector(".slider-next")?.addEventListener("click", () => scrollProjects(grid, 1));
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".newsletter, .contact-form, .quick-inquiry-form").forEach((form) =>
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.currentTarget.querySelectorAll("input, textarea").forEach((field) => {
      field.value = "";
    });
  })
);

document.querySelectorAll(".hero-visual, .page-visual-card, .market-map, .seo-growth-card").forEach((element) => {
  if (prefersReducedMotion) return;
  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
    element.style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
    element.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    element.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
  });

  element.addEventListener("pointerleave", () => {
    element.style.removeProperty("--tilt-x");
    element.style.removeProperty("--tilt-y");
    element.style.removeProperty("--glow-x");
    element.style.removeProperty("--glow-y");
  });
});

document.querySelectorAll(".feature-card, .premium-card, .project-card, .industry-card, .experience-step").forEach((card) => {
  if (prefersReducedMotion) return;
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--spotlight-x", `${(x * 100).toFixed(1)}%`);
    card.style.setProperty("--spotlight-y", `${(y * 100).toFixed(1)}%`);
    card.style.setProperty("--card-tilt-x", `${((0.5 - y) * 3).toFixed(2)}deg`);
    card.style.setProperty("--card-tilt-y", `${((x - 0.5) * 3).toFixed(2)}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--spotlight-x");
    card.style.removeProperty("--spotlight-y");
    card.style.removeProperty("--card-tilt-x");
    card.style.removeProperty("--card-tilt-y");
  });
});

document.querySelectorAll(".hero").forEach((hero) => {
  if (prefersReducedMotion) return;
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty("--hero-glow-x", `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
    hero.style.setProperty("--hero-glow-y", `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
  });
});
