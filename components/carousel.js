export function initCarousel() {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-carousel-track]");
  const previous = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");

  if (!track || !previous || !next) return;

  const scrollByCard = (direction) => {
    const card = track.querySelector(".project-card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0");
    const amount = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.85;

    track.scrollBy({
      left: direction * amount,
      behavior: "smooth",
    });
  };

  previous.addEventListener("click", () => scrollByCard(-1));
  next.addEventListener("click", () => scrollByCard(1));
}
