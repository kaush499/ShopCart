DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    orderId INTEGER PRIMARY KEY AUTO_INCREMENT,
    userId INTEGER NOT NULL,
    billDate TIMESTAMP DEFAULT NOW(),
    shipDate DATETIME,
    deliveryStatus BOOLEAN DEFAULT false,
    shippingId INTEGER NOT NULL,
    transactionId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE CASCADE,
    FOREIGN KEY(transactionId) REFERENCES transactions(transactionId) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(shippingId) REFERENCES user_address(addressId) 
);