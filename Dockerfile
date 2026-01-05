# 1. Base image
FROM oven/bun:1 AS base
WORKDIR /app

# 2. Install dependencies
FROM base AS install
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# 3. Build the application
FROM base AS builder
COPY --from=install /app/node_modules ./node_modules
COPY . .
# Next.js needs this environment variable during build
ENV NODE_ENV=production
RUN bun run build

# 4. Final Production Image
FROM base AS release
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create cache directory with proper permissions for image optimization
RUN mkdir -p /app/.next/cache/images && chown -R bun:bun /app/.next/cache

USER bun
EXPOSE 3000
CMD ["bun", "run", "start"]