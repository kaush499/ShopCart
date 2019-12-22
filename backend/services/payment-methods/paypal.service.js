const paypal_cred = require("../../connection/payments/paypal");
var paypal = require("paypal-rest-sdk");
var Payment = require('../../models/payment/payment.model');
var OrderService = require('../orders/order.service');

var paypalService = {};

paypal.configure(paypal_cred);

paypalService.createPayment = function(order) {
    cusOrder = order;
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://04f59e1f.ngrok.io/payment/paypal/success",
            "cancel_url": "https://04f59e1f.ngrok.io/payment/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": order.items.map(item => {
                    return {
                        name: item.productName,
                        price: item.price,
                        currency: 'USD',
                        quantity: item.quantity
                    };
                })
            },
            "amount": {
                "currency": "USD",
                "total": order.totalAmount
            },
            "description": "This is the payment description."
        }]
    };

    return new Promise(function(resolve, reject) {
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.log(JSON.stringify(error, null, 2));
                reject("error");
            } else {
                console.log("Create Payment Response");
                //console.log(payment);
                let redirectLink = payment.links.find(link => link.rel == "approval_url");
                let redirectUrl = redirectLink.href;
                resolve(redirectUrl);
            }
        });
    })
}

paypalService.executePayment = function(query) {
    const payerId = query.PayerID;
    const paymentId = query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": cusOrder.totalAmount
            }
        }]
    }
    
    return new Promise(function(resolve, reject) {
        paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
            if(error) {
                console.log(error);
                reject("error");
            }else {
                Payment.addTransaction(cusOrder.paymentId, (err, result) => {
                    if(err) reject(err);
                    else {
                        const paymentInfo = {
                            paymentTable: {
                                payerId: payerId,
                                paymentId: paymentId
                            },
                            ...result
                        };
                        OrderService.createOrder({order: cusOrder, paymentInfo: paymentInfo})
                        .then(val => {
                            console.log(val);
                            resolve(paymentInfo.transactionId);
                        })
                        .catch(error => {
                            reject(error);  
                        })
                    }
                })
            }
        })
    })
    
}

module.exports = paypalService;