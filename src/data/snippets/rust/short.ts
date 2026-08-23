export const snippets = [
  "fn main() {\n    for n in 1..=20 {\n        if n % 15 == 0 {\n            println!(\"FizzBuzz\");\n        } else if n % 3 == 0 {\n            println!(\"Fizz\");\n        } else if n % 5 == 0 {\n            println!(\"Buzz\");\n        } else {\n            println!(\"{}\", n);\n        }\n    }\n}",
  "fn main() {\n    let nums = vec![1, 2, 3, 4, 5];\n    let total: i32 = nums.iter().map(|x| x * x).sum();\n    println!(\"sum of squares: {}\", total);\n}",
  "struct Rectangle {\n    width: f64,\n    height: f64,\n}\n\nimpl Rectangle {\n    fn area(&self) -> f64 {\n        self.width * self.height\n    }\n\n    fn is_square(&self) -> bool {\n        (self.width - self.height).abs() < f64::EPSILON\n    }\n}",
  "fn find_user(users: &[User], id: u32) -> Option<&User> {\n    users.iter().find(|u| u.id == id)\n}\n\nfn main() {\n    match find_user(&users, 42) {\n        Some(user) => println!(\"found: {}\", user.name),\n        None => println!(\"user not found\"),\n    }\n}",
  "use std::collections::HashMap;\n\nfn main() {\n    let text = \"the quick the lazy the dog\";\n    let mut counts: HashMap<&str, i32> = HashMap::new();\n    for word in text.split_whitespace() {\n        *counts.entry(word).or_insert(0) += 1;\n    }\n    println!(\"{:?}\", counts);\n}",
  "fn main() {\n    let words = vec![\"alpha\", \"beta\", \"gamma\"];\n    let joined = words.iter().enumerate()\n        .map(|(i, w)| format!(\"{}. {}\", i + 1, w))\n        .collect::<Vec<_>>()\n        .join(\"\\n\");\n    println!(\"{}\", joined);\n}",
];
