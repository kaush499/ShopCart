var connection = require('../../connection/mysql_db');

var Payment = {};

Payment.addTransaction = (paymentMethodId, response) => {
    let query = `INSERT INTO transactions(paymentMethodId) VALUES(${paymentMethodId})`;

    connection.query(query, (err1, result1) => {
        if(err1) response(err1, null);
        else {
            let transactionId = result1.insertId;
            query = `SELECT paymentMethodTable FROM payment_method WHERE paymentMethodId = ${paymentMethodId}`;
            connection.query(query, (err2, result2) => {
                if(err2) response(err2, null);
                else {
                    let body = {
                        transactionId: transactionId,
                        tableName: result2[0].paymentMethodTable
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