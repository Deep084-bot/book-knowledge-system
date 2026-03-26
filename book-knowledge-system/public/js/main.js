const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase().trim();
    console.log("Search:", value);

    // TODO:
    // Later: call backend → GET /books?search=value
  });
}

const sortSelect = document.getElementById("sortSelect");

if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    const sortValue = e.target.value;
    console.log("Sort by:", sortValue);

    // TODO:
    // Later: call backend → GET /books?sort=rating/recent
  });
}

const bookForm = document.getElementById("bookForm");

if (bookForm) {
  bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(bookForm);
    const data = Object.fromEntries(formData.entries());

    // Clean tags (convert string → array)
    if (data.tags) {
      data.tags = data.tags.split(",").map(tag => tag.trim());
    }

    console.log("Submitting:", data);

    // TODO:
    // Later:
    // await fetch("/books", { method: "POST", body: JSON.stringify(data) })
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const bookId = e.target.dataset.id;
    console.log("Delete book:", bookId);

    // TODO:
    // DELETE /books/:id
  }
});