var connection = require('../../connection/mysql_db');

var GuestCart = (cartItem) => {
    this.productId = cartItem.productId;
    this.quantity = cartItem.quantity;
};

GuestCart.addNewProduct = (cartItem, response) => {
    let query = `INSERT INTO guest_cart SET ?`;

    connection.query(query, cartItem, (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    });
};

GuestCart.getCart = (guestId, response) => {
    let query = `SELECT products.productId, title, imagePath, price, quantity
                 FROM guest_cart
                 INNER JOIN products ON(products.productId = guest_cart.productId)
                 WHERE guestId = ?`;

    connection.query(query, [guestId], (err, result) => {
        if(err) response(err, null);
        else response(null, result);
    });             
};

GuestCart.updateCartItem = (body, response) => {
    let query = `UPDATE guest_cart SET quantity = ? WHERE guestId = ? AND productId = ?`;

    connection.query(query, [body.quantity, body.guestId, body.productId], (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    })
};

GuestCart.deleteCartItem = (cartItem, response) => {
    let query = `DELETE FROM guest_cart WHERE guestId = ? AND productId = ?`;

    connection.query(query, [cartItem.guestId, cartItem.productId], (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    })
};

GuestCart.deleteCart = (guestId, response) => {
    let query = `DELETE FROM guest_cart WHERE guestId = ?`;

    connection.query(query, cartItem.guestId, (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    })
}

module.exports = GuestCart;