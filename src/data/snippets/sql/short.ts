export const snippets = [
  'SELECT name, COUNT(*) FROM orders GROUP BY name;',
  "SELECT * FROM users WHERE email LIKE '%@%.com';",
  'DELETE FROM sessions WHERE expires_at < NOW();',
  "UPDATE scores SET wpm = 0 WHERE accuracy < 0.5;",
  "INSERT INTO users (email) VALUES ('a@b.c');",
  "CREATE INDEX idx_board ON scores (category, language);",
];
