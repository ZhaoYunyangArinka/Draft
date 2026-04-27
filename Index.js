const carousel = document.getElementById("popularCarousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const cards = Array.from(carousel.children);
let currentIndex = 2;

function updateCarousel() {
  cards.forEach(card => {
    card.classList.remove("active-0", "active-1", "active-2", "active-3", "active-4");
  });

  for (let position = -2; position <= 2; position++) {
    const cardIndex = (currentIndex + position + cards.length) % cards.length;
    const activeClass = "active-" + (position + 2);
    cards[cardIndex].classList.add(activeClass);
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

updateCarousel();