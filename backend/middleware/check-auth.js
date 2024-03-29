const jwt = require('jsonwebtoken');
const secret = require('../connection/secret_value');

//For checking if a user is Authenticated (having a valid Token)

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            console.log(err);
            res.status(401).json({ message: "Auth failed!" });
        }else {
            req.body.userData = decoded;
            next();
        }
    });
}