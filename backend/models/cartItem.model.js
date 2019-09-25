var mongoose = require('mongoose');
var Product = require('./product.model')

const cartItemSchema = mongoose.Schema({
    product: {
        id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product"
        },
        title: String,
        imageUrl: String,
        price: Number
    },
    quantity: Number
})

cartItemSchema.pre('remove', next => {
    this.model('Product').updateOne({ _id: this._id })
})

module.exports = mongoose.model('CartItem', cartItemSchema);