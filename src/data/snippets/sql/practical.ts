export const snippets = [
  "-- inactive users with no orders in the last year\nSELECT u.id, u.email\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\n  AND o.created_at >= date('now', '-1 year')\nWHERE o.id IS NULL;",
  "INSERT INTO scores (user_id, category, language, wpm, accuracy)\nVALUES (?, ?, ?, ?, ?);",
];
