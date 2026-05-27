const arrowIcon =
  '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10.8 4.9 15.9 10l-5.1 5.1-1.2-1.2 3-3H4V9.1h8.6l-3-3 1.2-1.2Z" /></svg>';

const logoMarkup = `
  <span class="brand-mark" aria-hidden="true">
    <svg viewBox="0 0 42 42" role="img">
      <defs>
        <linearGradient id="sharedLogoGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#e9f7ff" />
          <stop offset="1" stop-color="#8bdcff" />
        </linearGradient>
      </defs>
      <circle cx="21" cy="21" r="20" fill="url(#sharedLogoGradient)" />
      <path d="M23.2 8.7c-4.8.2-8.7 3-9.6 7.1-.8 3.8 1.5 6.3 6.7 7.7 3.7 1 4.7 1.8 4.4 3.4-.3 1.8-2.1 2.8-4.9 2.6-2.6-.1-5.4-1.1-7.7-2.8l-2 5.5c2.8 1.8 6.1 2.7 9.4 2.7 5.5 0 9.6-2.8 10.5-7.3.8-4-1.4-6.5-6.7-7.9-3.6-1-4.6-1.6-4.3-3.2.3-1.5 1.8-2.5 4.2-2.5 2.3 0 4.6.8 6.6 2.2l2-5.3c-2.3-1.5-5.4-2.4-8.6-2.2Z" fill="#008eef" />
    </svg>
  </span>
  <span class="brand-copy">
    <strong>SIVAH TECH</strong>
    <small>Global Technology Experts</small>
  </span>
`;

const navItems = [
  ["home", "Home", "index.html"],
  ["services", "Services", "services.html"],
  ["work", "Work", "work.html"],
  ["about", "About Us", "about.html"],
  ["process", "Process", "process.html"],
  ["blog", "Insights", "blog.html"],
  ["contact", "Contact", "contact.html"],
];

const renderSharedComponents = () => {
  document.querySelectorAll("site-header").forEach((mount) => {
    const active = mount.getAttribute("active") || "";
    mount.innerHTML = `
      <header class="site-header" data-header>
        <nav class="nav container" aria-label="Primary navigation">
          <a class="brand" href="index.html" aria-label="Sivah Tech home">${logoMarkup}</a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu" data-nav-toggle>
            <span></span>
            <span></span>
            <span></span>
            <span class="sr-only">Open menu</span>
          </button>
          <div class="nav-panel" id="primary-menu" data-nav-panel>
            <ul class="nav-links">
              ${navItems
                .map(
                  ([key, label, href]) =>
                    `<li><a${key === active ? ' class="active"' : ""} href="${href}">${label}</a></li>`
                )
                .join("")}
            </ul>
            <a class="btn btn-light nav-cta" href="contact.html">Start a Project ${arrowIcon}</a>
          </div>
          <button class="menu-icon" type="button" aria-label="More navigation">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </nav>
      </header>
    `;
  });

  document.querySelectorAll("site-footer").forEach((mount) => {
    mount.innerHTML = `
      <footer class="footer" id="contact">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="brand" href="index.html">${logoMarkup}</a>
            <p>We are a global digital solutions company helping businesses create, scale and grow through technology and innovation.</p>
            <div class="social-links" aria-label="Social links">
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1Z" /></svg></a>
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M5 8h4v12H5V8Zm2-5a2.2 2.2 0 1 1 0 4.4A2.2 2.2 0 0 1 7 3Zm5 5h3.8v1.7c.6-1 1.8-2 3.7-2 3 0 4.5 2 4.5 5.7V20h-4v-6c0-1.8-.6-2.8-2-2.8-1.5 0-2.1 1.1-2.1 2.8v6H12V8Z" /></svg></a>
              <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24"><path d="M21 6.7c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.2 1.7-2.2-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.7 11.4 11.4 0 0 1-8.3-4.2 4 4 0 0 0 1.2 5.4c-.7 0-1.3-.2-1.8-.5 0 2 1.4 3.6 3.2 4-.6.2-1.2.2-1.8.1.5 1.6 2 2.8 3.8 2.8A8.1 8.1 0 0 1 2 19.1 11.4 11.4 0 0 0 8.2 21c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2.1-2.1Z" /></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM12 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" /></svg></a>
            </div>
          </div>
          <div class="footer-col">
            <h3>Quick Links</h3>
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="work.html">Our Work</a>
            <a href="services.html">Services</a>
            <a href="process.html">Process</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="footer-col">
            <h3>Services</h3>
            <a href="services.html#web">Web Development</a>
            <a href="services.html#mobile">Mobile App Development</a>
            <a href="services.html#ux">UI/UX Design</a>
            <a href="services.html#commerce">E-Commerce Solutions</a>
            <a href="services.html#marketing">Digital Marketing</a>
            <a href="services.html#support">Support & Maintenance</a>
          </div>
          <div class="footer-col">
            <h3>Resources</h3>
            <a href="features.html">Features</a>
            <a href="pricing.html">Pricing</a>
            <a href="testimonials.html">Testimonials</a>
            <a href="faq.html">FAQ</a>
            <a href="privacy.html">Privacy</a>
            <a href="terms.html">Terms</a>
          </div>
          <div class="footer-contact">
            <h3>Contact Us</h3>
            <p><span>UK Office</span> +44 79007 60991<br />info@sivahtech.co.uk</p>
            <p><span>UK Office</span> +44 79008 45713<br />info@sivahtech.co.uk</p>
          </div>
          <form class="newsletter" aria-label="Newsletter subscription">
            <h3>Subscribe to Newsletter</h3>
            <p>Get the latest insights and updates straight to your inbox</p>
            <label>
              <span class="sr-only">Email address</span>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" aria-label="Subscribe">${arrowIcon}</button>
            </label>
          </form>
        </div>
        <div class="container footer-bottom">
          <p>© 2024 SivahTech Solutions Pvt. Ltd. All Rights Reserved.</p>
          <a class="back-to-top" href="#top" aria-label="Back to top">
            <svg viewBox="0 0 20 20"><path d="M10 4 4.8 9.2 6 10.4l3.1-3.1V16h1.8V7.3l3.1 3.1 1.2-1.2L10 4Z" /></svg>
          </a>
        </div>
      </footer>
    `;
  });
};

renderSharedComponents();

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

document.querySelectorAll(".newsletter, .contact-form").forEach((form) => form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");
  if (input) input.value = "";
}));
