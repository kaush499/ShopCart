
CREATE TABLE payment_method (
    paymentMethodID INTEGER AUTO_INCREMENT PRIMARY KEY,
    paymentMethodName VARCHAR(255) NOT NULL
);

INSERT INTO payment_method(paymentMethodName) 
VALUES ("cash on delivery"), ("paypal");