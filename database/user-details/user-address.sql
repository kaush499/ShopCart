CREATE TABLE user_address (
    addressId INTEGER AUTO_INCREMENT PRIMARY KEY,
    userId INTEGER,
    name VARCHAR(255),
    mob_number INTEGER(10),
    address TEXT,
    pincode INTEGER(6),
    city VARCHAR(100),
    state VARCHAR(100),
    FOREIGN KEY(userId) REFERENCES user(userId)
)