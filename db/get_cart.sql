SELECT c.cart_id, u.email, p.name, p.price FROM users u
JOIN cart c ON u.user_id = c.user_id
JOIN product p ON c.product_id = p.product_id
WHERE u.user_id = $1;