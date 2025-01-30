document.addEventListener("DOMContentLoaded", function () {
  let currentPage = 1; // Track the current page
  const loadMoreButton = document.getElementById("load-more-button");
  const productGrid = document.getElementById("product-grid");
  const collectionHandle = 'all'; // Replace with your collection handle

  loadMoreButton.addEventListener("click", function () {
    currentPage++; // Increment the page number
    loadMoreButton.disabled = true; // Disable the button to prevent multiple clicks

    // Fetch the next page of products
    fetch(`/collections/${collectionHandle}?page=${currentPage}`)
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const newProducts = doc.querySelectorAll("#product-grid .product-card");

        if (newProducts.length > 0) {
          // Append the new products to the product grid
          newProducts.forEach((product) => {
            productGrid.appendChild(product);
          });

          // Enable the "Load More" button again after the products load
          loadMoreButton.disabled = false;
        } else {
          // Hide the "Load More" button if there are no more products to load
          loadMoreButton.style.display = "none";
        }
      })
      .catch((error) => {
        console.error("Error loading more products:", error);
        loadMoreButton.disabled = false; // Enable the button again on error
      });
  });
});
