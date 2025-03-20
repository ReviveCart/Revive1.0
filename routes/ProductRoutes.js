const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route to add a new product
router.post('/add-product', async (req, res) => {
    const { name, price, expiryDate, seller } = req.body;

    try {
        const product = new Product({ name, price, expiryDate, seller });
        await product.save();
        res.status(201).json({ message: 'Product added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product.', error });
    }
});

// Route to fetch products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products.', error });
    }
});

module.exports = router;
