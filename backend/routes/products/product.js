var express = require('express');
var router = express.Router();
var Product = require('../../models/products/product.model');

var checkAuth = require('../../middleware/check-auth');
var checkIsAdmin = require('../../middleware/check-isAdmin');

router.get("", (req, res, next) => {
    Product.getAllProduct((err, result) => {
        if(err){ 
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).json({
                product: result
            });
        }
    });

});

router.post("", checkAuth, checkIsAdmin, (req, res, next) => {
    const prd = req.body.newProduct;
    const newProduct = new Product({
        parentCategoryId: prd.category,
        title: prd.title,
        imagePath: prd.imagePath,
        price: prd.price
    });
    console.log(newProduct);
    Product.addProduct(newProduct, (err, result) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).json({
                productId: result.productId
            })
        }
    });
});

router.put("/:id", checkAuth, checkIsAdmin, (req, res, next) => {
    const updatedPrd = req.body.updatedProduct;
    const prdId = req.params.id;
    Product.updateProduct({updatedPrd, prdId}, (err, result) => {
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

router.delete("/id", checkAuth, checkIsAdmin, (req, res, next) => {
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