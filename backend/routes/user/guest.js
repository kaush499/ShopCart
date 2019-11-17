var express = require('express');
var router = express.Router();
var Guest = require('../../models/user/guest.model');

router.get('', (req, res, next) => {
    Guest.createNewGuest((err, guestId) => {
        if(err) {
            res.status(500).json({
                err: err
            });
        } else{
            console.log(guestId);
            res.status(200).json({
                guestId: guestId
            });
        }
    });
});

module.exports = router;