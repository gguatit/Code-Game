export const snippets = [
  "SELECT id, name FROM users WHERE active = 1;",
  "INSERT INTO orders (user_id, total) VALUES (42, 99.90);",
  "UPDATE products SET price = price * 0.9 WHERE stock > 100;",
  "DELETE FROM sessions WHERE expires_at < NOW();",
  "SELECT COUNT(*) AS total FROM logs GROUP BY level;",
  "CREATE INDEX idx_users_email ON users(email);",
  "ALTER TABLE posts ADD COLUMN published_at TIMESTAMP;",
  "JOIN orders o ON o.user_id = u.id",
  "HAVING COUNT(*) > 5 ORDER BY 2 DESC",
  "EXPLAIN ANALYZE SELECT * FROM events LIMIT 10;",
];
