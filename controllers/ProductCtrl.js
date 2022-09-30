const Product = require("../models/ProductModel")

class APIfeatures {
    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filtring() {
        const queryObj = {...this.queryString}
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))
        
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|regex)\b/g, match => '$' + match)
        
        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }
        else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 3
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}

const ProductCtrl = {
    getProduct: async (req, res) => {
        try {
            const features = new APIfeatures(Product.find(), req.query).filtring().sorting().paginating()
            const products = await features.query
            return res.status(200).json({ products })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, prevPrice, price, description, sizeAndQuantity, color, images, brand } = req.body
            if(name.length === 0) return res.status(400).json({ msg: 'Please enter a product name!' })
            if(price.length === 0) return res.status(400).json({ msg: 'Please enter a price!' })
            if(description.length === 0) return res.status(400).json({ msg: 'Please enter a description!' })
            if(sizeAndQuantity.length === 0) return res.status(400).json({ msg: 'Please enter a size and it\'s quantity!' })
            if(images.length === 0) return res.status(400).json({ msg: 'Please enter an image!' })
            if(brand.length === 0) return res.status(400).json({ msg: 'Please enter a brand name!' })


            const newProduct = new Product({
                name: name.toLowerCase() , prevPrice, price, description: description.toLowerCase(), sizeAndQuantity, color, images, brand
            })

            await newProduct.save()
            return res.status(200).json({ newProduct })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { name, prevPrice, price, description, sizeAndQuantity, sold, color, images, brand } = req.body

            if(name.length === 0) return res.status(400).json({ msg: 'Please enter a product name!' })
            if(price.length === 0) return res.status(400).json({ msg: 'Please enter a price!' })
            if(description.length === 0) return res.status(400).json({ msg: 'Please enter a description!' })
            if(sizeAndQuantity.length === 0) return res.status(400).json({ msg: 'Please enter a size and it\'s quantity!' })
            if(images.length === 0) return res.status(400).json({ msg: 'Please enter an image!' })
            if(brand.length === 0) return res.status(400).json({ msg: 'Please enter a product brand!' })

            const product = await Product.findByIdAndUpdate({ _id: req.params.id }, {
                name: name.toLowerCase() , prevPrice, price, description: description.toLowerCase(), sizeAndQuantity, sold, color, images, brand
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
    },
}

module.exports = ProductCtrl