const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = searchInput.value.trim();

      if (value) {
        window.location.href =
          "../products/products.html?search=" + encodeURIComponent(value);
      }
    }
  });
}
