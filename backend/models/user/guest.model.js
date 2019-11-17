var connection = require('../../connection/mysql_db');

var Guest = (guest) => {
    this.guestId = guest.guestId;
};

Guest.createNewGuest = (response) => {
    let query = `INSERT INTO guest(expiration_at) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY))`;

    connection.query(query, (err, result) => {
        if(err) response(err, null);
        else {
            console.log(result);
            let guestId = result.insertId;
            response(null, guestId);
        }
    });
};

Guest.deleteGuest = (guestId, response) => {
    let query = `DELETE FROM guest WHERE guestId = ?`;

    connection.query(query, guestId, (err, result) => {
        if(err) response(err, null);
        else response(null, true);
    })
}

module.exports = Guest;

