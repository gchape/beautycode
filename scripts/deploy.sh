#!/bin/sh
# Release on the EC2 host:   ./scripts/deploy.sh <release-tag-or-commit>
# Rollback:                  ./scripts/deploy.sh <previous-tag-or-commit>
# Stops at the first failure. The running app is replaced only after the build succeeds.
set -eu

main() {
  REF="${1:?usage: deploy.sh <release-tag-or-commit>}"
  cd /srv/beautycode
  set -a; . ./.env; set +a
  DC="sudo docker compose"
  PREVIOUS="$(git describe --tags --always)"

  echo "1/5 Backing up database and images"
  ./scripts/backup.sh

  echo "2/5 Checking out $REF (currently $PREVIOUS)"
  git fetch --tags --quiet
  git checkout --quiet "$REF"

  echo "3/5 Building (the running app is untouched if this fails)"
  if ! $DC build app; then
    git checkout --quiet "$PREVIOUS"
    echo "Build failed; checkout restored to $PREVIOUS." >&2
    return 1
  fi

  echo "4/5 Restarting"
  $DC up -d

  echo "5/5 Health check"
  for i in 1 2 3 4 5 6 7 8 9 10; do
    if curl --fail --silent "https://${DOMAIN}/healthz" >/dev/null; then
      echo "Deployed $REF (previous: $PREVIOUS)"
      return 0
    fi
    sleep 3
  done
  echo "Health check failed for $REF." >&2
  echo "Roll back with: ./scripts/deploy.sh $PREVIOUS" >&2
  echo "If $REF ran a schema migration, restore the matching snapshot first." >&2
  return 1
}

# The checkout can replace this file while it runs; main runs to completion first.
main "$@"
exit $?
