export const snippets = [
  "int max = numbers.stream().mapToInt(Integer::intValue).max().orElse(0);",
  'Map<String, List<Order>> byUser = orders.stream().collect(groupingBy(Order::userId));',
  "String csv = String.join(\",\", columns);",
  "Optional<User> found = users.stream().filter(u -> u.id == id).findFirst();",
  "List<Integer> squares = nums.stream().map(n -> n * n).toList();",
  "if (obj instanceof String s && !s.isEmpty()) {",
];
