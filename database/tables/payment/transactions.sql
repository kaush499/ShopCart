DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
    transactionId INTEGER PRIMARY KEY AUTO_INCREMENT,
    paymentMethodId INTEGER,
    transactionDate TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(paymentMethodId) REFERENCES payment_method(paymentMethodId) ON UPDATE CASCADE
);