document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.querySelector(".product-list");
            productList.innerHTML = ""; // Clear existing content

            products.forEach(product => {
                const productCard = document.createElement("div");
                productCard.classList.add("product-card");

                productCard.innerHTML = `
                    <img src="images/${product.name.toLowerCase()}.jpg" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Expiry: ${product.expiryDate}</p>
                    <p>Price: ₹${product.price}</p>
                    <p class="discount">Discount: ${product.discount}%</p>
                    <p>Final Price: <b>₹${product.discountedPrice}</b></p>
                    <button onclick="addToCart('${product.name}', ${product.discountedPrice})">Add to Cart</button>
                `;

                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});
