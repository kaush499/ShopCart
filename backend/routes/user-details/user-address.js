var express = require('express');
var router = express.Router();
var UserAddress = require('../../models/user-details/user-address.model');

var checkAuth = require('../../middleware/check-auth');

router.get("/:id", checkAuth, (req, res, next) => {
    let userId = req.params.id;

    UserAddress.getAllAddress(userId, (err, result) => {
        if(err) res.status(400).send(err);
        else res.status(200).json({ address: result });
    });
});

router.post("/:id", checkAuth, (req, res, next) => {
    let userId = req.params.id;
    console.log("req");
    const address = {
        ...req.body.address,
        userId: userId
    };

    UserAddress.addAddress(address, (err, result) => {
        if(err) res.status(400).send(err);
        else res.status(200).json({ addressId: result });
    });
});

router.put("/:id/:addrId", checkAuth, (req, res, next) => {
    console.log("inside");
    let userId = req.params.id;
    let addressId = req.params.addrId;

    let body = {
        userId: userId,
        addressId: addressId,
        address: req.body.address
    };

    UserAddress.updateAddress(body, (err, result) => {
        if(err) res.status(400).send(err);
        else res.status(200).json();
    });
});

router.delete("/addrId", checkAuth, (req, res, next) => {
    let addressId = req.params.addrId;

    UserAddress.deleteAddress(addressId, (err, result) => {
        if(err) res.status(400).send(err);
        else res.status(200).json();
    })
})

module.exports = router;