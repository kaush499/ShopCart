const paypal_cred = require("../../connection/payments/paypal");
var paypal = require("paypal-rest-sdk");

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
            "return_url": "https://675d1f78.ngrok.io/api/payment/paypal/success",
            "cancel_url": "https://675d1f78.ngrok.io/api/payment/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": order.items.map(item => {
                    return {
                        name: item.productName,
                        price: item.totalPrice,
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
                console.log(error);
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
    console.log(cusOrder);
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
                reject("fff");
            }else {
                console.log(JSON.stringify(payment));
                resolve("success");
            }
        })
    })
    
}

module.exports = paypalService;