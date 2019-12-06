var connection = require('../../connection/mysql_db');

var Product = function(product){
    this.parentCategoryId = product.parentCategoryId;
    this.title = product.title;
    this.imagePath = product.imagePath;
    this.price = product.price;
};

Product.addProduct = (newProduct, response) => {
    let query = "INSERT INTO products SET ?";
    connection.query(query, newProduct, (err, result) => {
        if(err) response(err, null);
        else {
           let productId = result.insertId;
           response(null, productId); 
        }
    });
};

Product.getAllProduct = (response) => {
    let query = `SELECT  productId, title, imagePath, price, categoryName, categoryId
                 FROM products 
                 INNER JOIN category ON (products.parentCategoryId = category.categoryId)`;
    connection.query(query, (err, result) => {
        if(err) response(err, null);
        else response(null, result);
    });                          
};

Product.getProduct = (prdId, response) => {
    let query = `SELECT  productId, title, imagePath, price, categoryName, categoryId
                 FROM products 
                 INNER JOIN category ON (products.parentCategoryId = category.categoryId)
                 WHERE productId = ?`;

    connection.query(query, prdId, (err, result) => {
        if(err){
            response(err, null);
        }else {
            if(result.length==0 || !result){
                response("No results found", null);
            } else {
                let product = result[0];
                response(null, product);
            }
        }
    })            
}

Product.updateProduct = (body, response) => {
    let query = `UPDATE products SET ? WHERE productId = ?`;
    connection.query(query, [body.updatedPrd, body.prdId], (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    })
}

Product.deleteProduct = (prdId, response) => {
    let query = `DELETE FROM products WHERE productId = ?`;
    connection.query(query, prdId, (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    })
}

module.exports = Product;
