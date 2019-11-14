var express = require('express');
var router = express.Router();
var Product = require('../../models/products/product.model');


// For getting all products from database
router.get("", (req, res, next) => {
    Product.getAllProduct((err, result) => {
        if(err){ 
            
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).json({
                products: result
            });
        }
    });

});

router.get("/:id", (req, res, next) => {
    console.log("hiiii");
    let prdId = req.params.id;
    Product.getProduct(prdId, (err, result) => {
        if(err){ 
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).json({
                product: result
            });
        }
    })
})

module.exports = router;