var express = require('express');
var router = express.Router();
var Order = require('../../models/orders/order.model');

router.get('/new/:id', (req, res, next) => {
    const transactionId = req.params.id;

    Order.getNewOrders(transactionId, (err, newOrders) => {
        if(err) {
            console.log(err);
            res.status(500).send();
        } else res.status(200).json({orders: newOrders});
    })
})

router.get('/all/:id', (req, res, next) => {
    const userId = req.params.id;

    Order.getUserOrders(userId, (err, orders) => {
        if(err) {
            console.log(err);
            res.status(500).send();
        } else res.status(200).json({orders: orders});
    })
})

module.exports = router;