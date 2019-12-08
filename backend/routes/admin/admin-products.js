var express = require('express');
var router = express.Router();
var Product = require('../../models/products/product.model');

var checkAuth = require('../../middleware/check-auth');
var checkIsAdmin = require('../../middleware/check-isAdmin');


// For getting all products from database
router.get("", checkAuth, checkIsAdmin, (req, res, next) => {
    Product.getAllProduct((err, result) => {
        if(err) res.status(400).send({ message: err });
        else res.status(200).json({ product: result });
    });

});

//For getting a specific product based on its id
router.get("/:id", checkAuth, checkIsAdmin, (req, res, next) => {
    const prdId = req.params.id;
    console.log("inside");
    Product.getProduct(prdId, (err, result) => {
        if(err) res.status(400).send(err);
        else res.status(200).json({product: result});
    })
})

//For adding a product into the database
router.post("", checkAuth, checkIsAdmin, (req, res, next) => {
    const prd = req.body.newProduct;
    const newProduct = new Product({
        parentCategoryId: prd.category,
        title: prd.title,
        imagePath: prd.imagePath,
        price: prd.price
    });
    Product.addProduct(newProduct, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).json({
                productId: result
            })
        }
    });
});

//For updating a product 
router.put("/:id", checkAuth, checkIsAdmin, (req, res, next) => {
    const prd = req.body.updatedProduct;
    const updatedPrd = {
        parentCategoryId: prd.category,
        title: prd.title,
        imagePath: prd.imagePath,
        price: prd.price
    };
    const prdId = req.params.id;
    const body = {
        updatedPrd: updatedPrd,
        prdId: prdId
    };
    Product.updateProduct(body, (err, result) => {
        if(err) {
            res.status(500).send({
                message: err
            });
        }else {
            res.status(200).send({
                message: "updated successfully"
            });
        }
    });
});

//for deleting a product from database
router.delete("/:id", checkAuth, checkIsAdmin, (req, res, next) => {
    const prdId = req.params.id;
    Product.deleteProduct(prdId, (err, result) => {
        if(err) {
            res.status(500).send({
                message: err
            });
        }else {
            res.status(200).send({
                message: "deleted successfully"
            });
        }
    })
})

module.exports = router;