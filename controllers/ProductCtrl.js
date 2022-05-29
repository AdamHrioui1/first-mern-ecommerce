const Product = require("../models/ProductModel")

const ProductCtrl = {
    getProduct: async (req, res) => {
        try {
            const products = await Product.find()
            return res.status(200).json({ products })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, prevPrice, price, description, sizeAndQuantity, images } = req.body
            if(name.length === 0) return res.status(400).json({ msg: 'Please enter a product name!' })
            if(price.length === 0) return res.status(400).json({ msg: 'Please enter a price!' })
            if(description.length === 0) return res.status(400).json({ msg: 'Please enter a description!' })
            if(sizeAndQuantity.length === 0) return res.status(400).json({ msg: 'Please enter a size and it\'s quantity!' })
            if(images.length === 0) return res.status(400).json({ msg: 'Please enter an image!' })

            const newProduct = new Product({
                name: name.toLowerCase() , prevPrice, price, description: description.toLowerCase(), sizeAndQuantity, images
            })

            await newProduct.save()
            return res.status(200).json({ newProduct })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { name, prevPrice, price, description, sizeAndQuantity, sold, images } = req.body

            if(name.length === 0) return res.status(400).json({ msg: 'Please enter a product name!' })
            if(price.length === 0) return res.status(400).json({ msg: 'Please enter a price!' })
            if(description.length === 0) return res.status(400).json({ msg: 'Please enter a description!' })
            if(sizeAndQuantity.length === 0) return res.status(400).json({ msg: 'Please enter a size and it\'s quantity!' })
            if(images.length === 0) return res.status(400).json({ msg: 'Please enter an image!' })

            const product = await Product.findByIdAndUpdate({ _id: req.params.id }, {
                name: name.toLowerCase() , prevPrice, price, description: description.toLowerCase(), sizeAndQuantity, sold, images
            })

            return res.status(200).json({ product })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.findByIdAndDelete({ _id: req.params.id })
            return res.status(200).json('Product Deleted successfuly!!')
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = ProductCtrl