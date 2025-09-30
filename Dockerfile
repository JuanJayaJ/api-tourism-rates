# ---- Stage 1: Builder ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Generate Prisma client
RUN npx prisma generate
# Build TS
RUN npm run build

# ---- Stage 2: Runtime ----
FROM node:20-alpine
WORKDIR /app

# Copy artifacts from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma/

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/server.js"]
