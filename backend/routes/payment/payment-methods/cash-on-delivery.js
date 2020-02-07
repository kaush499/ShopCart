var express = require('express');
var router = express.Router();
var CashOnDeliveryService = require('../../../services/payment-methods/cash-on-delivery.service');

router.post("", (req, res, next) =>{
    const order = req.body.order;
    res.status(200);
    CashOnDeliveryService.executeOrder(order)
    .then(transactionId => {
        res.setHeader('x-redirect', `http://localhost:4200/order/success/${transactionId}`);
        res.status(200).send();
    }).catch(err => {
        console.log(err);
        res.setHeader('x-redirect', 'http://localhost:4200/order/failure');
        res.status(200).send();
    });
})

module.exports = router;