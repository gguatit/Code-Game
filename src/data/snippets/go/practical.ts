export const snippets = [
  "func (s *Server) handleUsers(w http.ResponseWriter, r *http.Request) {\n  users, err := s.store.All(r.Context())\n  if err != nil {\n    http.Error(w, err.Error(), http.StatusInternalServerError)\n    return\n  }\n  w.Header().Set(\"Content-Type\", \"application/json\")\n  json.NewEncoder(w).Encode(users)\n}",
  "type Stack[T any] struct {\n  items []T\n}\n\nfunc (s *Stack[T]) Push(v T) {\n  s.items = append(s.items, v)\n}\n\nfunc (s *Stack[T]) Pop() (T, bool) {\n  if len(s.items) == 0 {\n    var zero T\n    return zero, false\n  }\n  v := s.items[len(s.items)-1]\n  s.items = s.items[:len(s.items)-1]\n  return v, true\n}",
];
