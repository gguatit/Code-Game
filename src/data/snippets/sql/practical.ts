export const snippets = [
  "SELECT word, COUNT(*) AS n\nFROM (\n  SELECT unnest(string_to_array(lower('the quick brown fox jumps over the lazy dog'), ' ')) AS word\n) words\nGROUP BY word\nORDER BY n DESC;",
  "SELECT email,\n       CASE\n         WHEN email NOT LIKE '%_@_%._%' THEN 'invalid email'\n         WHEN length(password_hash) < 8 THEN 'password too short'\n         ELSE 'ok'\n       END AS validation\nFROM users\nLIMIT 10;",
  "SELECT MIN(wpm) AS min_wpm,\n       MAX(wpm) AS max_wpm,\n       ROUND(AVG(wpm), 2) AS mean_wpm,\n       PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY wpm) AS median_wpm\nFROM scores\nWHERE language = 'js-ts';",
  "SELECT display_name,\n       RANK() OVER (ORDER BY best_wpm DESC) AS rank\nFROM (\n  SELECT u.display_name, MAX(s.wpm) AS best_wpm\n  FROM users u\n  JOIN scores s ON s.user_id = u.id\n  WHERE s.category = 'long'\n  GROUP BY u.id\n) top;",
];
