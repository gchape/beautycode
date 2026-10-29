#!/bin/sh
# Daily backup: SQLite snapshot to S3, then sync product images to S3.
# Run on the EC2 host. Safe to run from cron (as root) or by hand.
set -eu
cd /srv/beautycode
set -a; . ./.env; set +a

DC="sudo docker compose"

echo "[$(date -u +%FT%TZ)] database snapshot"
$DC exec -T app node scripts/backup.ts

echo "[$(date -u +%FT%TZ)] product images"
mkdir -p data/uploads
# No --delete: images removed in the admin stay in the backup.
aws s3 sync ./data/uploads "s3://${S3_BACKUPS_BUCKET}/uploads/" \
  --region "$AWS_REGION" --only-show-errors

echo "[$(date -u +%FT%TZ)] backup ok"
