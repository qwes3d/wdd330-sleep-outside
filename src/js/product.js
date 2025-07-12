// product.js
import { getLocalStorage, setLocalStorage, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Get the product ID from the URL
const productId = getParam("product");

// Create the data source for tents
const dataSource = new ProductData("tents");

// Create the ProductDetails instance and initialize it
const product = new ProductDetails(productId, dataSource);
product.init();

// Add product to local storage (cart)
function addProductToCart(productItem) {
  let cartItems = getLocalStorage("so-cart");

  // Normalize the cart data
  if (!Array.isArray(cartItems)) {
    if (cartItems && typeof cartItems === "object") {
      cartItems = [cartItems];
    } else {
      cartItems = [];
    }
  }

  cartItems.push(productItem);
  setLocalStorage("so-cart", cartItems);
  alert("Product added to cart!");
}

// Optional: Event handler if using external dataset-based button (not recommended if using ProductDetails class)
async function addToCartHandler(e) {
  try {
    const foundProduct = await dataSource.findProductById(e.target.dataset.id);
    if (!foundProduct) {
      alert("Product not found. Please try again.");
      return;
    }
    addProductToCart(foundProduct);
  } catch (error) {
    console.error("Add to Cart Error:", error);
    alert("An error occurred while adding to cart. Please try again.");
  }
}

// Optional manual binding (redundant if ProductDetails class already handles click)
const addToCartButton = document.getElementById("addToCart");
if (addToCartButton && !addToCartButton.dataset.bound) {
  addToCartButton.addEventListener("click", addToCartHandler);
  addToCartButton.dataset.bound = "true"; // prevent duplicate listeners
}
