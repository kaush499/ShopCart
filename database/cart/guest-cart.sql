-- DROP TABLE guest_cart;

-- CREATE TABLE guest_cart (
--     quantity INTEGER NOT NULL CHECK(quantity>0),
--     productId INTEGER,
--     guestId INTEGER AUTO_INCREMENT,
--     created_at TIMESTAMP DEFAULT NOW(),
--     FOREIGN KEY (productId) REFERENCES products(productId),
--     PRIMARY KEY (guestId, productId)
-- )

insert into guest_cart(quantity, productId)
values (2, 2);