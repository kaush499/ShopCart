var connection = require('../../connection/mysql_db');

// just a model for declaring this variable
var UserAddress = (address) => {
    this.name = address.name;
    this.mob_number = address.mob_number;
};

// retrieving all the addresses of a user
UserAddress.getAllAddress = (userId, response) => {
    let query = `SELECT * FROM user_address WHERE userId = ?`;

    connection.query(query, userId, (err, result) => {
        if(err) response(err, null);
        else response(null, result);
    });
};

// adding a address to a user
UserAddress.addAddress = (address, response) => {
    let query = `INSERT INTO user_address SET ?`;

    connection.query(query, address, (err, result) => {
        if(err) {
            response(err, null);
            console.log(err);
        }
        else {
            let addressId = result.insertId;
            response(null, addressId);
        }
    })
}

// updating an address of the user
UserAddress.updateAddress = (body, response) => {
    let query = `UPDATE user_address SET ? WHERE addressId = ? AND userId = ?`;

    connection.query(query, [body.address, body.addressId, body.userId], (err, result) => {
        if(err){
            response(err, null);
            console.log(err);
        } 
        else response(null, true);
    });
};

// deleting an user address
UserAddress.deleteAddress = (addressId, response) => {
    let query = `DELETE FROM user_address WHERE addressId = ?`;

    connection.query(query, addressId, (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    })
}

module.exports = UserAddress;