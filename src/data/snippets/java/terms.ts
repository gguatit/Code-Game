export const snippets = [
  "public record Point(int x, int y) {\n    public Point translate(int dx, int dy) {\n        return new Point(x + dx, y + dy);\n    }\n\n    public double distanceTo(Point other) {\n        return Math.hypot(x - other.x, y - other.y);\n    }\n}",
  "List<String> names = people.stream()\n    .filter(p -> p.getAge() >= 18)\n    .map(Person::getName)\n    .sorted(Comparator.naturalOrder())\n    .collect(Collectors.toList());",
  "Map<String, List<Order>> byCustomer = orders.stream()\n    .collect(Collectors.groupingBy(Order::getCustomerId));",
  "@Override\npublic String toString() {\n    return \"%s(%d years)\".formatted(name, age);\n}",
  "try (Connection conn = dataSource.getConnection();\n     PreparedStatement stmt = conn.prepareStatement(SQL_FIND_BY_EMAIL)) {\n    stmt.setString(1, email);\n    try (ResultSet rs = stmt.executeQuery()) {\n        return rs.next() ? mapRow(rs) : Optional.empty();\n    }\n}",
  "public static <T extends Comparable<T>> T max(List<T> items) {\n    Objects.requireNonNull(items, \"items must not be null\");\n    return items.stream().max(Comparable::compareTo)\n        .orElseThrow(() -> new NoSuchElementException(\"empty list\"));\n}",
  "sealed interface Shape permits Circle, Rectangle {}\n\nrecord Circle(double radius) implements Shape {}\nrecord Rectangle(double width, double height) implements Shape {}",
  "double area = switch (shape) {\n    case Circle c -> Math.PI * c.radius() * c.radius();\n    case Rectangle r -> r.width() * r.height();\n};",
  "public enum Status {\n    ACTIVE(\"A\"), SUSPENDED(\"S\"), CLOSED(\"C\");\n\n    private final String code;\n\n    Status(String code) {\n        this.code = code;\n    }\n\n    public static Status fromCode(String code) {\n        for (Status status : values()) {\n            if (status.code.equals(code)) return status;\n        }\n        throw new IllegalArgumentException(\"unknown code: \" + code);\n    }\n}",
  "CompletableFuture.supplyAsync(() -> fetchUser(id))\n    .thenApply(this::enrichProfile)\n    .thenAccept(ui::render)\n    .exceptionally(ex -> {\n        log.warn(\"failed to load user\", ex);\n        return null;\n    });",
];
