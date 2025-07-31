import { renderCart, addToCart } from "./cart.mjs";

// Dummy items for testing
addToCart({ id: "88342", name: "Tent", price: 99.99 });
addToCart({ id: "92837", name: "Sleeping Bag", price: 49.99 });

// Show the cart on load
renderCart();
