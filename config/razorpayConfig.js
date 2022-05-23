const express = require("express");

const router = express.Router()

var Razorpay = require('razorpay');

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret:process.env.RAZORPAY_SECRET_KEY
})

router.post('/razorpay', (req, res, next) => {
    var options = {
        amount: req.body.amount * 100,
        currency: 'INR',
    }
    instance.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
            next(err)
        }
        if (order) {
            res.json({
                success: true,
                status: "Order Created Successfully",
                value: order,
                key: 'rzp_test_8miRJ8ME4c2Qqn'
            })
        }
    })
})


module.exports = router
