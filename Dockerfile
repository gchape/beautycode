FROM node:26-bookworm-slim AS build
WORKDIR /app
RUN npm install --global pnpm@12.14.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG SITE_URL
RUN test -n "$SITE_URL"
ENV VITE_SITE_URL=$SITE_URL
RUN pnpm build && pnpm prune --prod

FROM node:26-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000 MIGRATIONS_DIR=/app/migrations DB_PATH=/data/beautycode.db
COPY --from=build --chown=node:node /app/.output ./.output
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/package.json ./package.json
COPY --from=build --chown=node:node /app/migrations ./migrations
COPY --from=build --chown=node:node /app/scripts ./scripts
COPY --from=build --chown=node:node /app/src/server ./src/server
COPY --from=build --chown=node:node /app/src/data ./src/data
COPY --from=build --chown=node:node /app/src/lib ./src/lib
RUN mkdir -p /data && chown node:node /data
USER node
CMD ["node", ".output/server/index.mjs"]
