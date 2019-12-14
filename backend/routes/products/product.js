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

// router.post("/some", (req, res) => {
//     console.log("sgwg");
//     res.redirect("http://localhost:4200");
// })

router.get("/:id", (req, res, next) => {
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