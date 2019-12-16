var express = require('express');
var router = express.Router();
var PaypalService = require('../../../services/payment-methods/paypal.service');

var order1;

router.post("", (req, res, next) => {
    let order = req.body.order;
    order1 = order;
    PaypalService.createPayment(order)
    .then(result => {
        res.setHeader('x-redirect', result);
        res.status(201).send();
    }).catch( err => {
        console.log(err);
    })
    // res.setHeader('x-redirect', 'anything');
    // console.log(res.getHeaderNames());
    // res.send();

});

router.get("/success", (req, res, next) => {
    console.log(req.query);

    PaypalService.executePayment(req.query)
    .then(result => {
        console.log(result);
        res.redirect('http://localhost:4200/order/success');
    }).catch(err => {
        console.log(err);
        res.redirect('http://localhost:4200/order/failure');
    });

})

router.get("/cancel", (req, res, next) => {
    res.redirect('http://localhost:4200');
})

module.exports = router;