const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, "public")));

// Products API
app.get("/api/products", (req, res) => {
    const products = [
        { name: "Milk", expiryDate: "2025-06-01", price: 50, image: "milk.jpg" },
        { name: "Rice", expiryDate: "2025-08-15", price: 100, image: "rice.jpg" },
        { name: "Medicines", expiryDate: "2026-01-10", price: 200, image: "medicines.jpg" },
        { name: "Bread", expiryDate: "2025-03-25", price: 40, image: "bread.jpg" },
    ];
    res.json(products);
});

// Serve index.html for all routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
