// ProductDetails.mjs
import { setLocalStorage, qs } from "./utils.mjs";

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

      const addButton = qs("#addToCart");
      if (addButton) {
        addButton.addEventListener("click", this.addToCart.bind(this));
      }
    } catch (error) {
      console.error("Error loading product details:", error);
      qs(".product-detail__title").textContent = "Product Not Found";
    }
  }

  addToCart() {
    setLocalStorage("so-cart", this.product);
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
