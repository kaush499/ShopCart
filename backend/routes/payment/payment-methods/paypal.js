var express = require('express');
var router = express.Router();
var PaypalService = require('../../../services/payment-methods/paypal.service');
var OrderService = require('../../../services/orders/order.service');

var order;

router.post("", (req, res, next) => {
    order = req.body.order;
    PaypalService.createPayment(order)
    .then(result => {
        res.setHeader('x-redirect', result);
        res.status(200).send();
    }).catch( err => {
        console.log(err);
        res.status(500).send("err: jn");
    })

});

router.get("/success", (req, res, next) => {
    console.log(req.query);
    console.log(req.body);

    PaypalService.executePayment(req.query)
    .then(paymentInfo => {
        OrderService.createOrder({order: order, paymentInfo: paymentInfo})
        .then(val => {
            console.log(val);
            res.redirect(`http://localhost:4200/order/success/${paymentInfo.transactionId}`);
        })
        .catch(error => {
            console.log(error);
            res.redirect('http://localhost:4200/order/failure');    
        })
    }).catch(err => {
        console.log(err);
        res.redirect('http://localhost:4200/order/failure');
    });

})

router.get("/cancel", (req, res, next) => {
    res.redirect('http://localhost:4200');
})

module.exports = router;