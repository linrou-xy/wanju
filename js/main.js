const cartCount = document.querySelector(".cart-count");
const toast = document.querySelector(".toast");
let cartItems = Number(sessionStorage.getItem("toybox-cart") || 0);

const updateCart = () => {
  if (cartCount) cartCount.textContent = String(cartItems);
};

const showToast = () => {
  if (!toast) return;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
};

document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const quantity = Number(document.querySelector("#quantity")?.value || 1);
    cartItems += quantity;
    sessionStorage.setItem("toybox-cart", String(cartItems));
    updateCart();
    showToast();
  });
});

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#toy-search");
const productCards = [...document.querySelectorAll(".product-card")];
const emptyState = document.querySelector(".empty-state");

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  productCards.forEach((card) => {
    const matched = card.dataset.name.toLowerCase().includes(keyword);
    card.hidden = !matched;
    if (matched) visibleCount += 1;
  });
  if (emptyState) emptyState.hidden = visibleCount !== 0;
});

document.querySelectorAll(".thumbnail").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".thumbnail")
      .forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const image = document.querySelector("#detail-product-image");
    if (image) image.src = button.dataset.image;
  });
});

document.querySelectorAll(".color-option").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".color-option")
      .forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

document.querySelectorAll(".quantity button").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.querySelector("#quantity");
    if (!input) return;
    const nextValue =
      button.dataset.action === "plus"
        ? Number(input.value) + 1
        : Number(input.value) - 1;
    input.value = String(Math.min(9, Math.max(1, nextValue)));
  });
});

updateCart();
