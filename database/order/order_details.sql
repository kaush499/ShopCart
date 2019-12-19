CREATE TABLE order_details (
orderId INTEGER PRIMARY KEY,
productId INTEGER NOT NULL,
quantity INTEGER,
total_amount DECIMAL(5,2),
FOREIGN KEY(orderID) REFERENCES orders(orderID),
FOREIGN KEY(productId) REFERENCES products(productId)
)