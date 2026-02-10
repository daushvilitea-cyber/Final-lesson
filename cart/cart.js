const cartBox = document.getElementById("cartBox");
const totalBox = document.getElementById("totalBox");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const updateCount = () => {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;
  const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cartStorage.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalCount;
};

const renderCart = () => {
  cartBox.innerHTML = "";
  if (cart.length === 0) {
    cartBox.innerHTML = `<div class="emptyCart">
      <img src="../assets/empty.png" alt ="Empty" width="500">
      <p>კალათა ცარიელია</p>
    </div>`;
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cart-item-image" width="100">
    <h3 class="cart-item-title">${item.title}</h3>
    <p>$ფასი ${item.price}</p>
    <p>აღწერა: ${item.description}</p>
    <div class="quantity-control">
      <button class="decrease" data-id="${item.id}">-</button>
      <span class="quantity">${item.quantity}</span>
      <button class="increase" data-id="${item.id}">+</button>
    </div>
    <p>კატეგორია: ${item.category}</p>
    <button class="removeBtn" data-id="${item.id}">წაშლა</button>`;

    const minusBtn = itemElement.querySelector(".decrease");

    const plusBtn = itemElement.querySelector(".increase");
    minusBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    plusBtn.addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    const removeBtn = itemElement.querySelector(".removeBtn");
    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });

    cartBox.appendChild(itemElement);
    total += item.price * item.quantity;
  });
  totalBox.innerHTML = `<h2>ჯამი: $${total}</h2>
  <p>ნივთების რაოდენობა: ${cart.length}</p>
  <h3> ${total.toFixed(2)} ლარი</h3>
  <button id="checkoutBtn">გადახდა</button>`;
};
renderCart();
updateCount();
