var express = require('express');
var router = express.Router();
var UserCart = require('../../models/cart/user-cart.model');
var Guest = require('../../models/user/guest.model');

// for getting all products from guest cart
router.get("/:id", (req, res, next) => {
    let userId = req.params.id;

    UserCart.getCart(userId, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).json({ items: result });
    });
});

// adding items from guest cart to user cart when the user logins or signups
router.post("/addBunch", (req, res, next) => {
    let cartItems = req.body.items;
    let flag = 0;

    cartItems.forEach((item, i) => {
        UserCart.movePrdFromGuestToUser(item, (err, result) => {
            if(err){
                res.status(400).send(err);
            }
            if(i === cartItems.length - 1) res.status(200).send();
        });
    });
});

// adding a new item to cart
router.post("/:id", (req, res, next) => {
    let cartItem = {
        userId: req.params.id,
        productId: req.body.productId,
        quantity: 1
    };
    console.log("inside add new product");
    UserCart.addNewProduct(cartItem, (err, result) => {
        if(err) res.status(400).send({ err: err });
        else res.status(200).send();
    });
});

// updating the item in the cart
router.put("/:id/:prdId", (req, res, next) => {
    let body = {
        productId: req.params.prdId,
        userId: req.params.id,
        quantity: req.body.quantity
    };
    console.log("inside update product");
    UserCart.updateCartItem(body, (err, result) => {
        if(err) res.status(400).send({ err: err });
        else res.status(200).send();
    });
});

// removing an item from cart
router.delete("/:id/:prdId", (req, res, next) => {
    let body = {
        productId: req.params.prdId,
        userId: req.params.id
    };

    UserCart.deleteCartItem(body, (err, result) => {
        if(err) res.status(400).send({ err: err });
        else res.status(200).send();
    });
});

module.exports = router;