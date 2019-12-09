-- CREATE TABLE user_address (
--     addressId INTEGER AUTO_INCREMENT PRIMARY KEY,
--     userId INTEGER,
--     name VARCHAR(255),
--     mob_number INTEGER(10),
--     address TEXT,
--     pincode INTEGER(6),
--     city VARCHAR(100),
--     state VARCHAR(100),
--     FOREIGN KEY(userId) REFERENCES user(userId)
-- )

insert into user_address(userId, name, mob_number, address, pincode, city, state)
-- values(2, "ks sh", 1212121212, "any thing you want", 400000, "city", "maharashtra");
values(2, "ss verma", 1212121298, "any addresss test", 400030, "mumbai", "maharashtra");