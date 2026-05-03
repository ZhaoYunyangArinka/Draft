// Get main carousel container and control buttons
const carousel = document.getElementById("popularCarousel");
const prevBtn = document.querySelector(".carousel-container .recommend-prev");
const nextBtn = document.querySelector(".carousel-container .recommend-next");

if (carousel && prevBtn && nextBtn) {
  // Convert all carousel items into an array for easier manipulation
  const cards = Array.from(carousel.children);

  // The index of the currently centered card
  let currentIndex = 2;

  // Updates the position of all cards
  function updateCarousel() {
    // Rremove all existing position classes
    cards.forEach(card => {
      card.classList.remove("active-0", "active-1", "active-2", "active-3", "active-4");
    });

    // Assign new positions relative to the current center
    for (let position = -2; position <= 2; position++) {
      // Calculate the correct card index to allow the carousel to loop infinitely
      const cardIndex = (currentIndex + position + cards.length) % cards.length;
      // Convert position into a class name
      const activeClass = "active-" + (position + 2);
      // Control this class through CSS
      cards[cardIndex].classList.add(activeClass);
    }
  }

  // Move carousel to the next item
  nextBtn.addEventListener("click", () => {
    // Update center index
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  });

  // Move carousel to the previous item
  prevBtn.addEventListener("click", () => {
    // Update center index
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  });

  updateCarousel();
}

const sortBox = document.getElementById("sortBox");
const sortBtn = document.getElementById("sortBtn");
const options = document.querySelectorAll(".sort-options li");
const productSection = document.querySelector(".product-section");

if (sortBox && sortBtn && productSection) {
  const originalProductCards = Array.from(productSection.children);

  // 点击按钮 → toggle
  sortBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    sortBox.classList.toggle("active");
  });

  // 点击选项 → 更新文字 + 排序 + 关闭
  options.forEach(option => {
    option.addEventListener("click", () => {
      const selectedText = option.textContent.trim();

      sortBtn.textContent = selectedText;
      sortBox.classList.remove("active");

      let sortedCards = [...originalProductCards];

      if (selectedText === "Name: A - Z") {
        sortedCards.sort((a, b) => {
          const nameA = a.querySelector("figcaption").textContent.trim();
          const nameB = b.querySelector("figcaption").textContent.trim();
          return nameA.localeCompare(nameB);
        });
      }

      if (selectedText === "Name: Z - A") {
        sortedCards.sort((a, b) => {
          const nameA = a.querySelector("figcaption").textContent.trim();
          const nameB = b.querySelector("figcaption").textContent.trim();
          return nameB.localeCompare(nameA);
        });
      }

      // Sales / Price: Low to High / Price: High to Low 保持原顺序
      if (
        selectedText === "Sales" ||
        selectedText === "Price: Low to High" ||
        selectedText === "Price: High to Low"
      ) {
        sortedCards = [...originalProductCards];
      }

      sortedCards.forEach(card => {
        productSection.appendChild(card);
      });
    });
  });

  // 点击外面 → 关闭
  document.addEventListener("click", () => {
    sortBox.classList.remove("active");
  });
}




// Recommend carousel: infinite slide one product at a time
const recommendProducts = document.querySelector(".recommend-products");
const recommendPrev = document.querySelector(".recommend-prev");
const recommendNext = document.querySelector(".recommend-next");

if (recommendProducts && recommendPrev && recommendNext) {
  let isAnimating = false;

  function getRecommendSlideDistance() {
    const card = recommendProducts.querySelector(".product-card");
    const gap = parseFloat(getComputedStyle(recommendProducts).columnGap);
    return card.offsetWidth + gap;
  }

  // Click right arrow: slide left, then move first card to the end
  recommendNext.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    const distance = getRecommendSlideDistance();

    recommendProducts.style.transition = "transform 0.45s ease";
    recommendProducts.style.transform = `translateX(-${distance}px)`;

    recommendProducts.addEventListener("transitionend", function handleTransitionEnd() {
      recommendProducts.appendChild(recommendProducts.firstElementChild);

      recommendProducts.style.transition = "none";
      recommendProducts.style.transform = "translateX(0)";

      recommendProducts.removeEventListener("transitionend", handleTransitionEnd);
      isAnimating = false;
    });
  });

  // Click left arrow: move last card to the front, then slide right
  recommendPrev.addEventListener("click", () => {
    if (isAnimating) return;
    isAnimating = true;

    const distance = getRecommendSlideDistance();

    recommendProducts.style.transition = "none";
    recommendProducts.prepend(recommendProducts.lastElementChild);
    recommendProducts.style.transform = `translateX(-${distance}px)`;

    recommendProducts.offsetHeight;

    recommendProducts.style.transition = "transform 0.45s ease";
    recommendProducts.style.transform = "translateX(0)";

    recommendProducts.addEventListener("transitionend", function handleTransitionEnd() {
      recommendProducts.removeEventListener("transitionend", handleTransitionEnd);
      isAnimating = false;
    });
  });
}


// Add to cart button: show "ADDED" state with SVG check
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {

    // 防止重复点击
    if (button.classList.contains("added")) return;

    button.classList.add("added");

    button.innerHTML = `
      <span>ADDED</span>
      <svg class="added-check" viewBox="0 0 24 24">
        <polyline 
          points="20 6 9 17 4 12"
          fill="none"
          stroke="currentColor"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `;
  });
});