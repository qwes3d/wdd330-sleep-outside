// js/cart.mjs

function getCart() {
  return JSON.parse(localStorage.getItem("so-cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("so-cart", JSON.stringify(cart));
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.Id !== id);
  saveCart(cart);
  renderCart();
}

export function renderCart() {
  const cart = getCart();
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";

  cart.forEach(product => {
    const li = document.createElement("li");
    li.classList.add("cart-card", "divider");

    li.innerHTML = `
      <a href="/product_pages/${product.Slug}.html" class="cart-card__image">
        <img src="${product.Image}" alt="${product.Name}" />
      </a>
      <a href="/product_pages/${product.Slug}.html">
        <h2 class="card__name">${product.Name}</h2>
      </a>
      <p class="cart-card__color">${product.Color || "N/A"}</p>
      <p class="cart-card__quantity">qty: ${product.Quantity || 1}</p>
      <p class="cart-card__price">$${product.FinalPrice.toFixed(2)}</p>
      <button class="remove-btn" data-id="${product.Id}">❌</button>
    `;

    productList.appendChild(li);
  });

  document.querySelectorAll(".remove-btn").forEach(btn =>
    btn.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id");
      removeFromCart(id);
    })
  );
}
