# BeautyCode Infrastructure

Terraform config for BeautyCode: DynamoDB, S3 (images + frontend), CloudFront,
a single EC2 instance running the backend stack (Vault, config server,
OpenLDAP, backend) via Docker Compose, and nginx as a reverse proxy in front
of it.

DNS is managed externally at **name.com** — nothing here is automated with
Route 53, so a few manual steps are required after `apply`.

## Architecture

One CloudFront distribution is the single HTTPS entry point for all three
domains (`beautycode.live`, `www.beautycode.live`, `api.beautycode.live`).
Nothing behind it needs to know about TLS at all.

**Frontend** (`beautycode.live`, `www`)

```
Browser → CloudFront (HTTPS) → S3 bucket (frontend build)
```

CloudFront reads the static site out of the private `frontend` bucket via
Origin Access Control (OAC) — the bucket is fully locked down, only
CloudFront's service principal can read it. Unknown routes (client-side
router paths) return 403/404 from S3, which CloudFront rewrites to serve
`index.html`, so deep-links and refreshes work with the SPA router.

**Images** (`/images/*`)

```
Browser → CloudFront (HTTPS) → S3 bucket (beauty-code-images, public)
```

Public via bucket policy (no OAC needed), cached at the edge for a year
since images rarely change.

**API** (`/api/*`, on `api.beautycode.live`)

```
Browser → CloudFront (HTTPS) → EC2 instance, port 80 (HTTP) → nginx → Spring Boot :8080
                                        └─ docker compose: vault, backend-config-server, openldap, backend
```

CloudFront terminates TLS for the API domain using the _same_ certificate as
the frontend. The browser always talks HTTPS to CloudFront; the hop onward
to the EC2 box is plain HTTP over AWS's internal network, which is why the
security group only needs port 80 open and why there's no certbot anywhere
— ACM/CloudFront issues and renews the cert automatically, for free.

**Data & compute, underneath all of that:**

- DynamoDB (`BeautyCode` table, single-table design, GSIs by `Type` and
  `Category`) for app data
- One EC2 instance that `git clone`s the backend repo (sparse-checkout,
  `backend/` only) and runs
  `docker compose -f docker-compose.yml -f docker-compose.prod.yaml build && up`,
  bringing up Vault, a Spring Cloud config server, OpenLDAP, and the Spring
  Boot backend — all built from source, no images pulled from a registry
- An Elastic IP so the instance's address is stable (used internally as the
  CloudFront origin address, not exposed in DNS)
- An IAM role scoped to exactly what the backend needs (DynamoDB CRUD on the
  one table, S3 read/write on the images bucket) plus SSM so you can shell
  in without SSH keys or an open port 22

## Prerequisites

- Terraform >= 1.15.8
- AWS CLI configured with credentials that can manage the resources below
  (e.g. via `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` env vars or a
  configured profile)
- AWS CLI Session Manager plugin installed, for SSM access to the EC2
  instance — there is no SSH access, by design
- Node/npm locally, to build the frontend before uploading it to S3
- Access to DNS management for `beautycode.live` at name.com

## What gets created

| Resource                                                                   | Purpose                                                                                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `aws_dynamodb_table.beauty_code`                                           | Single-table store, GSIs by `Type` and `Category`                                                                                      |
| `aws_s3_bucket.beauty_code_images`                                         | Public product images, served via CloudFront `/images/*`                                                                               |
| `aws_s3_bucket.frontend`                                                   | Private bucket for the built SPA, read only by CloudFront (OAC)                                                                        |
| `aws_cloudfront_distribution.frontend`                                     | One distribution serving the frontend, images, **and** the API under `beautycode.live` / `www.beautycode.live` / `api.beautycode.live` |
| `aws_acm_certificate.frontend` + `aws_acm_certificate_validation.frontend` | Single TLS cert covering all three domains (must be `us-east-1`)                                                                       |
| `aws_instance.backend`                                                     | t3.small running Vault + backend-config-server + OpenLDAP + backend (built from source) behind nginx                                   |
| `aws_eip.backend`                                                          | Static IP for the backend instance, used internally as the CloudFront origin                                                           |

The frontend app itself is **not** built or run on the EC2 instance — it's a
static build uploaded to S3 and served through CloudFront. The EC2 only ever
sparse-checks-out `backend/` from the app repo; the `frontend/` directory and
the `frontend` service in the app's own compose file are never touched.

**No ALB, no certbot.** The API is _not_ exposed directly on the internet —
it only accepts plain HTTP from CloudFront (security group only opens port
80). CloudFront terminates TLS for `api.beautycode.live` using the same ACM
certificate as the frontend, so there's nothing to renew manually and no
load balancer to pay for. Traffic between CloudFront and the EC2 origin
stays on AWS's internal network unencrypted — a standard trade-off for
keeping this simple; if that's ever a compliance concern, nginx can be
switched to `https-only` origin protocol with a self-signed cert.

## Variables

Set these via `terraform.tfvars`, `-var`, or `TF_VAR_*` env vars. **Never
commit real values** — `terraform.tfvars` should be gitignored.

```hcl
crisp_website_id    = "..."   # sensitive — Crisp live-chat widget ID
vault_token          = "..."   # sensitive — Vault dev root token, shared with backend containers
jwt_secret           = "..."   # sensitive — HS256 signing secret for JWTs, min 32 bytes
ldap_admin_password  = "..."   # sensitive — LDAP admin bind password
```

Generate real secrets locally rather than hand-typing them:

```bash
openssl rand -hex 32        # vault_token
openssl rand -base64 48     # jwt_secret
openssl rand -base64 24     # ldap_admin_password
```

> If any of these values were ever pasted into a chat, doc, ticket, or
> committed to git — even briefly — treat them as compromised and regenerate
> before deploying.

## Deploy

### 1. Set up variables

```bash
cp terraform.tfvars.example terraform.tfvars   # if you keep an example file
# edit terraform.tfvars with real values, or export as TF_VAR_* instead:

export TF_VAR_crisp_website_id="..."
export TF_VAR_vault_token=$(openssl rand -hex 32)
export TF_VAR_jwt_secret=$(openssl rand -base64 48)
export TF_VAR_ldap_admin_password=$(openssl rand -base64 24)
```

### 2. Init

```bash
terraform init
```

### 3. Create the ACM certificate only

DNS/ACM validation is manual (no Route 53), so the cert has to be created
and validated _before_ CloudFront can use it:

```bash
terraform apply -target=aws_acm_certificate.frontend
```

### 4. Validate the certificate

Read the CNAME records Terraform wants you to add:

```bash
terraform output -json acm_validation_records
```

Add each one as a CNAME record at name.com for `beautycode.live`. Wait for
DNS to propagate (a few minutes up to ~1 hour).

### 5. Full apply

```bash
terraform apply
```

This creates DynamoDB, both S3 buckets, waits (up to 45 min) for ACM to
confirm the cert as `ISSUED`, then creates CloudFront, the EC2 instance
(which boots, clones the backend, and brings up the full Docker Compose
stack via `user_data`), IAM roles, etc.

### 6. Point all three domains at CloudFront

```bash
terraform output cloudfront_domain_name
```

At name.com, add:

- `beautycode.live` → ALIAS/ANAME record → CloudFront domain
- `www.beautycode.live` → CNAME → CloudFront domain
- `api.beautycode.live` → CNAME → CloudFront domain

That's it — no separate A record or cert for the API. CloudFront routes
`/api/*` to the backend origin over internal HTTP and handles public HTTPS
for all three domains with the one ACM cert.

### 7. Deploy the frontend

The frontend is never built on EC2 — build and upload it separately, after
`apply` and after every subsequent frontend change:

```bash
cd frontend
npm install
npm run build

aws s3 sync dist/ "s3://$(terraform output -raw frontend_bucket_name)" --delete

aws cloudfront create-invalidation \
  --distribution-id "$(terraform output -raw cloudfront_distribution_id)" \
  --paths "/*"
```

### 8. Verify

```bash
curl -I https://beautycode.live
curl -I https://api.beautycode.live/api/products
```

Give the EC2 `user_data` script a few minutes to finish (`git clone` +
`docker compose build` takes time on first boot). If the API isn't
responding yet, check via SSM:

```bash
aws ssm start-session --target "$(terraform output -raw backend_instance_id)"
# once connected:
cd /opt/beauty-code/backend
docker compose -f docker-compose.yml -f docker-compose.prod.yaml ps
docker compose -f docker-compose.yml -f docker-compose.prod.yaml logs -f backend
```

## Redeploying backend changes

`user_data` only runs on first boot — it does not re-run on subsequent
`terraform apply` calls unless the instance is replaced. To ship a new
backend commit:

**Option A — SSM, no downtime beyond the container restart (preferred for
routine deploys):**

```bash
aws ssm send-command \
  --instance-ids "$(terraform output -raw backend_instance_id)" \
  --document-name "AWS-RunShellScript" \
  --parameters commands='cd /opt/beauty-code/backend && git pull && docker compose -f docker-compose.yml -f docker-compose.prod.yaml up -d --build'
```

**Option B — force instance replacement (clean slate, ~1 min downtime while
the new EIP association happens):**

```bash
terraform apply -replace=aws_instance.backend
```

## Redeploying frontend changes

Repeat step 7 above — build, `s3 sync --delete`, then invalidate CloudFront.
There is no build step on any server for the frontend; it's purely a local
build + upload.

## Outputs

| Output                       | Use                                                                              |
| ----------------------------- | --------------------------------------------------------------------------------- |
| `backend_eip`                 | Static IP of the backend instance, for debugging/SSM only — not a DNS target      |
| `backend_instance_id`         | EC2 instance ID — needed for SSM commands (redeploy, shell access, log checks)    |
| `cloudfront_domain_name`      | ALIAS/CNAME target for `beautycode.live`, `www`, **and** `api`                    |
| `cloudfront_distribution_id`  | Needed for `aws cloudfront create-invalidation` after every frontend deploy       |
| `frontend_bucket_name`        | Target bucket for `aws s3 sync` when deploying the built frontend                 |
| `acm_validation_records`      | CNAME records needed to validate the shared TLS cert (covers all three domains)   |

## Notes / gotchas

- **Two-phase apply is required** the first time, because ACM DNS validation
  can't be automated without Route 53. After the cert is issued once,
  subsequent `apply` runs are normal single-pass.
- The images bucket is public via bucket policy (not OAC) — CloudFront's
  `/images/*` behavior just proxies to it directly.
- The frontend bucket has no S3 static-website-hosting config; CloudFront
  reads it via OAC over the S3 REST endpoint, and SPA fallback (unknown
  routes → `index.html`) is handled by CloudFront's `custom_error_response`
  for 403/404.
- The backend security group only opens port 80; there's no SSH ingress and
  no 443 — instance access is via SSM only, and TLS never reaches the
  instance at all (CloudFront terminates it).
- `/api/*` requests are proxied uncached (`default_ttl = 0`) with
  `Authorization`, `Content-Type`, `Origin` headers and all cookies
  forwarded — if the backend starts relying on other headers, add them to
  the `forwarded_values.headers` list in the `/api/*` cache behavior.
- The EC2 instance now boots **both** `docker-compose.yml` and
  `docker-compose.prod.yaml` together (`-f docker-compose.yml -f
  docker-compose.prod.yaml`), which brings up OpenLDAP and its seed
  containers in addition to Vault/config-server/backend. `user_data`
  seeds `.env` with `VAULT_TOKEN`, `JWT_SECRET`, and `LDAP_ADMIN_PASSWORD`
  — all three are required or the LDAP/JWT setup will silently seed empty
  values into Vault and OpenLDAP.
- `user_data` only runs once, on first boot — see "Redeploying backend
  changes" above for how to ship new commits without recreating the whole
  stack.