export const snippets = [
  "fn main() {\n    let nums = vec![3, 1, 4, 1, 5];\n    let max = nums.iter().max();\n\n    match max {\n        Some(m) => println!(\"max: {m}\"),\n        None => println!(\"empty\"),\n    }\n}",
  "impl Display for Point {\n    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {\n        write!(f, \"({}, {})\", self.x, self.y)\n    }\n}",
  "fn parse_pair(input: &str) -> Option<(i32, i32)> {\n    let (a, b) = input.split_once(',')?;\n    let x = a.trim().parse().ok()?;\n    let y = b.trim().parse().ok()?;\n    Some((x, y))\n}",
];
