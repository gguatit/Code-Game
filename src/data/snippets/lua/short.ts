export const snippets = [
  "for i = 1, 10 do\n  print(i)\nend",
  "if x > 0 then\n  print(\"positive\")\nelse\n  print(\"negative\")\nend",
  "local t = {}\nfor i = 1, 5 do\n  table.insert(t, i * i)\nend",
  "function greet(name)\n  return \"Hello, \" .. name .. \"!\"\nend",
  "while true do\n  local line = io.read()\n  if not line then break end\n  print(line:upper())\nend",
  "local Person = {}\nPerson.__index = Person\nfunction Person.new(name)\n  return setmetatable({ name = name }, Person)\nend",
];
