export const snippets = [
  "for n in 1...20 {\n    switch (n % 3, n % 5) {\n    case (0, 0):\n        print(\"FizzBuzz\")\n    case (0, _):\n        print(\"Fizz\")\n    case (_, 0):\n        print(\"Buzz\")\n    default:\n        print(n)\n    }\n}",
  "func nickname(for user: User?) -> String {\n    guard let name = user?.name, !name.isEmpty else {\n        return \"guest\"\n    }\n    return \"@\" + name\n}\n\nprint(nickname(for: nil))",
  "struct Rectangle {\n    let width: Double\n    let height: Double\n\n    var area: Double {\n        width * height\n    }\n\n    func scaled(by factor: Double) -> Rectangle {\n        Rectangle(width: width * factor, height: height * factor)\n    }\n}\n\nlet rect = Rectangle(width: 3, height: 4)\nprint(rect.area)",
  "protocol Greetable {\n    var name: String { get }\n    func greet() -> String\n}\n\nstruct Person: Greetable {\n    let name: String\n    func greet() -> String {\n        return \"Hello, \" + name\n    }\n}\n\nprint(Person(name: \"Ada\").greet())",
  "let scores = [\"ada\": 91, \"linus\": 87]\nlet average = scores.values.reduce(0, +) / scores.count\n\nfor (name, score) in scores.sorted(by: { $0.value > $1.value }) {\n    print(name, score)\n}\nprint(\"average:\", average)",
  "let evens = (1...12).filter { $0 % 2 == 0 }\nlet doubled = evens.map { number in number * 2 }\nlet total = evens.reduce(0, +)\n\nprint(evens)\nprint(doubled)\nprint(total)",
];
