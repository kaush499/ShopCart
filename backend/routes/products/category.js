var express = require('express');
var router = express.Router();
var Category = require('../../models/products/category.model');

//Retrieving all categories
router.get("", (req, res, next) => {
    Category.getAllCategory((err, results) => {
        console.log("hiomk");
        if(err){
            res.status(400).json({
                message: err
            });
        }else {
            res.status(200).json({
                category: results
            });
        }
    });
});

module.exports = router;