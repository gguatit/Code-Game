export interface LanguageDef {
  id: string;
  name: string;
  monogram: string;
  color: string;
}

export const LANGUAGES: LanguageDef[] = [
  { id: "js-ts", name: "JavaScript / TypeScript", monogram: "TS", color: "#3178c6" },
  { id: "python", name: "Python", monogram: "Py", color: "#3776ab" },
  { id: "java", name: "Java", monogram: "Jv", color: "#f89820" },
  { id: "c-cpp", name: "C / C++", monogram: "C+", color: "#5c9fd8" },
  { id: "csharp", name: "C#", monogram: "C#", color: "#68217a" },
  { id: "go", name: "Go", monogram: "Go", color: "#00add8" },
  { id: "rust", name: "Rust", monogram: "Rs", color: "#dea584" },
  { id: "kotlin", name: "Kotlin", monogram: "Kt", color: "#7f52ff" },
  { id: "swift", name: "Swift", monogram: "Sw", color: "#f05138" },
  { id: "php", name: "PHP", monogram: "Ph", color: "#777bb3" },
  { id: "ruby", name: "Ruby", monogram: "Rb", color: "#cc342d" },
  { id: "shell", name: "Shell", monogram: "Sh", color: "#89e051" },
  { id: "sql", name: "SQL", monogram: "SQ", color: "#e38c00" },
  { id: "html-css", name: "HTML / CSS", monogram: "<>", color: "#e34c26" },
  { id: "dart", name: "Dart", monogram: "Dt", color: "#027dfd" },
  { id: "lua", name: "Lua", monogram: "Lu", color: "#4f8fd6" },
  { id: "haskell", name: "Haskell", monogram: "Hs", color: "#8a7fb5" },
  { id: "elixir", name: "Elixir", monogram: "Ex", color: "#9b7bb8" },
  { id: "scala", name: "Scala", monogram: "Sc", color: "#dc322f" },
  { id: "perl", name: "Perl", monogram: "Pl", color: "#6478b4" },
  { id: "zig", name: "Zig", monogram: "Zg", color: "#f7a41d" },
  { id: "nim", name: "Nim", monogram: "Nm", color: "#ffe953" },
];

export const getLanguage = (id: string | undefined) =>
  LANGUAGES.find((l) => l.id === id);
