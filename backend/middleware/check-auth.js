const jwt = require('jsonwebtoken');
const secret = require('../connection/secret_value');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const userData = jwt.verify(token, secret);
        req.userData = userData;
        next();
    } catch (err) {
        res.status(401).json({ message: "Auth failed!" });
    } 
}