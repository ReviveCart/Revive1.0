const express = require("express");
const path = require("path");

const app = express();

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Product Data
const products = [
    { name: "Milk", expiryDate: "2025-03-10", price: 50, discount: 10, image: "milk.jpeg" },
    { name: "Rice", expiryDate: "2025-06-20", price: 80, discount: 15, image: "rice.jpg" },
    { name: "Medicines", expiryDate: "2025-09-15", price: 200, discount: 20, image: "medicines.jpg" },
    { name: "Bread", expiryDate: "2025-02-28", price: 40, discount: 5, image: "bread.jpg" }
];

// Calculate discounted prices
products.forEach(product => {
    product.discountedPrice = (product.price * (1 - product.discount / 100)).toFixed(2);
});

// API Route for fetching products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
