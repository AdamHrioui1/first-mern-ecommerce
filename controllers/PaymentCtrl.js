const Payment = require("../models/PaymentModel")
const User = require("../models/UserModel")

const PaymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payment.find()
            return res.status(200).json({ payments })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createPayment: async (req, res) => {
        try {
            const user = await User.findById({ _id: req.user.id }).select('name email')
            if(!user) return res.status(400).json({ msg: 'User does not exist!' })

            const { _id, name, email } = user
            const { paymentId, address, cart } = req.body

            const newPayment = new Payment({
                user_id: _id, name, email, paymentId, address, cart
            })

            await newPayment.save()
            return res.status(200).json({ newPayment })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = PaymentCtrl