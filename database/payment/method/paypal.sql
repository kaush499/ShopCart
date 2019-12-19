CREATE TABLE paypal (
    orderID INTEGER PRIMARY KEY,
    payment_date TIMESTAMP DEFAULT NOW(),
    payerID VARCHAR(255), 
    paymentID VARCHAR(255),
    FOREIGN KEY(orderID) REFERENCES orders(orderID)
);