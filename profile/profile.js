const profileBox = document.getElementById("profile");

let currentUser = null;

const fetchUser = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/users/1");
    const user = await response.json();

    currentUser = user;
    renderProfile(user);
  } catch (error) {
    console.error("Error loading user:", error);
  }
};

const renderProfile = (user) => {
  profileBox.innerHTML = `
  <img src="../assets/profile.png" alt="Profile Picture" width="150">
    <h2>${user.name.firstname} ${user.name.lastname}</h2>
    <p>Email: ${user.email}</p>
    <p>Username: ${user.username}</p>

    <button id="editBtn">პროფილის რედაქტირება</button>
    <button id="logOut">გასვლა</button>
  `;

  document.getElementById("editBtn").addEventListener("click", renderEditForm);
  document.getElementById("logOut").addEventListener("click", () => {
    window.location.href = "../home page/index.html";
  });
};

const renderEditForm = () => {
  profileBox.innerHTML = `
    <input id="firstName" value="${currentUser.name.firstname}">
    <input id="lastName" value="${currentUser.name.lastname}">
    <input id="email" value="${currentUser.email}">
    <input id="username" value="${currentUser.username}">

    <button id="saveBtn">შენახვა</button>
  `;

  document.getElementById("saveBtn").addEventListener("click", saveProfile);
};

const saveProfile = () => {
  currentUser.name.firstname = document.getElementById("firstName").value;

  currentUser.name.lastname = document.getElementById("lastName").value;

  currentUser.email = document.getElementById("email").value;

  currentUser.username = document.getElementById("username").value;

  renderProfile(currentUser);
};
const fetchRecommendations = async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=8");
  const products = await response.json();

  const recBox = document.getElementById("recBox");
  recBox.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" width="100">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button class="cart">კალათში დამატება</button>
        `;
    productCard.querySelector(".cart").addEventListener("click", () => {
      alert("კალათში დამატებულია!");
    });
    recBox.appendChild(productCard);
  });
};
fetchUser();
fetchRecommendations();
