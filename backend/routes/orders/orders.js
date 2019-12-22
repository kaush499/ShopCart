var express = require('express');
var router = express.Router();
var userOrderRoutes = require('./user-orders');

router.use('/user', userOrderRoutes);

module.exports = router;