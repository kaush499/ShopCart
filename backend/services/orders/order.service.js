var Order = require('../../models/orders/order.model');
var Payment = require('../../models/payment/payment.model');

var OrderService = {};

OrderService.createOrder = (body) => {
    return new Promise((resolve, reject) => {
        body.order.items.forEach((item, i) => {
            let userOrder = {
                orderDetails: item,
                order: {
                    transactionId: body.paymentInfo.transactionId,
                    userId: body.order.userId
                },
                paymentInfo: body.paymentInfo.paymentTable,
                tableName: body.paymentInfo.tableName
            };
    
            Order.addOrder(userOrder, (err, result) => {
                if(err) reject(err);
            });

            if(i === body.order.items.length - 1) resolve(true);
        });
    })
    
};

module.exports = OrderService;