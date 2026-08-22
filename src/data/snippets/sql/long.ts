export const snippets = [
  "SELECT c.name, SUM(o.total) AS revenue\nFROM orders o\nJOIN customers c ON c.id = o.customer_id\nWHERE o.created_at >= '2026-01-01'\nGROUP BY c.name\nORDER BY revenue DESC\nLIMIT 10;",
  "UPDATE products\nSET price = price * 0.9\nWHERE category = 'clearance'\n  AND stock > 0;",
  "WITH monthly AS (\n  SELECT strftime('%Y-%m', created_at) AS month, SUM(total) AS total\n  FROM orders\n  GROUP BY month\n)\nSELECT * FROM monthly ORDER BY month;",
];
