var postmark = require('postmark');

var serverToken = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
var client = new postmark.ServerClient(serverToken);

var Emails = {};

Emails.sendOrderPlacedEmail = (order) => {
    //console.log(order, null, 2);
    var op = {
        from: "201701075@daiict.ac.in",
        to: "201701075@daiict.ac.in",
        templateId: 16118863,
        templateModel: {
            name: "kaush",
            product_name: "KS Store",
            date: "1st feb",
            receipt_details: order.items.map(item => {
                return {
                    description: `Tshirt (${item.quantity})`,
                    amount: `Rs ${item.price}`
                };
            }),
            total: `Rs ${order.totalAmount}`
        }
    };
    console.log(JSON.stringify(op.templateModel, null, 2));
    var options = new postmark.TemplatedMessage(op.from, op.templateId, op.templateModel, op.to);
    console.log( JSON.stringify(options, null, 2));
    
    client.sendEmailWithTemplate(options, (err, result) => {
        console.log(result);
        if(err) {
            console.log(err);
        }else {
            console.log(result);
        }
    })
}



module.exports = Emails;