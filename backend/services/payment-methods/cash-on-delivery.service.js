var Payment = require('../../models/payment/payment.model');
var OrderService = require('../../services/orders/order.service');

var CashOnDeliveryService = {};

CashOnDeliveryService.executeOrder = (order) => {
    return new Promise((resolve, reject) => {
        Payment.addTransaction(order.paymentId, (err, result) => {
                if(err) reject(err);
                else {
                    const paymentInfo = {
                        paymentTable: {},
                        ...result
                    };
                    OrderService.createOrder({order: order, paymentInfo: paymentInfo})
                    .then(val => {
                        console.log(val);
                        resolve(paymentInfo.transactionId);
                    })
                    .catch(error => {
                        reject(error);  
                    })
                }
        })
    })
    
}

module.exports = CashOnDeliveryService;