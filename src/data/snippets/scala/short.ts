export const snippets = [
  "val names = List(\"Ann\", \"Bo\", \"Cy\")\nnames.foreach(println)",
  "def add(a: Int, b: Int): Int = a + b\nprintln(add(2, 3))",
  "val nums = List(5, 2, 8, 1)\nprintln(nums.sorted.mkString(\", \"))",
  "class Counter {\n  private var count = 0\n  def increment(): Unit = count += 1\n  def current: Int = count\n}",
  "val maybeName: Option[String] = Some(\"Ada\")\nmaybeName match {\n  case Some(n) => println(s\"Hello, $n\")\n  case None    => println(\"No name\")\n}",
  "object FizzBuzz extends App {\n  (1 to 15).foreach { n =>\n    println(if (n % 15 == 0) \"FizzBuzz\"\n            else if (n % 3 == 0) \"Fizz\"\n            else if (n % 5 == 0) \"Buzz\"\n            else n.toString)\n  }\n}",
];
