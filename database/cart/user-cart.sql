DROP TABLE user_cart;

CREATE TABLE user_cart (
    quantity INTEGER NOT NULL CHECK(quantity>0),
    productId INTEGER,
    userId INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (productId) REFERENCES products(productId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE,
    PRIMARY KEY (userId, productId)
)
