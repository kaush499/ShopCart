DROP TABLE guest_cart;

CREATE TABLE guest_cart (
    quantity INTEGER NOT NULL CHECK(quantity>0),
    productId INTEGER,
    guestId INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (productId) REFERENCES products(productId),
    FOREIGN KEY (guestId) REFERENCES guest(guestId) ON DELETE CASCADE,
    PRIMARY KEY (guestId, productId)
)
