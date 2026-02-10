const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");

const idError = document.getElementById("idError");
const passwordError = document.getElementById("passwordError");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  idError.textContent = "";
  passwordError.textContent = "";
  let hasError = false;

  if (usernameInput.value.length < 3) {
    idError.textContent = "სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს";
    hasError = true;
  }
  if (
    passwordInput.value.length < 6 ||
    !/\d/.test(passwordInput.value) ||
    !/[A-Z]/.test(passwordInput.value)
  ) {
    passwordError.textContent =
      "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო, შეიცავდეს ციფრს და დიდ ასოს";
    hasError = true;
  }
  if (!hasError) {
    alert("თქვენ წარმატებით გაიარეთ ავტორიზაცია");
    window.location.href = "../products/products.html";

    const userData = {
      username: usernameInput.value,
      password: passwordInput.value,
    };

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
