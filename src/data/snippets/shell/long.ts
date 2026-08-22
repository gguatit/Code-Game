export const snippets = [
  "#!/usr/bin/env bash\nset -euo pipefail\n\nfor f in \"$@\"; do\n  if [[ -f \"$f\" ]]; then\n    gzip -k \"$f\"\n  fi\ndone",
  "docker ps --filter \"status=running\" --format '{{.Names}}' | sort | uniq",
  "git log --oneline -20 --author=\"$(git config user.name)\"",
];
