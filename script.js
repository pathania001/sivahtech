const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const backToTop = document.querySelector(".back-to-top");
const revealItems = document.querySelectorAll(".reveal");

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
