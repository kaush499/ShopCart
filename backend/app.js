var express = require('express');
var bodyParser = require("body-parser");

var app = express();

var  productRoutes = require('./routes/products');
var userRoutes = require('./routes/user');
var categoryRoutes = require('./routes/products/category');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/products/category', categoryRoutes);

module.exports = app;


