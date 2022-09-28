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
    color: {
        type: String,
    },
    images: {
        type: Array,
        default: []
    },
    brand: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product