# BeautyCode Infrastructure (Terraform / AWS)

Provisions the production AWS infrastructure for BeautyCode: a single EC2 instance running the full Docker Compose stack behind CloudFront, plus supporting DynamoDB, S3, KMS, and IAM resources.

## Architecture

```
                    ┌─────────────┐
   Browser ───────► │ CloudFront  │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                   ▼
  S3 (frontend)     S3 (images)          EC2 (backend-api, /api/*)
  via OAC           via public policy         │
                                               ▼
                                    Nginx (:80) → Spring Boot (:8080)
                                               │
                          ┌────────────────────┼────────────────────┐
                          ▼                    ▼                    ▼
                     Vault (KMS         Postgres            OpenLDAP
                     auto-unseal,       (orders,            (users)
                     file storage)      newsletter)
                                               │
                                               ▼
                                        DynamoDB (products)
```

- **CloudFront** serves the static frontend from S3 (`beauty-code-frontend`, private via OAC), product images from S3 (`beauty-code-images`, public), and proxies `/api/*` to the EC2 backend over HTTP (TLS terminates at CloudFront/ACM; the EC2 instance never speaks TLS directly).
- **EC2** (`t3.small`, single instance) runs the full backend Docker Compose stack (`vault`, `backend-config-server`, `backend`, `postgres`, `openldap`, seeders) via a `user_data` bootstrap script that clones the repo, writes `.env` and `vault.hcl`, and brings the stack up.
- **Vault** uses file storage + AWS KMS auto-unseal — no manual unseal-key handling on restart. The root token is generated once (`vault operator init`) and persisted in SSM Parameter Store so redeploys/reboots reuse it instead of re-initializing.
- **Security**: inbound port 80 on the backend security group is restricted to CloudFront's own origin-facing IP ranges via the AWS-managed prefix list `com.amazonaws.global.cloudfront.origin-facing` — the origin is not reachable directly from the public internet.
- **IAM**: the EC2 instance role is scoped to exactly what the app needs — DynamoDB CRUD on the `BeautyCode` table, S3 read/write on the images bucket, KMS encrypt/decrypt on the Vault unseal key, and SSM parameter access under `/beautycode/vault/*` — plus `AmazonSSMManagedInstanceCore` for Session Manager access (no SSH keys/ports needed).

## Prerequisites

- Terraform >= 1.15.8, AWS provider ~> 6.54.0
- AWS credentials with permission to create the resources above
- A registered domain (`beautycode.live`) with DNS managed externally (name.com per the outputs) — Terraform does **not** manage DNS records, only the ACM validation records and CloudFront target you need to add manually

## Required variables

Provide via `terraform.tfvars`, environment variables, or a secrets manager — all are marked `sensitive`:

| Variable                              | Used for                                                              |
| ------------------------------------- | --------------------------------------------------------------------- |
| `crisp_website_id`                    | Frontend chat widget                                                  |
| `jwt_secret`                          | JWT signing key, seeded into Vault at `secret/backend/prod`           |
| `ldap_admin_password`                 | OpenLDAP admin bind password, seeded into Vault + LDAP bootstrap LDIF |
| `postgres_user` / `postgres_password` | Postgres credentials, passed to the container and seeded into Vault   |

## Deploy

```bash
terraform init
terraform plan
terraform apply
```

After apply, use the outputs to finish setup:

1. **`acm_validation_records`** — add these CNAME records at your DNS provider first; `aws_acm_certificate_validation` will block `apply` for up to 45 minutes until validation completes.
2. **`cloudfront_domain_name`** — point `beautycode.live` (ALIAS/ANAME), `www.beautycode.live` (CNAME), and `api.beautycode.live` (CNAME) at this.
3. **`frontend_bucket_name`** — deploy the built frontend with `aws s3 sync ./dist s3://<bucket>`.
4. **`cloudfront_distribution_id`** — run `aws cloudfront create-invalidation --distribution-id <id> --paths "/*"` after every frontend deploy.
5. **`backend_instance_id`** — use with `aws ssm send-command` to redeploy backend changes without recreating the EC2 instance (e.g. re-run the `git pull && docker compose up -d --build` portion of the bootstrap).

## What `user_data` does on first boot

1. Installs Docker, Nginx, AWS CLI, `jq`.
2. Sparse-checks out just the `backend/` directory from the repo.
3. Writes `vault/config/vault.hcl` (file storage + KMS auto-unseal) and `.env` (app secrets from Terraform variables).
4. Builds and starts **only** `vault` first, waits for it to respond.
5. If uninitialized, runs `vault operator init` and stores the root token in SSM (`/beautycode/vault/root_token`); if already initialized, fetches the existing token from SSM instead.
6. Runs `vault-seed` to write app secrets into Vault, then brings up the rest of the stack.
7. Configures Nginx as a plain-HTTP reverse proxy from `:80` to the backend's `:8080` (no TLS here — CloudFront handles that).

## Known issue to fix before deploying

`docker-compose.prod.yaml`'s `vault` service does not set `VAULT_ADDR`. The Vault CLI defaults to `https://127.0.0.1:8200`, but `vault.hcl` disables TLS (`tls_disable = true`) — so both the base compose healthcheck and this script's own `docker exec vault status` / `vault operator init` calls will fail to connect. Add to `docker-compose.prod.yaml`:

```yaml
vault:
  environment:
    - VAULT_ADDR=http://127.0.0.1:8200
```

## Notes / things not verified here

- This document describes the Terraform as written; it has not been applied or tested end-to-end in this session.
- `aws_eip.backend.public_dns` is used directly as the CloudFront custom origin — confirm this attribute populates as expected for your EIP once created; if empty, switch the origin to `aws_eip.backend.public_ip` or a DNS name you control instead.
- No automated CI/CD is defined here — frontend and backend redeploys are manual (`s3 sync` + invalidation; `ssm send-command` or SSH-less redeploy script) per the outputs above.
