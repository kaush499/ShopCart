DROP TABLE category;

CREATE TABLE category (
    categoryId INTEGER AUTO_INCREMENT PRIMARY KEY,
    categoryName VARCHAR(255) NOT NULL
);

INSERT INTO category(categoryName) 
VALUES ("Mobile"), ("Laptop"), ("Clothes"), ("Watches"), ("TV");