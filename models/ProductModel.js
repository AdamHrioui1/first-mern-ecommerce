const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prevPrice: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sizeAndQuantity: {
        type: Array,
        default: []
    },
    sold: {
        type: Array,
        default: []
    },
    images: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product