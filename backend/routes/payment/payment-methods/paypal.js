var express = require('express');
var router = express.Router();
var PaypalService = require('../../../services/payment-methods/paypal.service');

router.post("", (req, res, next) => {
    let order = req.body.order;
    PaypalService.createPayment(order)
    .then(result => {
        res.setHeader('x-redirect', result);
        res.status(201).send();
    }, err => {
        console.log(err);
    })
    // res.setHeader('x-redirect', 'anything');
    // console.log(res.getHeaderNames());
    // res.send();

});

router.get("/success", (req, res, next) => {
    console.log("su");
})

router.get("/cancel", (req, res, next) => {
    res.redirect('http://localhost:4200');
})

module.exports = router;