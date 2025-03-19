document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/products")
        .then(response => response.json())
        .then(products => {
            const productList = document.querySelector(".product-list");
            if (productList) {
                productList.innerHTML = "";

                products.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");

                    // Use the product image if available, otherwise use a default image path
                    const imagePath = product.image 
                        ? `/images/${product.image}`
                        : `/images/${product.name.toLowerCase()}.jpg`;

                    productCard.innerHTML = `
                        <img src="${imagePath}" alt="${product.name}" onerror="this.src='/images/default.jpg'">
                        <h3>${product.name}</h3>
                        <p>Expiry: ${product.expiryDate}</p>
                        <p>Price: ₹${product.price}</p>
                        <p class="discount">Discount: ${product.discount}%</p>
                        <p>Final Price: <b>₹${product.discountedPrice}</b></p>
                        <button onclick="addToCart('${product.name}', ${product.discountedPrice})">Add to Cart</button>
                    `;

                    productList.appendChild(productCard);
                });
            }
        })
        .catch(error => console.error("Error fetching products:", error));
});

// Cart Functionality
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

// Function to remove a specific item from cart
function removeFromCart(index) {
    console.log(`Removing item at index ${index}`);
    cart.splice(index, 1); // Remove item at given index
    updateCartUI();
}

// Function to cancel the entire cart
function cancelCart() {
    if (cart.length === 0) {
        alert("Your cart is already empty!");
        return;
    }

    const confirmCancel = confirm("Are you sure you want to cancel the entire cart?");
    if (confirmCancel) {
        cart = []; // Clear cart
        updateCartUI();
        alert("Your cart has been canceled.");
    }
}

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("open");
}

function closeCart() {
    document.getElementById("cartSidebar").classList.remove("open");
}

// Function to update the cart UI
function updateCartUI() {
    const cartItems = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");

    if (!cartItems || !totalAmount) return; // Prevent errors if elements are missing

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price} 
            <button onclick="removeFromCart(${index})">❌ Remove</button>
        `;
        cartItems.appendChild(li);
        total += parseFloat(item.price);
    });

    totalAmount.textContent = `Total: ₹${total.toFixed(2)}`;
}

// Function for Buy Now button
function buyNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Proceeding to checkout...");
    cart = []; // Clear cart after purchase
    updateCartUI(); // Update UI
}

// Settings Functionality
const settingsButton = document.getElementById("settingsButton");
const settingsDropdown = document.getElementById("settingsDropdown");

if (settingsButton && settingsDropdown) {
    settingsButton.addEventListener("click", (event) => {
        event.stopPropagation();
        settingsDropdown.classList.toggle("show");
    });

    document.addEventListener("click", (event) => {
        if (!settingsButton.contains(event.target) && !settingsDropdown.contains(event.target)) {
            settingsDropdown.classList.remove("show");
        }
    });
}

// Navigation Functions
function goHome() {
    window.location.href = "home.html";
}

function goToShop() {
    window.location.href = "index.html";
}

function goToSellerPage() {
    window.location.href = "seller.html";
}

function showContactDetails() {
    alert("Contact: support@revivecart.com\nPhone: +91 98765 43210");
}