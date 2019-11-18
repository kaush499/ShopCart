var express = require('express');
var router = express.Router();
var UserCart = require('../../models/cart/user-cart.model');

// for getting all products from guest cart
router.get("/:id", (req, res, next) => {
    let userId = req.params.id;

    UserCart.getCart(userId, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).json({ items: result });
    });
})

router.post("/:id", (req, res, next) => {
    let cartItem = {
        userId: req.params.id,
        productId: req.body.productId,
        quantity: 1
    };

    UserCart.addNewProduct(cartItem, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).send();
    });
});

router.put("/:id/:prdId", (req, res, next) => {
    let body = {
        productId: req.params.prdId,
        userId: req.params.id,
        quantity: req.body.quantity
    };

    UserCart.updateCartItem(body, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).send();
    });
});

router.delete("/:id/:prdId", (req, res, next) => {
    let body = {
        productId: req.params.prdId,
        userId: req.params.id
    };

    UserCart.deleteCartItem(body, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).send();
    });
});

module.exports = router;