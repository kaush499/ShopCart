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

router.delete('/:id', (req, res, next) => {
    let guestId = req.params.id;
    Guest.deleteGuest(guestId, (err, result) => {
        if(err) res.status(500).send({ err: err });
        else res.status(200).send();
    })
})

module.exports = router;