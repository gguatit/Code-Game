export const snippets = [
  "class ShoppingCart {\n    private val items = mutableMapOf<String, Int>()\n\n    fun add(product: String, quantity: Int = 1) {\n        items.merge(product, quantity, Int::plus)\n    }\n\n    fun total(): Int = items.values.sum()\n}",
  "fun validate(email: String): Boolean {\n    val pattern = Regex(\"^[\\\\w.+-]+@[\\\\w-]+\\\\.[\\\\w.]+$\")\n    return pattern.matches(email)\n}",
];
