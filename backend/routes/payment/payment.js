var express = require('express');
var router = express.Router();
var paypalRoutes = require('./payment-methods/paypal');
var Payment = require('../../models/payment/payment.model');
var cashOnDeliveryRoutes = require('./payment-methods/cash-on-delivery');

router.get("/methods", (req, res, next) => {
    Payment.getMethods((err, methods) => {
        if(err) res.status(500).send({message: "Error! Please try again later"});
        else res.status(200).json({methods: methods});
    })
})

router.use('/paypal', paypalRoutes);
router.use('/cash-on-delivery', cashOnDeliveryRoutes);

module.exports = router;

