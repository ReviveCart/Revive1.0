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
                    <img src="images/${product.image}" alt="${product.name}">
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

// Cart functionality
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("open");
}

function closeCart() {
    document.getElementById("cartSidebar").classList.remove("open");
}

function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
    });
}

// Settings button functionality
function openSettings() {
    alert("Settings panel coming soon!");
}
fetch("https://revivecart.vercel.app/api/products") // Ensure this URL is correct
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById("products-container");
    container.innerHTML = ""; // Clear previous content
    products.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      card.innerHTML = `
        <h2>${product.name}</h2>
        <p>Expiry Date: ${product.expiryDate}</p>
        <p>Price: <s>₹${product.price}</s> → <strong>₹${product.discountedPrice}</strong></p>
        <p>Discount: ${product.discount}%</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => console.error("Error fetching products:", error));
