var express = require('express');
var router = express.Router();
var Category = require('../../models/products/Category.model');

var checkAuth = require('../../middleware/check-auth');
var checkIsAdmin = require('../../middleware/check-isAdmin');

router.get("/all", checkAuth, checkIsAdmin, (req, res, next) => {
    Category.getAllCategory((err, results) => {
        if(err){
            res.status(400).json({
                message: err
            });
        }else {
            res.status(200).json({
                category: results.slice()
            });
        }
    });
});

module.exports = router;