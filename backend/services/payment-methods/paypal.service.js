const paypal_cred = require("../../connection/payments/paypal");
var paypal = require("paypal-rest-sdk");

var paypalService = {};

paypal.configure(paypal_cred);

paypalService.createPayment = function(order) {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://1de5e7b7.ngrok.io/api/payment/paypal/success",
            "cancel_url": "https://1de5e7b7.ngrok.io/api/payment/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": order.items.map(item => {
                    return {
                        name: item.productName,
                        price: item.totalPrice,
                        currency: 'INR',
                        quantity: item.quantity
                    };
                })
            },
            "amount": {
                "currency": "INR",
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

module.exports = paypalService;