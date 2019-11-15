var connection = require('../../connection/mysql_db');


var GuestCart = (cartItem) => {
    this.productId = cartItem.productId;
    this.quantity = cartItem.quantity;
};

GuestCart.createNewCart = (cartItem, response) => {
    let query = `INSERT INTO guest_cart SET ?`;

    connection.query(query, cartItem, (err, results) => {
        if(err) response(err, null);
        else {
            let guestCartId = results.insertedId;
            response(null, guestCartId);
        }
    })
}