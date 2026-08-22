export const snippets = [
  "class Cart {\n  final List<Item> _items = [];\n\n  void add(Item item) => _items.add(item);\n\n  double get total =>\n      _items.fold(0, (sum, item) => sum + item.price);\n}",
  "Future<void> sync() async {\n  final results = await Future.wait(urls.map((u) => fetch(u)));\n  for (final r in results) {\n    if (r.isOk) cache.put(r.key, r.value);\n  }\n}",
];
