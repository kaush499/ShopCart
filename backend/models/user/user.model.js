var connection = require('../../connection/mysql_db');

var User = (user) => {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
};

//Creating a new user
User.createUser = (newUser, response) => {
    let query = "INSERT INTO user SET ?";
    try{
        connection.query(query, [newUser], (err, results) => {
            if(err){
                response({err: err, code: 400}, null);
            } else {
                let userId = results.insertId;
                response(null, userId);
            }
            
        });
    } catch(err) {
        response({err: err, code: 500}, null);
    }
    
};

//verifying a user (by finding it in database)
User.findUser = (userEmail, response) => {
    let query = "SELECT * FROM user WHERE email = ?";

    try{
        connection.query(query, userEmail, (err, result) => {
            if(err){
                response({err: err, code: 400}, null);
            } else {
                if(result.length==0 || !result){
                    response("No results found", null);
                } else {
                    const user = result[0];
                    response(null, user);
                }
            }
        });
    }catch(err){
        response({err: err, code: 500}, null);
    }
    
};

module.exports = User;

