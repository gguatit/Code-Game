export const snippets = [
  "class Cart\n{\n    private array $items = [];\n\n    public function add(Product $product, int $qty = 1): void\n    {\n        $sku = $product->sku;\n        $this->items[$sku] = ($this->items[$sku] ?? 0) + $qty;\n    }\n}",
  "$prices = array_filter($products, function (Product $p): bool {\n    return $p->price > 0 && $p->stock > 0;\n});",
  "function slugify(string $title): string\n{\n    $slug = strtolower(trim($title));\n    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);\n    return trim($slug, '-');\n}",
];
