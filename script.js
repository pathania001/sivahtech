const arrowIcon =
  '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10.8 4.9 15.9 10l-5.1 5.1-1.2-1.2 3-3H4V9.1h8.6l-3-3 1.2-1.2Z" /></svg>';

const business = {
  name: "Sivah Tech",
  url: "https://sivahtech.com/",
  email: "info@sivahtech.com",
  phone: "+91 75082 76752",
  phoneHref: "tel:+917508276752",
  whatsapp: "https://wa.me/917508276752",
  address: "Plot E, 195, Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Mohali, Punjab, India",
  markets: "USA, UK, Australia & India",
  socials: {
    facebook: "https://www.facebook.com/SivahTech",
    linkedinProfile: "https://in.linkedin.com/in/sivah-tech",
    linkedinCompany: "https://in.linkedin.com/company/sivah-tech",
  },
};

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
        <div class="header-topbar">
          <div class="container topbar-content">
            <span>Global digital agency for ${business.markets}</span>
            <a href="mailto:${business.email}">${business.email}</a>
            <a href="${business.phoneHref}">${business.phone}</a>
          </div>
        </div>
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
              <a href="${business.socials.facebook}" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.6.4-1 1-1Z" /></svg></a>
              <a href="${business.socials.linkedinCompany}" aria-label="LinkedIn company"><svg viewBox="0 0 24 24"><path d="M5 8h4v12H5V8Zm2-5a2.2 2.2 0 1 1 0 4.4A2.2 2.2 0 0 1 7 3Zm5 5h3.8v1.7c.6-1 1.8-2 3.7-2 3 0 4.5 2 4.5 5.7V20h-4v-6c0-1.8-.6-2.8-2-2.8-1.5 0-2.1 1.1-2.1 2.8v6H12V8Z" /></svg></a>
              <a href="${business.socials.linkedinProfile}" aria-label="LinkedIn profile"><svg viewBox="0 0 24 24"><path d="M5 8h4v12H5V8Zm2-5a2.2 2.2 0 1 1 0 4.4A2.2 2.2 0 0 1 7 3Zm5 5h3.8v1.7c.6-1 1.8-2 3.7-2 3 0 4.5 2 4.5 5.7V20h-4v-6c0-1.8-.6-2.8-2-2.8-1.5 0-2.1 1.1-2.1 2.8v6H12V8Z" /></svg></a>
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
            <p><span>Mohali Delivery Hub</span> ${business.address}</p>
            <p><span>Talk to Sivah Tech</span> <a href="${business.phoneHref}">${business.phone}</a><br /><a href="mailto:${business.email}">${business.email}</a></p>
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

const renderGlobalLeadSystems = () => {
  const footerAnchor = document.querySelector("site-footer, footer.footer");
  if (footerAnchor && !document.querySelector(".global-consultation")) {
    footerAnchor.insertAdjacentHTML(
      "beforebegin",
      `
        <section class="global-consultation section" aria-labelledby="global-consultation-title">
          <div class="container consultation-grid">
            <div class="consultation-card reveal">
              <p class="section-label">Free Consultation</p>
              <h2 id="global-consultation-title">Speak with a dedicated digital team before you commit.</h2>
              <p>Share your website, app, SEO or maintenance goals and we will recommend a practical next step for your market, platform and budget.</p>
              <div class="support-banner" aria-label="Support promise">
                <strong>Long-term support available</strong>
                <span>Website maintenance, performance tuning, SEO improvements and priority development support from the same in-house team.</span>
              </div>
              <div class="consultation-actions">
                <a class="btn btn-primary" href="${business.phoneHref}">Call ${business.phone}<span class="btn-orb" aria-hidden="true">${arrowIcon}</span></a>
                <a class="btn btn-outline" href="mailto:${business.email}">Email ${business.email}${arrowIcon}</a>
              </div>
            </div>
            <form class="quick-inquiry-form reveal" style="--delay: 120ms" aria-label="Quick consultation form">
              <div class="field"><label for="quick-name">Name</label><input id="quick-name" name="name" type="text" placeholder="Your name" required /></div>
              <div class="field"><label for="quick-email">Email</label><input id="quick-email" name="email" type="email" placeholder="you@company.com" required /></div>
              <div class="field"><label for="quick-service">What do you need?</label><select id="quick-service" name="service"><option>Website Development</option><option>SEO & Performance</option><option>Mobile App Development</option><option>UI/UX Design</option><option>Website Maintenance</option></select></div>
              <button class="btn btn-primary" type="submit">Request Consultation <span class="btn-orb" aria-hidden="true">${arrowIcon}</span></button>
            </form>
          </div>
        </section>
      `
    );
  }

  if (!document.querySelector(".sticky-contact-strip")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <aside class="sticky-contact-strip" aria-label="Quick contact options">
          <span>Need a website, app or SEO partner?</span>
          <a href="${business.phoneHref}">${business.phone}</a>
          <a href="mailto:${business.email}">${business.email}</a>
          <a class="strip-cta" href="contact.html">Start Project</a>
        </aside>
        <div class="floating-contact-actions" aria-label="Floating contact actions">
          <a href="${business.whatsapp}" aria-label="Chat on WhatsApp">
            <svg viewBox="0 0 24 24"><path d="M12 3a8.8 8.8 0 0 0-7.6 13.2L3 21l5-1.3A8.8 8.8 0 1 0 12 3Zm0 2a6.8 6.8 0 0 1 5.8 10.3l-.3.5.5 1.9-1.9-.5-.5.3A6.8 6.8 0 0 1 6.2 8.2 6.8 6.8 0 0 1 12 5Zm-2.8 3.5c-.2 0-.6.1-.9.5-.3.4-.9 1-.9 2.3s.9 2.6 1.1 2.8c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.4l-1.7-.8c-.2-.1-.4-.1-.6.2-.2.3-.7.9-.9 1.1-.1.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-3-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6l-.8-1.9c-.2-.5-.4-.5-.6-.5h-.6Z" /></svg>
          </a>
          <a href="${business.phoneHref}" aria-label="Call Sivah Tech">
            <svg viewBox="0 0 24 24"><path d="M6.6 3.7 10 7.1 8 9.2c.8 1.6 2.2 3.1 3.1 3.9.8.8 2.3 2.2 3.9 3.1l2.1-2 3.3 3.4c.5.5.5 1.2 0 1.7l-1.7 1.7c-.9.9-2.3 1.1-3.5.6-2.8-1.1-5.5-2.9-7.8-5.1C5.2 14.2 3.4 11.5 2.3 8.7c-.5-1.2-.3-2.6.6-3.5l1.7-1.6c.5-.5 1.3-.5 2 0Z" /></svg>
          </a>
        </div>
      `
    );
  }
};

renderGlobalLeadSystems();

const pageName = document.title.split("|")[0].trim() || "Home";
const pageUrl = `${business.url}${window.location.pathname.split("/").pop() || "index.html"}`;
const servicesOffered = [
  "Website Development",
  "Website Design",
  "SEO",
  "Mobile App Development",
  "Website Maintenance",
  "UI/UX Design",
  "Graphic Design",
  "Branding",
  "Performance Optimization",
  "WordPress Development",
  "Shopify Development",
  "Laravel Development",
  "Next.js Development",
];

const schemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${business.url}#organization`,
      name: business.name,
      url: business.url,
      email: business.email,
      telephone: business.phone,
      logo: `${business.url}logo.svg`,
      sameAs: [business.socials.facebook, business.socials.linkedinProfile, business.socials.linkedinCompany],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: business.phone,
          email: business.email,
          contactType: "sales",
          areaServed: ["US", "GB", "AU", "IN"],
          availableLanguage: ["English", "Hindi", "Punjabi"],
        },
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${business.url}#localbusiness`,
      name: business.name,
      url: business.url,
      email: business.email,
      telephone: business.phone,
      priceRange: "$$",
      parentOrganization: { "@id": `${business.url}#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Plot E, 195, Industrial Area, Sector 74",
        addressLocality: "Sahibzada Ajit Singh Nagar",
        addressRegion: "Punjab",
        postalCode: "160055",
        addressCountry: "IN",
      },
      areaServed: ["Mohali", "Punjab", "United States", "United Kingdom", "Australia", "India"],
    },
    {
      "@type": "WebSite",
      "@id": `${business.url}#website`,
      name: business.name,
      url: business.url,
      publisher: { "@id": `${business.url}#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${business.url}?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: business.url },
        { "@type": "ListItem", position: 2, name: pageName, item: pageUrl },
      ],
    },
    ...servicesOffered.map((service) => ({
      "@type": "Service",
      name: service,
      provider: { "@id": `${business.url}#organization` },
      areaServed: ["USA", "UK", "Australia", "India", "Mohali", "Punjab"],
      serviceType: service,
      url: `${business.url}services.html`,
    })),
  ],
};

const schemaTag = document.createElement("script");
schemaTag.type = "application/ld+json";
schemaTag.textContent = JSON.stringify(schemaGraph);
document.head.appendChild(schemaTag);

const faqDetails = [...document.querySelectorAll(".faq-card details")].slice(0, 12);
if (faqDetails.length) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqDetails.map((item) => ({
      "@type": "Question",
      name: item.querySelector("summary")?.textContent.trim() || "",
      acceptedAnswer: {
        "@type": "Answer",
        text: item.querySelector("p")?.textContent.trim() || "",
      },
    })),
  };
  const faqSchemaTag = document.createElement("script");
  faqSchemaTag.type = "application/ld+json";
  faqSchemaTag.textContent = JSON.stringify(faqSchema);
  document.head.appendChild(faqSchemaTag);
}

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
