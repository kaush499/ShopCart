var connection = require('../../connection/mysql_db');

var UserCart = (cartItem) => {
    this.productId = cartItem.productId;
    this.quantity = cartItem.quantity;
    this.userId = cartItem.userId;
};

UserCart.addNewProduct = (cartItem, response) => {
    let query = `INSERT INTO user_cart SET ?`;

    connection.query(query, cartItem, (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    });
};

UserCart.getCart = (userId, response) => {
    let query = `SELECT productId, title, imagePath, price, quantity
                 FROM user_cart
                 NATURAL JOIN products
                 WHERE userId = ?`;

    connection.query(query, userId, (err, result) => {
        if(err) response(err, null);
        else {
            if(result.length==0 || !result){
                response("No results found", null);
            } else {
                response(null, result);
            }
        }
    });             
};

UserCart.updateCartItem = (body, response) => {
    let query = `UPDATE user_cart SET quantity = ? WHERE userId = ? AND productId = ?`;

    connection.query(query, [body.quantity, body.userId, body.productId], (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    })
};

UserCart.deleteCartItem = (cartItem, response) => {
    let query = `DELETE FROM user_cart WHERE userId = ? AND productId = ?`;

    connection.query(query, [cartItem.userId, cartItem.productId], (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    })
};

module.exports = UserCart;