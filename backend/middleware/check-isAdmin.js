module.exports = (req, res, next) => {
    if(req.userData.isAdmin){
        next();
    }else {
        res.status(401).json({ message: "Auth failed!" });
    }
}