export const snippets = [
  "fun main() {\n    for (n in 1..20) {\n        when {\n            n % 15 == 0 -> println(\"FizzBuzz\")\n            n % 3 == 0 -> println(\"Fizz\")\n            n % 5 == 0 -> println(\"Buzz\")\n            else -> println(n)\n        }\n    }\n}",
  "data class Task(val title: String, val done: Boolean = false)\n\nfun main() {\n    val task = Task(\"write tests\")\n    val finished = task.copy(done = true)\n    println(finished.title + \": \" + finished.done)\n}",
  "fun parseAge(raw: String?): Int {\n    return raw?.trim()?.toIntOrNull()?.coerceIn(0, 150) ?: 0\n}\n\nfun main() {\n    println(parseAge(null))\n    println(parseAge(\" 42 \"))\n}",
  "fun main() {\n    val names = listOf(\"kim\", \"lee\", \"park\")\n    val upper = names.map { it.uppercase() }.sorted()\n    val lengths = names.associateWith { it.length }\n    println(upper)\n    println(lengths)\n}",
  "class Counter {\n    var count = 0\n        private set\n\n    fun increment() {\n        count++\n    }\n}\n\nfun main() {\n    val counter = Counter()\n    counter.increment()\n    counter.increment()\n    println(counter.count)\n}",
  "fun httpLabel(status: Int): String = when (status) {\n    in 200..299 -> \"success\"\n    in 400..499 -> \"client error\"\n    in 500..599 -> \"server error\"\n    else -> \"unknown\"\n}\n\nfun main() {\n    println(httpLabel(404))\n}",
];
