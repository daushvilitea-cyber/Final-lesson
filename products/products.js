const productsBox = document.getElementById("products");
const loadingProducts = document.getElementById("loading");

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    renderProducts(products);
    loadingProducts.style.display = "none";
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const renderProducts = (products) => {
  productsBox.innerHTML = "";

  products.map((product, index, array) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productsBox.appendChild(productCard);
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h3 class="title">${product.title}</h3>
      <p class="price">$${product.price}</p>
      <p class="category">${product.category}</p>
      <button class="cart">კალათში დამატება</button>
    `;
    const cartBtn = productCard.querySelector(".cart");
    cartBtn.addEventListener("click", () => {
      alert(`პროდუქტი "${product.title}" დამატებულია კალათში!`);
    });
  });
};
fetchProducts();
