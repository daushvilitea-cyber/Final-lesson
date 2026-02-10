const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const password2Input = document.getElementById("password2");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const password2Error = document.getElementById("password2Error");

const modal = document.getElementById("succesModal");
const closeModal = document.getElementById("closeModal");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  password2Error.textContent = "";

  let hasError = false;
  if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    emailError.textContent = "გთხოვთ, შეიყვანეთ ვალიდური ელ.ფოსტა";
    hasError = true;
  }

  if (nameInput.value.length < 3) {
    nameError.textContent = "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს";
    hasError = true;
  }

  if (
    passwordInput.value.length < 8 ||
    !/\d/.test(passwordInput.value) ||
    !/[A-Z]/.test(passwordInput.value)
  ) {
    passwordError.textContent =
      "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო, შეიცავდეს ციფრს და დიდ ასოს";
    hasError = true;
  }

  if (passwordInput.value !== password2Input.value) {
    password2Error.textContent = "პაროლები არ ემთხვევა";
    hasError = true;
  }

  if (!hasError) {
    document.getElementById("succesModal").style.display = "block";
  }
});
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  window.location.href = "../products/products.html";
});
