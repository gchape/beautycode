# infra

Terraform configuration for BeautyCode's AWS infrastructure: DynamoDB, S3 (images + frontend), CloudFront + ACM, a single EC2 instance running the backend stack (Vault, Postgres, OpenLDAP, the Spring apps), and the IAM/KMS/SSM plumbing that ties it together.

## Layout

```
infra/
├── main.tf                          # all resources
├── terraform.tfvars                 # your real values (gitignored, never commit)
├── templates/
│   └── backend_init.sh.tftpl        # EC2 user_data — boots Docker, Vault, nginx
└── .terraform.lock.hcl
```

## Architecture, briefly

- **DynamoDB** (`BeautyCode` table) — products, single-table design with `ProductsByType` / `ProductsByCategory` GSIs.
- **S3 + CloudFront** — `beauty-code-images` (public, read via bucket policy) and `beauty-code-frontend` (private, read only via CloudFront Origin Access Control). CloudFront also proxies `/api/*` to the backend EC2 instance over HTTP; TLS is terminated at CloudFront, not on the instance.
- **EC2 (single instance, default VPC)** — runs the whole backend stack via Docker Compose: Vault, Postgres, OpenLDAP, `backend-config-server`, `backend`. No custom VPC/subnet — the account's default VPC is used via `data` sources.
- **Vault** — file storage + AWS KMS auto-unseal (`aws_kms_key.vault_unseal`). `vault operator init` runs once per fresh data volume (handled by the boot script); the generated root token is stored in SSM Parameter Store (`/beautycode/vault/root_token`) so redeploys without volume loss can reuse it. **Vault's data lives only on the instance's local disk** — replacing the instance means Vault re-initializes from scratch and prior secrets/leases are gone (they get reseeded from `terraform.tfvars` on next boot, but anything written directly to Vault outside that seed step is lost).
- **IAM** — one role for the EC2 instance (DynamoDB, S3 images bucket, KMS unseal key, SSM under `/beautycode/vault/*`), plus two IAM users for GitHub Actions CI (see below).

## Prerequisites

- Terraform >= 1.15.8
- AWS CLI configured with credentials that can create the resources below
- A default VPC in `eu-central-1` on the target account:
  ```bash
  aws ec2 create-default-vpc --region eu-central-1
  ```
  (skip if one already exists)

## First-time setup

1. **Create the remote state backend once, manually** (chicken-and-egg — Terraform can't create the bucket it stores its own state in):

   ```bash
   aws s3api create-bucket --bucket beauty-code-tfstate --region eu-central-1 \
     --create-bucket-configuration LocationConstraint=eu-central-1
   aws s3api put-bucket-versioning --bucket beauty-code-tfstate \
     --versioning-configuration Status=Enabled
   aws dynamodb create-table --table-name beauty-code-tfstate-lock \
     --attribute-definitions AttributeName=LockID,AttributeType=S \
     --key-schema AttributeName=LockID,KeyType=HASH \
     --billing-mode PAY_PER_REQUEST --region eu-central-1
   ```

2. **Set your secrets** in `terraform.tfvars` (gitignored):

   ```hcl
   jwt_secret           = "..."   # openssl rand -base64 32
   ldap_admin_password  = "..."
   postgres_user         = "..."
   postgres_password     = "..."
   crisp_website_id      = "..."
   ```

3. **Init and apply:**

   ```bash
   cd infra
   terraform init
   terraform plan
   terraform apply
   ```

4. **ACM certificate validation** — `apply` will pause waiting for DNS validation. Grab the CNAME records it needs:

   ```bash
   terraform output acm_validation_records
   ```

   Add them at your DNS provider (name.com), then apply continues once ACM sees them (up to 45 min timeout).

5. **Point real DNS at CloudFront**, once apply finishes:

   ```bash
   terraform output cloudfront_domain_name
   ```

   - `beautycode.live` → ALIAS/ANAME to that value
   - `www.beautycode.live` → CNAME
   - `api.beautycode.live` → CNAME

## Useful outputs

| Output                                  | Use                                                                              |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| `backend_instance_id`                   | `aws ssm start-session --target <id>` to shell into the instance                 |
| `frontend_bucket_name`                  | target for `aws s3 sync` (see `frontend/scripts/deploy-frontend.sh`)             |
| `cloudfront_distribution_id`            | for `aws cloudfront create-invalidation` after a frontend deploy                 |
| `vite_api_url`, `vite_crisp_website_id` | pulled by the frontend build (`vite_crisp_website_id` is sensitive — use `-raw`) |
| `vault_kms_key_id`                      | debugging Vault's seal status                                                    |

## Redeploying the backend

`user_data` only runs once, at first boot. Two ways to push a backend code change:

- **Recreate the instance** — any change to `templates/backend_init.sh.tftpl` (or the secret values it's templated with) causes Terraform to replace `aws_instance.backend` on the next apply. Vault re-initializes from scratch (see note above).
- **In-place update** — SSM into the running instance and manually `git pull && docker compose ... up -d --build` without touching Terraform. Faster, but drifts from what Terraform would produce on a fresh boot — fine for quick iteration, not a substitute for keeping the boot script itself correct.

## CI (GitHub Actions)

Two workflows, path-triggered on push to `main`:

- **`.github/workflows/deploy-backend.yml`** — triggers on changes under `backend/**` or `infra/**`. Runs `terraform plan` + `apply` using the `bc-github-actions-backend` IAM user (broad permissions — this stack manages IAM, EC2, KMS, CloudFront, ACM, DynamoDB, S3, SSM).
- **`.github/workflows/deploy-frontend.yml`** — triggers on changes under `frontend/**`. Reads Terraform outputs (read-only `terraform init`), then runs `frontend/scripts/deploy-frontend.sh`. Uses the `bc-github-actions-frontend` IAM user, scoped to just S3 sync + CloudFront invalidation.

**Required GitHub Secrets:**

| Secret                                                                                        | Source                                                                                  |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `AWS_BACKEND_ACCESS_KEY_ID` / `AWS_BACKEND_SECRET_ACCESS_KEY`                                 | `terraform output -raw github_actions_backend_access_key_id` / `..._secret_access_key`  |
| `AWS_FRONTEND_ACCESS_KEY_ID` / `AWS_FRONTEND_SECRET_ACCESS_KEY`                               | `terraform output -raw github_actions_frontend_access_key_id` / `..._secret_access_key` |
| `JWT_SECRET`, `LDAP_ADMIN_PASSWORD`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `CRISP_WEBSITE_ID` | same values as `terraform.tfvars`                                                       |

Both IAM users' access keys are Terraform-managed (long-lived, not OIDC) — rotate periodically with `terraform taint aws_iam_access_key.github_actions_backend && terraform apply`, then update the corresponding GitHub Secret.

## Notes / known tradeoffs

- **Vault has a single point of failure**: file storage on one EC2 instance's disk. No replication, no automated backup of `/vault/data`. Acceptable for the current scale (one secret load-bearing — the JWT signing key — with LDAP/Postgres passwords delivered via container env vars regardless); revisit if Vault starts holding anything that can't be cheaply reseeded from `terraform.tfvars`.
- **`security_group.backend`** allows inbound :80 only from CloudFront's own IP range (AWS-managed prefix list), not the open internet — TLS termination and public exposure both live at CloudFront/ACM.
