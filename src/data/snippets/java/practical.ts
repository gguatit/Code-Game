export const snippets = [
  "public class Cache<K, V> {\n  private final Map<K, V> store = new ConcurrentHashMap<>();\n\n  public V computeIfMissing(K key, Function<K, V> loader) {\n    return store.computeIfAbsent(key, loader);\n  }\n\n  public void invalidate(K key) {\n    store.remove(key);\n  }\n}",
  "record Point(int x, int y) {\n  double distanceTo(Point other) {\n    int dx = x - other.x;\n    int dy = y - other.y;\n    return Math.sqrt(dx * dx + dy * dy);\n  }\n}",
];
