export const snippets = [
  "func sum(nums ...int) int {\n  total := 0\n  for _, n := range nums {\n    total += n\n  }\n  return total\n}",
  "func divide(a, b float64) (float64, error) {\n  if b == 0 {\n    return 0, errors.New(\"division by zero\")\n  }\n  return a / b, nil\n}",
  "ch := make(chan int, 4)\ngo func() {\n  defer close(ch)\n  for i := 0; i < 4; i++ {\n    ch <- i * i\n  }\n}()\nfor v := range ch {\n  fmt.Println(v)\n}",
];
