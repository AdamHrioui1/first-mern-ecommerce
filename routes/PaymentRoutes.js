const PaymentCtrl = require('../controllers/PaymentCtrl')
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = require('express').Router()

router.route('/payment')
    .get(auth, adminAuth, PaymentCtrl.getPayments)
    .post(auth, PaymentCtrl.createPayment)

module.exports = router