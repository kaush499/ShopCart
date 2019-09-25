var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

var  productsRoutes = require('./routes/products');

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/myEcommerce",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/products', productsRoutes);

module.exports = app;


