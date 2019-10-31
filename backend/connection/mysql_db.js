var mysql = require('mysql');

// connecting to mysql server

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'qwerty1234',
    database : 'my_store'
  });

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected to database!");
}); 

module.exports = connection;