DROP TABLE products;

CREATE TABLE products (
    productId INTEGER AUTO_INCREMENT PRIMARY KEY,
    parentCategoryId INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    imagePath VARCHAR(255) NOT NULL,
    ownerId INTEGER NOT NULL,
    price DECIMAL(7,2) NOT NULL CHECK(price > 0.00),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (parentCategoryId) REFERENCES category(categoryId),
    FOREIGN KEY (ownerId) REFERENCES user(userId) ON DELETE CASCADE
);
