export function initNewsletter() {
  const form = document.querySelector("[data-newsletter]");
  if (!form) return;

  const output = form.querySelector("[data-newsletter-output]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = new FormData(form).get("email");
    if (!email || !String(email).includes("@")) {
      if (output) output.textContent = "Enter a valid email address.";
      return;
    }

    form.reset();
    if (output) output.textContent = "Thank you. We will be in touch soon.";
  });
}
