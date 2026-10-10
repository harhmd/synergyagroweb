# ========================================================
# Synergy Agro Farm (SAF) Production Dockerfile
# Optimized for Coolify and VPS Deployment
# ========================================================

FROM node:22-alpine AS builder

WORKDIR /app

# Install all dependencies (including devDependencies needed for build)
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci --include=dev

# Copy application source and build frontend
COPY . .
RUN npm run build

# ========================================================
# Runner Stage
# ========================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm install -g tsx

# Copy built frontend assets and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/server ./server

EXPOSE 3000

# Start server (auto-initializes SYN_ schema and seeds media into PostgreSQL)
CMD ["tsx", "server/index.ts"]
