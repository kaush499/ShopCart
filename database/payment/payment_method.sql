DROP TABLE IF EXISTS payment_method;
CREATE TABLE payment_method (
    paymentMethodID INTEGER AUTO_INCREMENT PRIMARY KEY,
    paymentMethodName VARCHAR(255) NOT NULL,
    paymentMethodTable VARCHAR(255) NULL NULL,
    routeName VARCHAR(255) NULL NULL
);

INSERT INTO payment_method(paymentMethodName, paymentMethodTable, routeName) 
VALUES ("cash on delivery", "cash_on_delivery", "cash-on-delivery"), ("paypal", "paypal", "paypal");