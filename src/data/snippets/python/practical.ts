export const snippets = [
  "import json\nfrom pathlib import Path\n\ndef load_config(path):\n    p = Path(path)\n    if not p.exists():\n        return {}\n    return json.loads(p.read_text(encoding=\"utf-8\"))",
  "def group_by(items, key):\n    groups = {}\n    for item in items:\n        k = key(item)\n        groups.setdefault(k, []).append(item)\n    return groups",
];
