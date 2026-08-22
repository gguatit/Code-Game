export const snippets = [
  "class Stack {\n    private var items: [Int] = []\n\n    mutating func push(_ value: Int) {\n        items.append(value)\n    }\n\n    mutating func pop() -> Int? {\n        guard !items.isEmpty else { return nil }\n        return items.removeLast()\n    }\n}",
  "let names = [\"charlie\", \"alice\", \"bob\"]\nlet sorted = names.sorted { lhs, rhs in lhs < rhs }",
  "func fetchUser(id: Int) async throws -> String {\n    let (data, _) = try await URLSession.shared.data(from: url)\n    return String(decoding: data, as: UTF8.self)\n}",
];
