var express = require('express');
var bodyParser = require("body-parser");

var app = express();

var productRoutes = require('./routes/products/product');
var userRoutes = require('./routes/user/user');
var categoryRoutes = require('./routes/products/category');
var adminProductRoutes = require('./routes/admin/admin-products');
var guestRoutes = require('./routes/user/guest');
var guestCartRoutes = require('./routes/cart/guest-cart');
var userCartRoutes = require('./routes/cart/user-cart');
var userAddressRoutes = require('./routes/user-details/user-address');
var paymentRoutes = require('./routes/payment/payment');
var orderRoutes = require("./routes/orders/orders");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-redirect"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    "x-redirect"
  )
  next();
});

app.use('/admin/products', adminProductRoutes);
app.use('/products/category', categoryRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/guest', guestRoutes);
app.use('/guest-cart', guestCartRoutes);
app.use('/user-cart', userCartRoutes);
app.use('/user-address', userAddressRoutes);
app.use('/payment', paymentRoutes);
app.use('/orsers', orderRoutes);

module.exports = app;


