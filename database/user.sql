DROP TABLE user;

CREATE TABLE user (
    userId INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT 0,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Admin : name = kau and email=kau@123.com and password=123456