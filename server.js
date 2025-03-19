const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const Product = require("./models/Product");
require('dotenv').config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Products API - Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new product (for seller page)
app.post("/api/products", async (req, res) => {
  try {
    const { name, price, discount, expiryDate, image } = req.body;
    
    const newProduct = new Product({
      name,
      price,
      discount,
      expiryDate,
      image: image || `${name.toLowerCase()}.jpg`
    });
    
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({ error: error.message });
  }
});

// Initialize DB with demo products if empty
const initializeDB = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const demoProducts = [
        { name: "Milk", expiryDate: "2025-06-01", price: 50, discount: 10 },
        { name: "Rice", expiryDate: "2025-08-15", price: 100, discount: 15 },
        { name: "Medicines", expiryDate: "2026-01-10", price: 200, discount: 20 },
        { name: "Bread", expiryDate: "2025-03-25", price: 40, discount: 5 },
      ];
      
      await Product.insertMany(demoProducts);
      console.log("Demo products added to database");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Serve index.html for all routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  initializeDB(); // Initialize database with demo products
});