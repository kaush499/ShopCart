var connection = require('../../connection/mysql_db');

var Order = (order) => {
    this.userId = order.userId,
    this.transactionId = order.transactionId
};

Order.addOrder = (body, response) => {
    let query = `INSERT INTO orders SET ?`;

    connection.query(query, body.order, (err1, result1) => {
        if(err1) response(err1, null);
        else {
            let orderId = result1.insertId;
            const orderDetails = {
                ...body.orderDetails,
                orderId: orderId
            };
            query = `INSERT INTO orders SET ?`;

            connection.query(query, orderDetails, (err2, result2) => {
                if(err2) response(err2, null);
                else {
                    query = `INSERT INTO ${body.tableName} SET ?`;
                    const paymentInfo = {
                        ...body.paymentInfo,
                        orderId: orderId
                    }
                    connection.query(query, paymentInfo, (err3, result3) => {
                        if(err3) response(err3, null);
                        else response(null, true);
                    })
                }
            })
        }
    })
}

module.exports = Order;