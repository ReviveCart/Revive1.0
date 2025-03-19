const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expiryDate: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: 'default.jpg'
  }
});

// Calculate discounted price before saving
ProductSchema.pre('save', function(next) {
  this.discountedPrice = (this.price - (this.price * this.discount) / 100).toFixed(2);
  next();
});

module.exports = mongoose.model('Product', ProductSchema);