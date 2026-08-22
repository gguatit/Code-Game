export const snippets = [
  "#!/usr/bin/env bash\nset -euo pipefail\n\nmain() {\n  local target=\"${1:?usage: deploy.sh <env>}\"\n  echo \"building...\"\n  npm run build\n  rsync -avz dist/ \"deploy@$target:/srv/app/\"\n  echo \"deployed to $target\"\n}\n\nmain \"$@\"",
  "backup() {\n  local dest=\"/backups/$(date +%F).tar.gz\"\n  tar -czf \"$dest\" \"$HOME/projects\"\n  find /backups -name '*.tar.gz' -mtime +14 -delete\n}",
];
