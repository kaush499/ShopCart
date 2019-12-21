var express = require('express');
var router = express.Router();
var paypalRoutes = require('./payment-methods/paypal');
var Payment = require('../../models/payment/payment.model');

router.get("/methods", (req, res, next) => {
    console.log("payment/methods route");
    Payment.getMethods((err, methods) => {
        if(err){
            res.status(500).send({message: "Error! Please try again later"});
        } 
        else{
            console.log(methods);
            res.status(200).json({methods: methods});
        } 
    })
})

router.use('/paypal', paypalRoutes);

module.exports = router;

