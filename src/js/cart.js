import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  document.querySelectorAll(".move-to-wishlist").forEach(button => {
    button.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      moveToWishlist(index);
    });
  });
}

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="move-to-wishlist" data-index="${index}">Move to Wishlist</button>
  </li>`;
}

function moveToWishlist(index) {
  const cart = getLocalStorage("so-cart") || [];
  const wishlist = getLocalStorage("so-wishlist") || [];

  const [item] = cart.splice(index, 1);
  wishlist.push(item);

  setLocalStorage("so-cart", cart);
  setLocalStorage("so-wishlist", wishlist);

  renderCartContents();
}

renderCartContents();
