const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("public"));

const products = [
    { name: "Milk", expiryDate: "2025-03-10", price: 50, discount: 10, discountedPrice: 45 },
    { name: "Rice", expiryDate: "2025-06-15", price: 100, discount: 15, discountedPrice: 85 },
    { name: "Medicines", expiryDate: "2025-12-31", price: 200, discount: 20, discountedPrice: 160 },
    { name: "Bread", expiryDate: "2025-02-28", price: 30, discount: 5, discountedPrice: 28 }
];

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.listen(5000, () => console.log("Server running on port 5000"));
