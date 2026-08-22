export const snippets = [
  "const debounce = (fn, ms) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), ms);\n  };\n};",
  "async function fetchJson(url) {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(`HTTP ${res.status}`);\n  return res.json();\n}",
  "export function useLocalStorage(key, initial) {\n  const [value, setValue] = useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved ?? initial;\n  });\n  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);\n  return [value, setValue];\n}",
];
