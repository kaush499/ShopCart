DROP TABLE IF EXISTS cash_on_delivery;
CREATE TABLE cash_on_delivery (
    orderID INTEGER PRIMARY KEY,
    payment_date INTEGER,
    FOREIGN KEY(orderID) REFERENCES orders(orderID) ON DELETE CASCADE ON UPDATE CASCADE
)