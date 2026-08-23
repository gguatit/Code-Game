export const snippets = [
  "SELECT u.id,\n       u.display_name,\n       COUNT(o.id) AS order_count,\n       SUM(o.total) AS lifetime_value\nFROM users u\nJOIN orders o ON o.user_id = u.id\nWHERE o.created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)\nGROUP BY u.id, u.display_name\nORDER BY lifetime_value DESC\nLIMIT 10;",
  "WITH ranked AS (\n  SELECT id,\n         name,\n         score,\n         ROW_NUMBER() OVER (PARTITION BY category ORDER BY score DESC) AS rn\n  FROM players\n)\nSELECT id, name, score\nFROM ranked\nWHERE rn <= 3;",
  "SELECT p.status,\n       COUNT(*) AS jobs,\n       AVG(p.duration_ms) AS avg_ms\nFROM pipeline_runs p\nWHERE p.started_at BETWEEN '2026-08-01' AND '2026-09-01'\nGROUP BY p.status\nHAVING COUNT(*) >= 5\nORDER BY avg_ms DESC;",
  "SELECT DATE(created_at) AS day,\n       COUNT(*) AS signups,\n       COUNT(DISTINCT email) AS unique_emails\nFROM users\nGROUP BY DATE(created_at)\nORDER BY day DESC;",
  "UPDATE products\nSET price = ROUND(price * 0.9, 2)\nWHERE stock > 100\n  AND updated_at < NOW() - INTERVAL 30 DAY;",
  "SELECT e.level,\n       e.message,\n       LAG(e.created_at) OVER (ORDER BY e.created_at) AS previous_at\nFROM error_events e\nWHERE e.created_at >= NOW() - INTERVAL 1 HOUR\nORDER BY e.created_at DESC;",
];
