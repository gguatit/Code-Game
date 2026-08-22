export const snippets = [
  "use std::collections::HashMap;\n\n#[derive(Debug)]\npub struct Counter {\n    counts: HashMap<String, u64>,\n}\n\nimpl Counter {\n    pub fn new() -> Self {\n        Self { counts: HashMap::new() }\n    }\n\n    pub fn record(&mut self, key: &str) {\n        *self.counts.entry(key.to_string()).or_insert(0) += 1;\n    }\n}",
  "fn main() -> Result<(), Box<dyn Error>> {\n    let input = fs::read_to_string(\"input.txt\")?;\n    let total: i64 = input\n        .lines()\n        .filter_map(|line| line.trim().parse().ok())\n        .sum();\n    println!(\"total: {total}\");\n    Ok(())\n}",
];
