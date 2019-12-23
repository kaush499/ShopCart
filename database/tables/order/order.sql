DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
    orderId INTEGER PRIMARY KEY AUTO_INCREMENT,
    userId INTEGER NOT NULL,
    billDate TIMESTAMP DEFAULT NOW(),
    shipDate DATETIME,
    deliveryStatus BOOLEAN DEFAULT false,
    transactionId INTEGER NOT NULL,
    name VARCHAR(255),
    mobNumber VARCHAR(10),
    address TEXT,
    pincode VARCHAR(6),
    city VARCHAR(100),
    state VARCHAR(100),
    FOREIGN KEY(userId) REFERENCES user(userId) ON DELETE CASCADE,
    FOREIGN KEY(transactionId) REFERENCES transactions(transactionId) ON DELETE CASCADE ON UPDATE CASCADE
);