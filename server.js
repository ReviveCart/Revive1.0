const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, "public")));

// Function to calculate discount
function calculateDiscountedPrice(price, discount) {
    return (price - (price * discount) / 100).toFixed(2);
}

// Products API with discount logic
app.get("/api/products", (req, res) => {
    const products = [
        { name: "Milk", expiryDate: "2025-06-01", price: 50, discount: 10 },
        { name: "Rice", expiryDate: "2025-08-15", price: 100, discount: 15 },
        { name: "Medicines", expiryDate: "2026-01-10", price: 200, discount: 20 },
        { name: "Bread", expiryDate: "2025-03-25", price: 40, discount: 5 },
    ];

    // Add discounted price to each product
    products.forEach(product => {
        product.discountedPrice = calculateDiscountedPrice(product.price, product.discount);
    });

    res.json(products);
});

// Serve index.html for all routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
