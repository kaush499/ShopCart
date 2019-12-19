DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
    transactionId INTEGER PRIMARY KEY AUTO_INCREMENT,
    paymentMode VARCHAR(255),
    date TIMESTAMP DEFAULT NOW()
);