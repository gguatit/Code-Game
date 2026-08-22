export const snippets = [
  "class Counter {\n  int _count = 0;\n\n  int get count => _count;\n\n  void increment() => _count++;\n\n  void reset() {\n    _count = 0;\n  }\n}",
  "Future<List<User>> loadUsers() async {\n  final response = await http.get(Uri.parse('$apiUrl/users'));\n  if (response.statusCode != 200) {\n    throw Exception('failed to load users');\n  }\n  final data = jsonDecode(response.body) as List;\n  return data.map(User.fromJson).toList();\n}",
  "Iterable<int> fib(int n) sync* {\n  int a = 0, b = 1;\n  for (var i = 0; i < n; i++) {\n    yield a;\n    final next = a + b;\n    a = b;\n    b = next;\n  }\n}",
];
