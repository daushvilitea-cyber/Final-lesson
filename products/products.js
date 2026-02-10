const productsBox = document.getElementById("products");
const loadingProducts = document.getElementById("loading");

let allProducts = [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const updateCount = () => {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;
  const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cartStorage.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalCount;
};
const addToCart = (product) => {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
};

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    allProducts = products;
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
      addToCart(product);
      alert(`პროდუქტი "${product.title}" დამატებულია კალათში!`);
    });
  });
};
const params = new URLSearchParams(window.location.search);
const searchValue = params.get("search");

if (searchValue) {
  const filtered = allProducts.filter((product) => product.title.toLowerCase());
  renderProducts(filtered);
} else {
  renderProducts(allProducts);
}

updateCount();
fetchProducts();
