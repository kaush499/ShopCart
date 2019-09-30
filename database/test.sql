DROP TABLE user;

CREATE TABLE user (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

insert into user (name, email, password)
values ("kaush", "kau@gmail.com", "123456"),
("kau", "kaushi@gmail.com", "123456789");