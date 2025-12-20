# ============================================
# Bun-optimized Dockerfile for Next.js Portfolio
# Uses Bun for fast dep installation, Node for build
# Multi-stage build for minimal production image
# ============================================

# Stage 1: Base with Bun for fast dependency installation
FROM oven/bun:1.1.38-alpine AS deps

WORKDIR /app

# Copy package manifests
COPY package.json bun.lock ./

# Install dependencies with Bun (much faster than npm/yarn)
RUN bun install --frozen-lockfile

# Stage 2: Build with Node.js (Next.js requires full Node.js for build)
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependencies from bun stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Set production environment for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application with Node
RUN npm run build

# Stage 3: Production runner (minimal image)
FROM node:22-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Create .next directory with correct permissions
RUN mkdir .next && chown nextjs:nodejs .next

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]
