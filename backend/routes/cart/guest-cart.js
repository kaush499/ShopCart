var express = require('express');
var router = express.Router();
var GuestCart = require('../../models/cart/guest-cart.model');

// for getting all products from guest cart
router.get("/:id", (req, res, next) => {
    let guestId = req.params.id;
    GuestCart.getCart(guestId, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).json({ items: result });
    }) ;
})

router.post("/:id", (req, res, next) => {
    let cartItem = {
        guestId: req.params.id,
        productId: req.body.productId,
        quantity: 1
    };

    GuestCart.addNewProduct(cartItem, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).send();
    });
});

router.put("/:id/:prdId", (req, res, next) => {
    let body = {
        productId: req.params.prdId,
        guestId: req.params.id,
        quantity: req.body.quantity
    };

    GuestCart.updateCartItem(body, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).send();
    });
});

router.delete("/:id/:prdId", (req, res, next) => {
    let body = {
        productId: req.params.prdId,
        guestId: req.params.id
    };

    GuestCart.deleteCartItem(body, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).send();
    });
});

router.delete("/:id", (req, res, next) => {
    let guestId = req.params.id;

    GuestCart.deleteCart(guestId, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).send();
    });
});

module.exports = router;