var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');

var secret = require("../connection/secret_value");


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        User.createUser(newUser, (err, userId) => {
            if(err){
                res.status(500).json({
                    error: err
                });
            } else {
                const token = jwt.sign(
                    { email: newUser.email, userId: userId },
                    secret,
                    { expiresIn: "1h" }
                );
                res.status(200).json({
                    message: "User created!",
                    token: token,
                    expiresIn: 3600
                });
            } 
        });
    })
    
});

router.post('/login', (req, res, next) => {
    User.findUser(req.body.email, (err, user) => {
        if(err) {
            res.status(401).json({
                message: "Auth failed"
            });
        }else {
            let matchPassword = bcrypt.compare(req.body.password, user.password);
            if(!matchPassword){
                res.status(401).json({
                    message: "Auth failed"
                });
            }
            const token = jwt.sign(
                { email: user.email, userId: user.id },
                secret,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                name: user.name,
                expiresIn: 3600
            });
        }
    })
})


module.exports = router;