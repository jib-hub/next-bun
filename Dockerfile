# syntax=docker/dockerfile:1

########## 1) deps (Node) ##########
FROM node:20-slim AS deps
WORKDIR /app

# If you want to use bun lockfile, install bun in build stage:
RUN corepack enable

# Install bun (for bun.lock handling) OR use npm.
# Easiest: use npm (package-lock) — but you’re using bun.lock.
# So install bun:
RUN npm i -g bun

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

########## 2) builder (Node) ##########
FROM node:20-slim AS builder
WORKDIR /app
RUN npm i -g bun

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build using Node semantics (still runs "next build")
RUN bun run build

########## 3) runner (Bun) ##########
FROM oven/bun:1.1.29 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

RUN useradd -m -u 10001 -s /usr/sbin/nologin nextjs

# Copy standalone output + static + public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

USER nextjs
EXPOSE 3001

# Serve using Bun runtime
CMD ["bun", "server.js"]