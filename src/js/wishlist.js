import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderWishlist() {
  const wishlist = getLocalStorage("so-wishlist") || [];
  const wishlistContainer = document.querySelector("#wishlist");
  wishlistContainer.innerHTML = "";

  wishlist.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("wishlist-item");
    div.dataset.id = item.Id;

    div.innerHTML = `
      <h3>${item.Name}</h3>
      <p>Price: $${item.FinalPrice}</p>
      <button class="move-to-cart">Move to Cart</button>
     <button class="remove-from-wishlist">Remove</button>
    `;


    wishlistContainer.appendChild(div);
  });

  // Attach event listeners
  document.querySelectorAll(".move-to-cart").forEach(button => {
    button.addEventListener("click", moveToCart);
  });
}

function moveToCart(event) {
  const productId = event.target.closest(".wishlist-item").dataset.id;
  let wishlist = getLocalStorage("so-wishlist") || [];
  let cart = getLocalStorage("so-cart") || [];

  const itemIndex = wishlist.findIndex(item => item.Id === productId);
  if (itemIndex !== -1) {
    const item = wishlist.splice(itemIndex, 1)[0];

    if (!cart.find(product => product.Id === item.Id)) {
      cart.push(item);
    }

    setLocalStorage("so-wishlist", wishlist);
    setLocalStorage("so-cart", cart);
    renderWishlist(); // Re-render updated list
  }
}

renderWishlist();
document.querySelectorAll(".move-to-cart").forEach(button => {
  button.addEventListener("click", moveToCart);
});
document.querySelectorAll(".remove-from-wishlist").forEach(button => {
  button.addEventListener("click", removeFromWishlist);
});
function removeFromWishlist(event) {
  const productId = event.target.closest(".wishlist-item").dataset.id;
  let wishlist = getLocalStorage("so-wishlist") || [];

  wishlist = wishlist.filter(item => item.Id !== productId);
  setLocalStorage("so-wishlist", wishlist);
  renderWishlist(); // Re-render updated list
}
