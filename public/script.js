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
