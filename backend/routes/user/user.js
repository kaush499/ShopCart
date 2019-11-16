var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('../../models/user/user.model');
var jwt = require('jsonwebtoken');

var secret = require("../../connection/secret_value");

//creating a new User
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hash
        };
        User.createUser(newUser, (err, userId) => {
            if(err){
                res.status(500).json({
                    error: err
                });
            } else {
                const token = jwt.sign(
                    { email: newUser.email, isAdmin: false },
                    secret,
                    { expiresIn: "1h" }
                );
                res.status(200).json({
                    message: "User created!",
                    token: token,
                    userId: userId,
                    expiresIn: 3600
                });
            } 
        });
    })
    
});

//Authenticating a user
router.post('/login', (req, res, next) => {
    User.findUser(req.body.email, (err, user) => {
        if(err) {
            res.status(401).json({
                message: "Auth failed"
            });
        }else {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if(err || !same){
                    res.status(401).json({
                        message: "Auth failed"
                    });
                } else{
                    const token = jwt.sign(
                        { email: user.email, isAdmin: user.isAdmin },
                        secret,
                        { expiresIn: "1h" }
                    );
                    res.status(200).json({
                        token: token,
                        userId: user.userId,
                        name: user.name,
                        isAdmin: user.isAdmin,
                        expiresIn: 3600
                    });
                }
            });
        }
    })
})


module.exports = router;