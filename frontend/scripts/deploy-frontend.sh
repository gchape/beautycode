#!/bin/bash
set -e

# Run this from the frontend repo root, with the infra Terraform directory
# path passed in (or edit INFRA_DIR below to a fixed relative path).
#
# Usage: ./scripts/deploy-frontend.sh [path-to-infra-dir]

INFRA_DIR="${1:-../infra}"

if [ ! -d "$INFRA_DIR" ]; then
  echo "Terraform infra directory not found at: $INFRA_DIR"
  echo "Usage: ./scripts/deploy-frontend.sh [path-to-infra-dir]"
  exit 1
fi

echo "Pulling config from Terraform outputs..."
VITE_API_URL=$(terraform -chdir="$INFRA_DIR" output -raw vite_api_url)
VITE_CRISP_WEBSITE_ID=$(terraform -chdir="$INFRA_DIR" output -raw vite_crisp_website_id)
BUCKET_NAME=$(terraform -chdir="$INFRA_DIR" output -raw frontend_bucket_name)
DISTRIBUTION_ID=$(terraform -chdir="$INFRA_DIR" output -raw cloudfront_distribution_id)

cat > .env <<ENVFILE
VITE_API_URL=$VITE_API_URL
VITE_CRISP_WEBSITE_ID=$VITE_CRISP_WEBSITE_ID
ENVFILE

echo "Building frontend..."
npm ci
npm run build

echo "Syncing build output to s3://$BUCKET_NAME ..."
aws s3 sync ./dist "s3://$BUCKET_NAME" --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*"

echo "Frontend deploy complete."
