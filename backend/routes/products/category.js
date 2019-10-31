var express = require('express');
var router = express.Router();
var Category = require('../../models/products/category.model');

var checkAuth = require('../../middleware/check-auth');
var checkIsAdmin = require('../../middleware/check-isAdmin');

//Retrieving all categories
router.get("", checkAuth, checkIsAdmin, (req, res, next) => {
    Category.getAllCategory((err, results) => {
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