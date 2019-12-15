var express = require('express');
var router = express.Router();
var paypalRoutes = require('./payment-methods/paypal');

router.use('/paypal', paypalRoutes);

module.exports = router;

