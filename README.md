# BeautyCode

Georgian-market e-commerce storefront for beauty devices (IPL epilators, facial vacuum cleansers, hair styling tools). Monorepo containing the frontend, backend, and AWS infrastructure.

<img width="700" alt="BeautyCode infra architecture" src="https://github.com/user-attachments/assets/269d48fb-6b01-4a4b-a42b-4eaab772605c" />

## Repo layout

```
beauty-code/
├── frontend/    # React 19 + Vite + TypeScript storefront
├── backend/     # Spring Boot 4.1 API + Spring Cloud Config Server
└── infra/       # Terraform — AWS resources, EC2 boot script
```

Each folder has its own README with details — this one is the map.

## How a request flows

Browser → **CloudFront** (TLS, routing) → one of:

- `/*` → **S3 (frontend)** — the built React app, private bucket read only via Origin Access Control
- `/images/*` → **S3 (images)** — public product images
- `/api/*` → **EC2 (backend)** — a single instance running the whole backend stack in Docker Compose: Vault, Postgres, OpenLDAP, `backend-config-server`, `backend`

The backend app reads products from **DynamoDB**, orders/newsletter from **Postgres**, authenticates users against **OpenLDAP** (bind-based), and issues **JWTs** signed with a secret pulled from **Vault** (KMS auto-unseal). See `infra/README.md` for the full breakdown of what's load-bearing in Vault vs. what's just container env vars.

## Local development

Each part can run independently:

```bash
# Backend + its dependencies (Postgres, embedded LDAP, Vault dev mode)
cd backend
docker compose -f docker-compose.yml -f docker-compose.dev.yaml up -d

# Frontend, pointed at the local backend
cd frontend
echo "VITE_API_URL=http://localhost:8080" > .env
echo "VITE_CRISP_WEBSITE_ID=<your-crisp-id>" >> .env
npm install
npm run dev
```

See `backend/README.md` for dev-profile specifics (embedded DynamoDB, test LDAP users) and `frontend/README.md` for the full env var / script list.

## Deploying

Infrastructure and both apps deploy manually via Terraform + a deploy script — see `infra/README.md` for the full first-time setup (state, DNS validation). Short version:

```bash
cd infra
terraform init && terraform apply    # provisions everything, once — re-run after any infra/backend change
```

```bash
cd frontend
./scripts/deploy-frontend.sh ../infra   # build + sync + invalidate, run after any frontend change
```

Both steps are run by hand, whenever there's a change to deploy — there's no CI pipeline triggering these automatically.

## Where to look for what

| Question                                                          | Read                 |
| ----------------------------------------------------------------- | -------------------- |
| How is AWS set up? What does Vault actually protect?              | `infra/README.md`    |
| How does auth/JWT/LDAP work server-side? Docker Compose profiles? | `backend/README.md`  |
| Routing, cart state, env vars, deploy script?                     | `frontend/README.md` |
