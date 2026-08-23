export const snippets = [
  "let mut count: u32 = 0;",
  "fn main() { println!(\"Hello, world!\"); }",
  "struct User { name: String, age: u32 }",
  "enum Shape { Circle(f64), Square(f64) }",
  "match value { Some(v) => v, None => 0 }",
  "if let Some(item) = stack.pop() { process(item); }",
  "for i in 0..10 { println!(\"{}\", i); }",
  "let result: Result<i32, String> = Ok(42);",
  "impl fmt::Display for Point { fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result { write!(f, \"({}, {})\", self.x, self.y) } }",
  "let names: Vec<String> = line.split(',').map(|s| s.trim().to_string()).collect();",
];
