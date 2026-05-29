"use client";

import { useEffect } from "react";

export function SiteInteractions() {
  useEffect(() => {
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

    const navClick = () => {
      const isOpen = navToggle?.getAttribute("aria-expanded") === "true";
      navToggle?.setAttribute("aria-expanded", String(!isOpen));
      navPanel?.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("nav-open", !isOpen);
    };
    navToggle?.addEventListener("click", navClick);

    const closeMenu = () => {
      navToggle?.setAttribute("aria-expanded", "false");
      navPanel?.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    };
    navPanel?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

    let revealObserver: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -40px" }
      );
    }
    revealItems.forEach((item) => (revealObserver ? revealObserver.observe(item) : item.classList.add("is-visible")));

    const scrollProjects = (grid: Element | null, direction: number) => {
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

    document.querySelectorAll("form.newsletter, form.contact-form, form.quick-inquiry-form").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formElement = event.currentTarget as HTMLFormElement;
        const formData = new FormData(formElement);
        const payload = {
          name: String(formData.get("name") || formData.get("quick-name") || "Website visitor"),
          email: String(formData.get("email") || formData.get("quick-email") || ""),
          phone: String(formData.get("phone") || ""),
          service: String(formData.get("service") || "Website enquiry"),
          message: String(formData.get("message") || "Quick consultation request"),
          sourcePage: window.location.pathname
        };
        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          formElement.querySelectorAll("input, textarea").forEach((field) => {
            (field as HTMLInputElement | HTMLTextAreaElement).value = "";
          });
        } catch {
          // Keep forms non-blocking; failed submissions can be retried by the user.
        }
      });
    });

    if (!prefersReducedMotion) {
      document.querySelectorAll(".hero-visual, .page-visual-card, .market-map, .seo-growth-card").forEach((element) => {
        element.addEventListener("pointermove", (event) => {
          const pointer = event as PointerEvent;
          const rect = element.getBoundingClientRect();
          const x = (pointer.clientX - rect.left) / rect.width - 0.5;
          const y = (pointer.clientY - rect.top) / rect.height - 0.5;
          (element as HTMLElement).style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
          (element as HTMLElement).style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
          (element as HTMLElement).style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
          (element as HTMLElement).style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
        });
        element.addEventListener("pointerleave", () => {
          ["--tilt-x", "--tilt-y", "--glow-x", "--glow-y"].forEach((key) => (element as HTMLElement).style.removeProperty(key));
        });
      });

      document.querySelectorAll(".feature-card, .premium-card, .project-card, .industry-card, .experience-step").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
          const pointer = event as PointerEvent;
          const rect = card.getBoundingClientRect();
          const x = (pointer.clientX - rect.left) / rect.width;
          const y = (pointer.clientY - rect.top) / rect.height;
          (card as HTMLElement).style.setProperty("--spotlight-x", `${(x * 100).toFixed(1)}%`);
          (card as HTMLElement).style.setProperty("--spotlight-y", `${(y * 100).toFixed(1)}%`);
          (card as HTMLElement).style.setProperty("--card-tilt-x", `${((0.5 - y) * 3).toFixed(2)}deg`);
          (card as HTMLElement).style.setProperty("--card-tilt-y", `${((x - 0.5) * 3).toFixed(2)}deg`);
        });
        card.addEventListener("pointerleave", () => {
          ["--spotlight-x", "--spotlight-y", "--card-tilt-x", "--card-tilt-y"].forEach((key) => (card as HTMLElement).style.removeProperty(key));
        });
      });

      document.querySelectorAll(".hero").forEach((hero) => {
        hero.addEventListener("pointermove", (event) => {
          const pointer = event as PointerEvent;
          const rect = hero.getBoundingClientRect();
          (hero as HTMLElement).style.setProperty("--hero-glow-x", `${(((pointer.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
          (hero as HTMLElement).style.setProperty("--hero-glow-y", `${(((pointer.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
        });
      });
    }

    return () => {
      window.removeEventListener("scroll", setHeaderState);
      navToggle?.removeEventListener("click", navClick);
      revealObserver?.disconnect();
    };
  }, []);

  return null;
}
