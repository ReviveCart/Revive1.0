const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (if needed)
app.use(express.static("public"));

// Example API Route
app.get("/api/products", (req, res) => {
    res.json([
        { name: "Milk", expiryDate: "2025-03-10", price: 50, discount: 10, discountedPrice: 45 },
        { name: "Rice", expiryDate: "2025-06-15", price: 100, discount: 15, discountedPrice: 85 },
        { name: "Bread", expiryDate: "2025-02-28", price: 30, discount: 20, discountedPrice: 24 },
        { name: "Medicines", expiryDate: "2025-12-01", price: 200, discount: 5, discountedPrice: 190 }
    ]);
});

// Set port dynamically for Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;  // Required for Vercel
