var express = require('express');
var router = express.Router();

// const Product = require('../models/product.model');

// router.get("/", (req, res, next) => {
//     Product.find().then(products => {
//         res.status(200).json({
//             message: "products fetched successfully!",
//             products: products
//         });
//     });
// });

// router.post("/new", (req, res, next) => {
//     const newProduct = new Product({
//         category: req.body.category,
//         title: req.body.title,
//         imageUrl: req.body.imageUrl,
//         price: req.body.price,
//         addedToCart: req.body.addedToCart
//     });

//     newProduct.save().then(createdProduct => {
//         res.status(201).json({
//             message: "Post added successfully",
//             productId: createdProduct._id
//           });
//     });
// });

// router.put("/:id", (req, res, next) => {
//     const updatedProduct = new Product({
//         _id: req.params.id,
//         category: req.body.category,
//         title: req.body.title,
//         imageUrl: req.body.imageUrl,
//         price: req.body.price,
//         addedToCart: req.body.addedToCart
//     });

//     Product.updateOne({ _id: req.params.id }, updatedProduct).then(result => {
//         res.status(200).json({ message: "Update successful!" });
//     });
// });

// router.delete("/:id", (req, res, next) => {
//     Product.deleteOne({ _id: req.params.id }).then(result => {
//         console.log(result);
//         res.status(200).json({ message: "Post deleted!" });
//     });
// });

module.exports = router;

