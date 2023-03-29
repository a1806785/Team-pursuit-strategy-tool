CREATE DATABASE cycin;

USE cycin;

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(40),
    email VARCHAR(100),
    password VARCHAR(256),
    code VARCHAR(40),
    type VARCHAR(10),
    PRIMARY KEY (User_ID)
);

INSERT INTO users (username, email, password, code, type)
VALUES ('admin', 'admin@gmail.com', 'admin', 'admin', 'admin');

DELETE FROM users WHERE username = ?;