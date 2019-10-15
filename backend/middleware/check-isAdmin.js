module.exports = (req, res, next) => {
    if(req.body.userData.isAdmin == 1 || req.body.userData.isAdmin){
        next();
    }else {
        res.status(401).json({ message: "Auth failed!" });
    }
}