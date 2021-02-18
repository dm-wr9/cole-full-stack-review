DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS cart;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255)
);
CREATE TABLE product (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price INTEGER,
    image VARCHAR(255)
);
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    product_id INT REFERENCES product(product_id)
);

--! DUMMY DATA BELOW

INSERT INTO users (
    email, password
)
VALUES
(
    'cole.finlayson@devmounta.in',
    'shrekalicious'
),
(
    'kylealvarez@gmail.com',
    'pleasestoptalkingaboutshrek'
);

INSERT INTO product (
    name, price
) 
VALUES
(
    'banana', 10
),
(
    '5.10 rock climbing shoes', 200
),
(
    '"Shrek" on DVD', 1000
);

INSERT INTO cart (
    user_id, product_id
)
VALUES
--! 1 on the left is me, 2 on the left is you, 1 on the right is banana, 2 is shoes, 3 is shrek
(1,3),
(1,3),
(1,3),
(1,2),
(1,1),
(2,3),
(2,2),
(2,1),
(2,1),
(2,1);

--! dummy data above