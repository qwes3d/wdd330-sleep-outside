import ProductList from "./productlist.mjs";
import ExternalServices from "./externalservices.mjs";

const params = new URLSearchParams(window.location.search);
const query = params.get("q");

// Target the <ul id="product-list"> element
const listElement = document.querySelector("#product-list");
const dataSource = new ExternalServices();

// Create instance of ProductList for search results
const productList = new ProductList("search", dataSource, listElement);

async function loadSearchResults() {
  try {
    const results = await dataSource.searchProducts(query);
    productList.renderList(results);
  } catch (error) {
    listElement.innerHTML = "<li>Error loading search results.</li>";
    throw new Error("Search error:", error);
  }
}

if (query) {
  loadSearchResults();
}
