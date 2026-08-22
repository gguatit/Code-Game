export const snippets = [
  "data class User(\n    val id: Int,\n    val name: String,\n)\n\nfun greet(user: User): String {\n    return \"Hello, ${user.name}!\"\n}",
  "val numbers = listOf(1, 2, 3, 4, 5)\nval evens = numbers.filter { it % 2 == 0 }",
  "suspend fun fetchUser(id: Int): User {\n    val response = client.get(\"$apiUrl/users/$id\")\n    return response.body()\n}",
];
