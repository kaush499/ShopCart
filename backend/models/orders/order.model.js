var connection = require('../../connection/mysql_db');

var Order = (order) => {
    this.userId = order.userId,
    this.transactionId = order.transactionId
};

Order.addOrder = (body, response) => {
    let query1 = `INSERT INTO orders SET ?`;

    connection.query(query1, body.order, (err1, result1) => {
        if(err1) response(err1, null);
        else {
            let orderId = result1.insertId;
            const orderDetails = {
                ...body.orderDetails,
                orderId: orderId
            };
            let query2 = `INSERT INTO order_details SET ?`;
            console.log(orderDetails);
            connection.query(query2, orderDetails, (err2, result2) => {
                if(err2) response(err2, null);
                else {
                    let query3 = `INSERT INTO ${body.tableName} SET ?`;
                    const paymentInfo = {
                        ...body.paymentInfo,
                        orderId: orderId
                    }
                    console.log(paymentInfo);
                    connection.query(query3, paymentInfo, (err3, result3) => {
                        if(err3) response(err3, null);
                        else response(null, true);
                    })
                }
            })
        }
    })
}

Order.getUserOrders = (userId, response) => {
    let query = `SELECT o.*, od.*, p.title, p.imagePath, pm.paymentMethodName as paymentMode 
                 FROM orders as o
                 NATURAL JOIN order_details as od
                 NATURAL JOIN transactions as t
                 NATURAL JOIN payment_method as pm
                 NATURAL JOIN products as p
                 WHERE o.userId = ?`;

    connection.query(query, userId, (err, result) => {
        if(err) response(err, null);
        else response(null, result);
    });             
};

Order.getNewOrders = (transactionId, response) => {
    let query = `SELECT o.*, od.*, p.title, p.imagePath, pm.paymentMethodName as paymentMode 
                FROM orders as o
                NATURAL JOIN order_details as od
                NATURAL JOIN transactions as t
                NATURAL JOIN payment_method as pm
                NATURAL JOIN products as p
                WHERE o.transactionId = ?`

    connection.query(query, transactionId, (err, result) => {
        if(err) response(err, null);
        else response(null, result);
    });            
}

module.exports = Order;