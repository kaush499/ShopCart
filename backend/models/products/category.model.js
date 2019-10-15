var connection = require('../../connection/mysql_db');

var Category = (category) => {
    this.categoryName = category.name;
};

Category.getAllCategory = (response) => {
    let query = "SELECT * FROM category ORDER BY categoryName";
    connection.query(query, (err, result) => {
        if(err){
            console.log(err);
            response(err, null);
        } else {
            if(result.length==0 || !result){
                response("No results found", null);
            } else {
                response(null, result);
            }
        }
    });
};

module.exports = Category;