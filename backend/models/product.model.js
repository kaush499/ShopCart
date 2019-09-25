const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  addedToCart: { type: Boolean, required: true }
});

module.exports = mongoose.model('Product', productSchema);
