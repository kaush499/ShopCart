var express = require('express');
var router = express.Router();
var PaypalService = require('../../../services/payment-methods/paypal.service');

var order;

router.post("", (req, res, next) => {
    order = req.body.order;
    PaypalService.createPayment(order)
    .then(result => {
        res.setHeader('x-redirect', result);
        res.status(200).send();
    }).catch( err => {
        console.log(err);
        res.status(500).send({message: "An error occured while payment. Please try again!"});
    })

});

router.get("/success", (req, res, next) => {

    PaypalService.executePayment(req.query)
    .then(transactionId => {
        res.redirect(`http://localhost:4200/order/success/${transactionId}`);
    }).catch(err => {
        console.log(err);
        res.redirect('http://localhost:4200/order/failure');
    });

})

router.get("/cancel", (req, res, next) => {
    res.redirect('http://localhost:4200');
})

module.exports = router;