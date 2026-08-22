export const snippets = [
  "data class User(val id: Int, val name: String, val email: String?)",
  "val adults = users.filter { it.age >= 18 }.map { it.name }",
  "val name: String = user?.name ?: \"guest\"",
  "fun parse(value: String): Int? = value.toIntOrNull()",
  "listOf(1, 2, 3).fold(0) { acc, n -> acc + n }",
  "when (code) { 200 -> \"ok\" else -> \"error\" }",
];
