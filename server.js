const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expiryDate: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);

// Function to calculate discount
function calculateDiscountedPrice(price, discount) {
    return (price - (price * discount) / 100).toFixed(2);
}

// Products API to fetch products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// API to add a new product
app.post("/api/products", async (req, res) => {
    const { name, expiryDate, price, discount } = req.body;
    const discountedPrice = calculateDiscountedPrice(price, discount);

    const product = new Product({
        name,
        expiryDate,
        price,
        discount,
        discountedPrice,
    });

    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Serve index.html for all routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});