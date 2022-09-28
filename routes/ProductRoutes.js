const router = require('express').Router()
const ProductCtrl = require('../controllers/ProductCtrl')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router.route('/product')
    .get(ProductCtrl.getProduct)
    .post(auth, adminAuth, ProductCtrl.createProduct)

router.route('/product/:id')
    .put(auth, adminAuth, ProductCtrl.updateProduct)    
    .delete(auth, adminAuth, ProductCtrl.deleteProduct)

module.exports = router