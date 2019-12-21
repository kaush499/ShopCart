var connection = require('../../connection/mysql_db');

var Payment = {};

Payment.addTransaction = (paymentMethodId, response) => {
    let query = `INSERT INTO transactions(paymentMethodId) VALUES(${paymentMethodId})`;

    connection.query(query, (err, results) => {
        if(err) response(err, null);
        else {
            let transactionId = results[0].insertId;
            query = `SELECT paymentMethodTable FROM payment_method WHERE paymentMethodId = ${paymentMethodId}`;
            connection.query(query, (err, result) => {
                if(err) response(err, null);
                else {
                    let body = {
                        transactionId: transactionId,
                        tableName: result[0].paymentMethodTable
                    };
                    response(null, body);
                }
            })
        }
        
    })
};

Payment.getMethods = (response) => {
    let query = `SELECT paymentMethodName as name, routeName, paymentMethodID as methodId FROM payment_method`;

    connection.query(query, (err, results) => {
        if(err) response(err, null);
        else response(null, results);
    })
}


module.exports = Payment;