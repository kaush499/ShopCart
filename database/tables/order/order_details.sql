DROP TABLE IF EXISTS order_details;
CREATE TABLE order_details (
orderId INTEGER PRIMARY KEY,
productId INTEGER NOT NULL,
quantity INTEGER,
price DECIMAL(7,2),
FOREIGN KEY(orderId) REFERENCES orders(orderId) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY(productId) REFERENCES products(productId) ON UPDATE CASCADE
)