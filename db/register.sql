INSERT INTO users
(email, password)
VALUES
($1, $2);

SELECT user_id, email FROM users WHERE email = $1;