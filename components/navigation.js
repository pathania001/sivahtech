export function initNavigation() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  const sections = [...document.querySelectorAll("[data-section][id]")];
  const links = nav ? [...nav.querySelectorAll("a[href^='#']")] : [];

  if (!header) return;

  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });

  if (toggle && nav) {
    const closeMenu = () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      document.body.classList.toggle("menu-open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    links.forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  if (sections.length && links.length && "IntersectionObserver" in window) {
    const byId = new Map(links.map((link) => [link.hash.slice(1), link]));

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!active) return;

        links.forEach((link) => link.removeAttribute("aria-current"));
        byId.get(active.target.id)?.setAttribute("aria-current", "page");
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.08, 0.18, 0.34, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
  }
}
