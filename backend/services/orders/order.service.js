var Order = require('../../models/orders/order.model');

var OrderService = {};

OrderService.createOrder = (body) => {
    return new Promise((resolve, reject) => {
        body.order.items.forEach((item, i) => {
            let userOrder = {
                orderDetails: item,
                order: {
                    transactionId: body.paymentInfo.transactionId,
                    userId: body.order.userId,
                    name: body.order.shipping.name,
                    mobNumber: body.order.shipping.mob_number,
                    city: body.order.shipping.city,
                    state: body.order.shipping.state,
                    address: body.order.shipping.address,
                    pincode: body.order.shipping.pincode
                },
                paymentInfo: body.paymentInfo.paymentTable,
                tableName: body.paymentInfo.tableName
            };
    
            Order.addOrder(userOrder, (err, result) => {
                if(err) reject(err);
                else{
                    if(i === body.order.items.length - 1) resolve(true);
                }
            });
        });
    })
    
};

module.exports = OrderService;