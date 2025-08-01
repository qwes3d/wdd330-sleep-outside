import { setLocalStorage, qs, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);

      if (!this.product) {
        throw new Error(`Product with ID "${this.productId}" not found.`);
      }

      this.renderProductDetails();

      qs("#addToCart")?.addEventListener("click", this.addToCart.bind(this));
      qs("#addToWishlist")?.addEventListener("click", this.addToWishlist.bind(this));
    } catch (error) {
      console.error("Error loading product details:", error);
      qs(".product-detail__title").textContent = "Product Not Found";
    }
  }

  addToCart() {
    let cart = getLocalStorage("so-cart") || [];
    const exists = cart.find(item => item.Id === this.product.Id);
    if (!exists) cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  addToWishlist() {
    let wishlist = getLocalStorage("so-wishlist") || [];
    const exists = wishlist.find(item => item.Id === this.product.Id);
    if (!exists) {
      wishlist.push(this.product);
      setLocalStorage("so-wishlist", wishlist);
      alert("Added to wishlist!");
    } else {
      alert("Already in wishlist.");
    }
  }

  renderProductDetails() {
    qs(".product-detail__title").textContent = this.product.Name;
    const imageElement = qs(".product-detail__image img");
    imageElement.src = this.product.Image;
    imageElement.alt = this.product.Name;
    qs(".product-detail__brand").textContent = this.product.Brand?.Name || "";
    qs(".product-detail__color").textContent = this.product.Colors.map(c => c.ColorName).join(", ");
    qs(".product-detail__description").innerHTML = this.product.DescriptionHtmlSimple;
    qs(".product-detail__price").textContent = `$${this.product.FinalPrice}`;
  }
}
